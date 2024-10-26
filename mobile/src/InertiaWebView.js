import {useEffect, useRef} from "react";
import {ActivityIndicator, BackHandler, Platform, SafeAreaView, StyleSheet} from "react-native";
import {
  useCurrentUrl,
  useWebviewNavigate,
} from "react-native-web-screen";
import RNWenView from "react-native-webview";
import {useNavigation, useRoute, getStateFromPath} from "@react-navigation/core";
import {baseURL, linkingConfig} from './webScreen';
import extractPathFromURL from "@react-navigation/native/src/extractPathFromURL";
import * as React from "react";
import LinkingContext from "@react-navigation/native/src/LinkingContext";

const InertiaWebView = () => {
  const webViewRef = useRef(null);
  const currentUrl = useCurrentUrl(baseURL, linkingConfig);
  const linking = React.useContext(LinkingContext);
  const {navigateTo} = useWebviewNavigate();
  const navigation = useNavigation();
  const route = useRoute();

  const getStateFromUrl = (to) => {
    const {options} = linking;

    let path = to;
    if (options?.prefixes && to.match(/^https?:\/\//)) {
      path = extractPathFromURL(options.prefixes, to) ?? '';
    }
    const state = options?.getStateFromPath
      ? options.getStateFromPath(path, options.config)
      : getStateFromPath(path, options?.config);
    return state;
  }

  const handleOnMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    webViewRef.current.stopLoading(); // Does not allow to load the page
    if (data.method === "historyChange") {
      // Fixes this bug with webview https://github.com/react-native-webview/react-native-webview/issues/973#issuecomment-952786718
      // We do twice the request but is what we can do for now
      if (event.nativeEvent.canGoBack) {
        webViewRef.current.goBack();
      }
    } else {
      // This handle inertia requests
      const routes = navigation.getState()?.routes;
      const lastRoute = routes[routes.length - 2];
      const state = getStateFromUrl(data.visit.url);
      // TODO: Automatically refresh the page when the method is not get (data.visit.method.toLowerCase() !== "get")
      // Maybe https://reactnavigation.org/docs/navigation-events
      if (lastRoute && lastRoute.name === state.routes[0].name) {
        navigation.goBack();
      } else {
        navigateTo(data.visit.url);
      }
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

  // Handle inertia navigation
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
      <RNWenView
        ref={webViewRef}
        sharedCookiesEnabled={true} // This allowed to cache assets
        cacheEnabled
        allowsBackForwardNavigationGestures={true}
        pullToRefreshEnabled={true}
        onMessage={handleOnMessage}
        setSupportMultipleWindows={false}
        style={styles.webview}
        onShouldStartLoadWithRequest={(request) => {
          const state = getStateFromUrl(request.url);
          return route.name === state.routes[0].name;
        }}
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