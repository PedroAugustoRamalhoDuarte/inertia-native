(() => {
  const TURBO_LOAD_TIMEOUT = 4000

  // Bridge between Turbo JS and native code. Built for Turbo 7
  class TurboNative {
    registerAdapter() {
      if (window.Turbo) {
        Turbo.registerAdapter(this)
        TurboSession.turboIsReady(true)
      } else {
        throw new Error("Failed to register the TurboNative adapter")
      }
    }

    pageLoaded() {
      if (window.Turbo) {
        const restorationIdentifier = Turbo.navigator.restorationIdentifier
        this.afterNextRepaint(() => {
          TurboSession.pageLoaded(restorationIdentifier)
        })
      }
    }

    pageLoadFailed() {
      TurboSession.turboFailedToLoad()
    }

    visitLocationWithOptionsAndRestorationIdentifier(location, optionsJSON, restorationIdentifier) {
      const options = JSON.parse(optionsJSON)
      const action = options.action

      if (Turbo.navigator.locationWithActionIsSamePage(new URL(location), action)) {
        // Skip the same-page anchor scrolling behavior for visits initiated from the native
        // side. The page content may be stale and we want a fresh request from the network.
        Turbo.navigator.startVisit(location, restorationIdentifier, { "action": "replace" })
      } else {
        Turbo.navigator.startVisit(location, restorationIdentifier, options)
      }
    }

    // Current visit
    issueRequestForVisitWithIdentifier(identifier) {
      if (identifier == this.currentVisit.identifier) {
        this.currentVisit.issueRequest()
      }
    }

    changeHistoryForVisitWithIdentifier(identifier) {
      if (identifier == this.currentVisit.identifier) {
        this.currentVisit.changeHistory()
      }
    }

    loadCachedSnapshotForVisitWithIdentifier(identifier) {
      if (identifier == this.currentVisit.identifier) {
        this.currentVisit.loadCachedSnapshot()
      }
    }

    loadResponseForVisitWithIdentifier(identifier) {
      if (identifier == this.currentVisit.identifier) {
        this.currentVisit.loadResponse()
      }
    }

    cancelVisitWithIdentifier(identifier) {
      if (identifier == this.currentVisit.identifier) {
        this.currentVisit.cancel()
      }
    }

    visitRenderedForColdBoot(visitIdentifier) {
      this.afterNextRepaint(() => {
        TurboSession.visitRendered(visitIdentifier)
      })
    }

    // Adapter interface
    visitProposedToLocation(location, options) {
      if (Turbo.navigator.locationWithActionIsSamePage(location, options.action)) {
        // Scroll to the anchor on the page
        TurboSession.visitProposalScrollingToAnchor(location.toString(), JSON.stringify(options))
        Turbo.navigator.view.scrollToAnchorFromLocation(location)
      } else if (Turbo.navigator.location?.href === location.href) {
        // Refresh the page without native proposal
        TurboSession.visitProposalRefreshingPage(location.toString(), JSON.stringify(options))
        this.visitLocationWithOptionsAndRestorationIdentifier(location, JSON.stringify(options), Turbo.navigator.restorationIdentifier)
      } else {
        // Propose the visit
        TurboSession.visitProposedToLocation(location.toString(), JSON.stringify(options))
      }
    }

    visitStarted(visit) {
      TurboSession.visitStarted(visit.identifier, visit.hasCachedSnapshot(), visit.isPageRefresh || false, visit.location.toString())
      this.currentVisit = visit
      this.issueRequestForVisitWithIdentifier(visit.identifier)
      this.changeHistoryForVisitWithIdentifier(visit.identifier)
      this.loadCachedSnapshotForVisitWithIdentifier(visit.identifier)
    }

    visitRequestStarted(visit) {
      TurboSession.visitRequestStarted(visit.identifier)
    }

    visitRequestCompleted(visit) {
      TurboSession.visitRequestCompleted(visit.identifier)
      this.loadResponseForVisitWithIdentifier(visit.identifier)
    }

    visitRequestFailedWithStatusCode(visit, statusCode) {
      TurboSession.visitRequestFailedWithStatusCode(visit.identifier, visit.hasCachedSnapshot(), statusCode)
    }

    visitRequestFinished(visit) {
      TurboSession.visitRequestFinished(visit.identifier)
    }

    visitRendered(visit) {
      this.afterNextRepaint(() => {
        TurboSession.visitRendered(visit.identifier)
      })
    }

    visitCompleted(visit) {
      this.afterNextRepaint(() => {
        TurboSession.visitCompleted(visit.identifier, visit.restorationIdentifier)
      })
    }

    formSubmissionStarted(formSubmission) {
      TurboSession.formSubmissionStarted(formSubmission.location.toString())
    }

    formSubmissionFinished(formSubmission) {
      TurboSession.formSubmissionFinished(formSubmission.location.toString())
    }

    pageInvalidated() {
      TurboSession.pageInvalidated()
    }

    // Private
    afterNextRepaint(callback) {
      if (document.hidden) {
        callback()
      } else {
        requestAnimationFrame(() => {
          requestAnimationFrame(callback)
        })
      }
    }
  }

  // Touch detection for vertically scrollable elements
  const elementTouchStart = (event) => {
    if (!event.target) return

    let element = event.target

    while (element) {
      const canScroll = element.scrollHeight > element.clientHeight
      const overflowY = window.getComputedStyle(element).overflowY

      if (canScroll && (overflowY === "scroll" || overflowY === "auto")) {
        TurboSession.elementTouchStarted(true)
        break
      }

      element = element.parentElement
    }

    if (!element) {
      TurboSession.elementTouchStarted(false)
    }
  }

  const elementTouchEnd = () => {
    TurboSession.elementTouchEnded()
  }

  // Setup and register adapter
  window.turboNative = new TurboNative()

  const setup = () => {
    window.turboNative.registerAdapter()
    window.turboNative.pageLoaded()

    document.removeEventListener("turbo:load", setup)
    document.addEventListener("touchstart", elementTouchStart)
    document.addEventListener("touchend", elementTouchEnd)
  }

  const setupOnLoad = () => {
    document.addEventListener("turbo:load", setup)

    setTimeout(() => {
      if (!window.Turbo) {
        TurboSession.turboIsReady(false)
        window.turboNative.pageLoadFailed()
      }
    }, TURBO_LOAD_TIMEOUT)
  }

  if (window.Turbo) {
    setup()
  } else {
    setupOnLoad()
  }
})()