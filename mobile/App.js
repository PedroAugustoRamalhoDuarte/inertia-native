import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {linking, Routes} from "./src/webScreen";
import InertiaWebview from "./src/InertiaWebView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator options={{headerShown: false}}>
        <Stack.Screen
          name={Routes.Posts}
          component={InertiaWebview}
        />
        <Stack.Screen
          name={Routes.CreatePost}
          component={InertiaWebview}
        />
        <Stack.Screen
          name={Routes.ShowPost}
          component={InertiaWebview}
        />
        <Stack.Screen
          name={Routes.EditPost}
          component={InertiaWebview}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
