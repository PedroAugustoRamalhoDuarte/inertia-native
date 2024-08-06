import {useCallback, useEffect, useRef, useState} from "react";
import {ActivityIndicator, BackHandler, Platform, SafeAreaView, StyleSheet, Text} from "react-native";
import {
  useCurrentUrl,
  useWebviewNavigate,
} from "react-native-web-screen";
import RNWenView from "react-native-webview";
import {baseURL, linkingConfig} from './webScreen';

// This webview does not use turbo native
const InertiaWebView = ({navigation}) => {
  const webViewRef = useRef(null);
  const currentUrl = useCurrentUrl(baseURL, linkingConfig);
  const {navigateTo} = useWebviewNavigate();
  const state = navigation.getState();
  const currentRoute = state.routes[state.index];


  const handleOnMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.method === "historyChange") {
      webViewRef.current.stopLoading();
    } else {
      navigateTo(data.visit.url);
    }
  }

  // fixes issue with pushHistory https://github.com/react-native-webview/react-native-webview/issues/1197
  const historyAPIShim = `
(function() {
    function wrap(fn) {
      return function wrapper() {
        var res = fn.apply(this, arguments);
        window.ReactNativeWebView.postMessage(
          '{"method": "historyChange"}'
        );
        return res;
      };
    }
    history.pushState = wrap(history.pushState);
    history.replaceState = wrap(history.replaceState);
    window.addEventListener("popstate", function() {
      window.ReactNativeWebView.postMessage(
        '{"method": "historyChange"}'
      );
    });
  })();
`;

  const inertiaJavascript = `  
  document.addEventListener('inertia:start', (event) => {
           window.ReactNativeWebView.postMessage(JSON.stringify(event.detail));
});
  `

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
      };
    }
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Text>{currentRoute.name}</Text>
      <RNWenView
        ref={webViewRef}
        allowsBackForwardNavigationGestures={true}
        pullToRefreshEnabled={true}
        onMessage={handleOnMessage}
        style={styles.webview}
        userAgent="Inertia Native"
        injectedJavaScript={inertiaJavascript + historyAPIShim}
        renderLoading={() => <ActivityIndicator/>}
        source={{
          uri: currentUrl,
        }}
      />
    </SafeAreaView>
  );
};

export default InertiaWebView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  webview: {
    flex: 1,
    height: 300,
    backgroundColor: "#fff",
  },
});