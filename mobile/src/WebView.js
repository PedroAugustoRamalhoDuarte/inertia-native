import { NavigationProp } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  LoadEvent,
  VisitableView,
  VisitProposal,
  VisitableViewProps,
} from 'react-native-turbo';
import { useCurrentUrl, useWebviewNavigate } from 'react-native-web-screen';

import { useSessionHandle } from './useSessionHandle';
import { RootStackParamList, baseURL, linkingConfig } from './webScreen';

console.log("Teste");

const WebView = ({ navigation, ...props }) => {
  console.log("WebView");
  const { navigateTo } = useWebviewNavigate();
  const currentUrl = useCurrentUrl(baseURL, linkingConfig);
  console.log(currentUrl);
  const sessionHandle = useSessionHandle();

  const onVisitProposal = useCallback(
    ({ action: actionType, url }) => navigateTo(url, actionType),
    [navigation]
  );

  const onLoad = useCallback(
    ({ title }) => navigation.setOptions({ title }),
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