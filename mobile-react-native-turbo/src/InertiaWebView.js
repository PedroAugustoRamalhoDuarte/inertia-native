import React, {useCallback, useEffect} from 'react';
import {
  VisitableView,
} from 'react-native-turbo';
import {useCurrentUrl, useWebviewNavigate} from 'react-native-web-screen';


import {baseURL, linkingConfig} from './webScreen';

const WebView = ({navigation, ...props}) => {
  const {navigateTo} = useWebviewNavigate();
  const visitableViewRef = React.useRef(null);
  const currentUrl = useCurrentUrl(baseURL, linkingConfig);

  console.log('currentUrl:', currentUrl);


  const onVisitProposal = useCallback(
    ({action: actionType, url}) => {
      console.log("onVisitProposal")
      return navigateTo(url, actionType)
    },
    [navigation]
  );


  useEffect(() => {
    if (visitableViewRef.current) {
      const script = `
        TurboSession.turboIsReady(true)
        
        // visitProposedToLocation
        document.addEventListener('inertia:before', (event) => {
          console.log("BEFORE")
          // TODO: Handle Scroll
          // TODO: Handle same page
          // TODO: Make JSON working
          TurboSession.visitProposedToLocation(event.detail.visit.url.toString(), {})
        });
        
        // visitRequestStarted
        document.addEventListener('inertia:start', (event) => {
          console.log("TurboSession - Start")
          TurboSession.visitRequestStarted(2)
        });
        
        // visitRequestCompleted
        document.addEventListener('inertia:finish', (event) => {
          console.log("TurboSession - Finish")
          TurboSession.visitRequestFinished(2)
        })
        
        // document.addEventListener('inertia:error', (event) => {
        //   TurboSession.visitRequestFinished(2)
        //    console.log(event)
        // })
      `;
      visitableViewRef.current.injectJavaScript(script);
    }
  }, [visitableViewRef]);

  const onLoad = useCallback(
    ({title}) => navigation.setOptions({title}),
    [navigation]
  );

  return (
    <VisitableView
      {...props}
      ref={visitableViewRef}
      url={currentUrl}
      applicationNameForUserAgent="Turbo Native"
      webViewDebuggingEnabled={true}
      onVisitProposal={onVisitProposal}
      onLoad={onLoad}
    />
  );
};

export default WebView;