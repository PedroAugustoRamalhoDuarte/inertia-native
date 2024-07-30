import 'expo-dev-client';
import {
  Text, TouchableHighlight, View
} from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {linking, Routes} from "./src/webScreen";
import SimplerWebView from "./src/SimplerWebView";

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
  const SimpleWebView = () => {
    return (
      <SimplerWebView/>
    );
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator options={{headerShown: false}}>
        <Stack.Screen
          name={Routes.Posts}
          component={SimpleWebView}
        />
        <Stack.Screen
          name={Routes.EditPost}
          component={SimpleWebView}
        />
        <Stack.Screen
          name={Routes.CreatePost}
          component={SimpleWebView}
        />
        <Stack.Screen
          name={Routes.ShowPost}
          component={SimpleWebView}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
