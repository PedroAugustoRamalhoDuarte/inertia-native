import React, {useCallback} from 'react';
import {
  VisitableView,
} from 'react-native-turbo';
import {useCurrentUrl, useWebviewNavigate} from 'react-native-web-screen';

import {useSessionHandle} from './useSessionHandle';
import {baseURL, linkingConfig} from './webScreen';

const WebView = ({navigation, ...props}) => {
  const {navigateTo} = useWebviewNavigate();
  const visitableViewRef = React.useRef(null);
  const currentUrl = useCurrentUrl(baseURL, linkingConfig);
  const sessionHandle = useSessionHandle();

  console.log('currentUrl:', currentUrl);

  const onVisitProposal = useCallback(
    ({action: actionType, url}) => {
      console.log("onVisitProposal")
      return navigateTo(url, actionType)
    },
    [navigation]
  );

  const onLoad = useCallback(
    ({title}) => {
      console.log("onLoad")
      return navigation.setOptions({title})
    },
    [navigation]
  );

  return (
    <VisitableView
      {...props}
      sessionHandle={sessionHandle}
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