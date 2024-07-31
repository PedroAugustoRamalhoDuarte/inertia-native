import {useCallback, useEffect, useRef} from "react";
import {ActivityIndicator, BackHandler, Platform, SafeAreaView, StyleSheet} from "react-native";
import {
  useCurrentUrl,
  useWebviewNavigate,
} from "react-native-web-screen";
import RNWenView from "react-native-webview";
import {baseURL, linkingConfig} from './webScreen';

// This webview does not use turbo native
const SimplerWebView = ({navigation}) => {
  const webViewRef = useRef(null);
  const currentUrl = useCurrentUrl(baseURL, linkingConfig);
  const {navigateTo} = useWebviewNavigate();

  const onVisit = useCallback(
    (e) => {
      if (e.navigationType) {
        // if (!e.loading) {
        //   webViewRef.current.stopLoading();
        // }
        return navigateTo(e.url, "NAVIGATE");
      }
    },
    [navigation],
  );

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
        allowsBackForwardNavigationGestures={true}
        pullToRefreshEnabled={true}
        onNavigationStateChange={onVisit}
        style={styles.webview}
        userAgent="Inertia Native"
        renderLoading={() => <ActivityIndicator/>}
        source={{
          uri: currentUrl,
          headers: {
            "User-Agent": "Inertia Native",
          },
        }}
      />
    </SafeAreaView>
  );
};

export default SimplerWebView;

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