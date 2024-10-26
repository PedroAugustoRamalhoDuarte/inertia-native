import {useEffect, useRef} from "react";
import {ActivityIndicator, BackHandler, Platform, SafeAreaView, StyleSheet} from "react-native";
import {
  useCurrentUrl,
  useWebviewNavigate,
} from "react-native-web-screen";
import RNWenView from "react-native-webview";
import {useIsFocused, useNavigation, useRoute, getStateFromPath} from "@react-navigation/core";
import {baseURL, linkingConfig} from './webScreen';
import extractPathFromURL from "@react-navigation/native/src/extractPathFromURL";
import * as React from "react";
import LinkingContext from "@react-navigation/native/src/LinkingContext";

const InertiaWebView = () => {
  const webViewRef = useRef(null);
  const currentUrl = useCurrentUrl(baseURL, linkingConfig);
  const linking = React.useContext(LinkingContext);
  const {navigateTo} = useWebviewNavigate();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const getStateFromUrl = (to) => {
    const { options } = linking;

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
    webViewRef.current.stopLoading();
    if (data.method === "historyChange") {
      webViewRef.current.stopLoading();
    } else {
      const routes = navigation.getState()?.routes;
      const lastRoute = routes[routes.length - 2];
      if (lastRoute && lastRoute.name === "Posts") {
        webViewRef.current.stopLoading();
        console.log("Go back to posts", route.name)
        return navigation.goBack();
      }
      console.log("Navigate", isFocused, data.visit.url, route.name)
      navigateTo(data.visit.url);

      if (data.method !== "get") {
        // TODO: Automatically refresh the page when the method is not get
        // Maybe https://reactnavigation.org/docs/navigation-events
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
        style={styles.webview}
        onShouldStartLoadWithRequest={(request) => {
          const state = getStateFromUrl(request.url);
          console.log("onShouldStartLoadWithRequest", request.url, route.name, route.name === state.routes[0].name);
          return route.name === state.routes[0].name;
        }}
        // This function is called a lot of times because history change of Inertia
        // For navigation purposes, we need to cancel this navigation to the old page does not redirect to new one
        onNavigationStateChange={() => {
          // Todo still a little bug sometimes the still making request
          return false;
        }}
        onLoadStart={({nativeEvent}) => {
          console.log("onLoadStart", nativeEvent, route.name);
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