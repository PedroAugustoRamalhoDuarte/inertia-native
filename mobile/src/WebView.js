import React, {useCallback} from 'react';
import {
  VisitableView,
} from 'react-native-turbo';
import {useCurrentUrl, useWebviewNavigate} from 'react-native-web-screen';

import {useSessionHandle} from './useSessionHandle';
import {baseURL, linkingConfig} from './webScreen';

const WebView = ({navigation, ...props}) => {
  const {navigateTo} = useWebviewNavigate();
  const currentUrl = useCurrentUrl(baseURL, linkingConfig);
  const sessionHandle = useSessionHandle();

  const onVisitProposal = useCallback(
    ({action: actionType, url}) => {
      return navigateTo(url, actionType)
    },
    [navigation]
  );

  const onLoad = useCallback(
    ({title}) => {
      return navigation.setOptions({title})
    },
    [navigation]
  );

  return (
    <VisitableView
      {...props}
      sessionHandle={sessionHandle}
      url={currentUrl}
      applicationNameForUserAgent="Turbo Native"
      onVisitProposal={onVisitProposal}
      onLoad={onLoad}
    />
  );
};

export default WebView;