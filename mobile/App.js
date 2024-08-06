import {
  Text, TouchableHighlight, View
} from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {linking, Routes} from "./src/webScreen";
import InertiaWebview from "./src/InertiaWebView";

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: "#F2F2F2"}}>
      <Text>Home Screen</Text>
      <TouchableHighlight onPressIn={() => navigation.navigate(Routes.Posts)}>
        <Text>Press me</Text>
      </TouchableHighlight>
    </View>
  );
}


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
        {/*<Stack.Screen*/}
        {/*  name={Routes.Fallback}*/}
        {/*  component={SimplerWebView}*/}
        {/*/>*/}
      </Stack.Navigator>
    </NavigationContainer>

  );
}
