import React, {useCallback, useEffect, useImperativeHandle} from 'react';
import {
  VisitableView,
} from 'react-native-turbo';
import {useCurrentUrl, useWebviewNavigate} from 'react-native-web-screen';

//import Form from './Strada/Form';
//import {useSessionHandle} from './useSessionHandle';
import {baseURL, linkingConfig} from './webScreen';
import {dispatchCommand} from "react-native-turbo/src/RNVisitableView";

//const stradaComponents = [Form];

const WebView = ({navigation, ...props}) => {
  const {navigateTo} = useWebviewNavigate();
  const visitableViewRef = React.useRef(null);
  const currentUrl = useCurrentUrl(baseURL, linkingConfig);
  //const sessionHandle = useSessionHandle();

  console.log('currentUrl:', currentUrl);


  const onVisitProposal = useCallback(
    ({action: actionType, url}) => {
      console.log("onVisitProposal")
      navigateTo(url, actionType)
    },
    [navigation]
  );


  useEffect(() => {
    if (visitableViewRef.current) {
      const script = `
        TurboSession.turboIsReady(true)
        
        document.addEventListener('inertia:start', (event) => {
          console.log("TurboSession - VISIT")
          TurboSession.visitRequestStarted(2)
        });
        
        document.addEventListener('inertia:success', (event) => {
          TurboSession.visitRequestFinished(2)
           console.log(event)
        })
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
      //stradaComponents={stradaComponents}

      onVisitProposal={onVisitProposal}
      onLoad={onLoad}
    />
  );
};

export default WebView;