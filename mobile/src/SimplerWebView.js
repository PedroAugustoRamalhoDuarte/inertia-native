import {useCallback} from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet} from "react-native";
import {
  useCurrentUrl,
  useWebviewNavigate,
} from "react-native-web-screen";
import RNWenView from "react-native-webview";
import {baseURL, linkingConfig} from './webScreen';


// This webview does not use turbo native
const SimplerWebView = () => {
  const currentUrl = useCurrentUrl(baseURL, linkingConfig);
  const {navigateTo} = useWebviewNavigate();

  const onVisit = useCallback(
    (e) => {
      console.log(e)
      navigateTo(e.url, e.navigationType);
    },
    [navigateTo],
  );

  return (
    <SafeAreaView style={styles.container}>
      <RNWenView
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