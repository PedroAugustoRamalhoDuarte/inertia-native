import React, {useCallback, useEffect} from 'react';
import {
  VisitableView,
} from 'react-native-turbo';
import {useCurrentUrl, useWebviewNavigate} from 'react-native-web-screen';


import {baseURL, linkingConfig} from './webScreen';
import script from "./bridge/InertiaBridge";

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