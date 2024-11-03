// inertiaScript.js
const script = `
  TurboSession.turboIsReady(true)
  
  const afterNextRepaint = (callback) => {
      if (document.hidden) {
        callback()
      } else {
        requestAnimationFrame(function() {
          requestAnimationFrame(callback)
        })
      }
    }

  // visitProposedToLocation
  document.addEventListener('inertia:before', (event) => {
    console.log("TurboSession - Before")
    // TODO: Handle Scroll
    // TODO: Handle same page
    // TODO: Make JSON working
    TurboSession.visitProposedToLocation(event.detail.visit.url.toString(), { "action": "replace" })
  });

  // visitRequestStarted
  document.addEventListener('inertia:start', (event) => {
    console.log("TurboSession - Start")
    TurboSession.visitRequestStarted(2)
  });
  
  // visitRendered
  // visitCompleted
  document.addEventListener('inertia:success', (event) => {
    console.log("TurboSession - Success")
    afterNextRepaint(() => {
      TurboSession.visitRendered("identifier")
      TurboSession.visitCompleted("identifier", "restoreIdentifier")
    })
  });

  // visitRequestCompleted
  document.addEventListener('inertia:finish', (event) => {
    console.log("TurboSession - Finish")
    TurboSession.visitRequestFinished(2)
  });

  // document.addEventListener('inertia:error', (event) => {
  //   TurboSession.visitRequestFinished(2)
  //   console.log(event)
  // })
`;

export default script;