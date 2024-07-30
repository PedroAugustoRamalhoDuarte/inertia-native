import 'expo-dev-client';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Routes} from "./src/webScreenRoutes";
import {linking} from "./src/webScreen";
import WebView from "./src/WebView";
import SimplerWebView from "./src/SimplerWebView";

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: "#F2F2F2"}}>
      <Text>Home Screen</Text>
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Projects"
          component={SimplerWebView}
        />
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}
