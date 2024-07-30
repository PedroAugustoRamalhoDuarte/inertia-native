import 'expo-dev-client';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Routes} from "./src/webScreenRoutes";
import {linking} from "./src/webScreen";
import WebView from "./src/WebView";

const Stack = createNativeStackNavigator();

function HomeScreen() {
  console.log("HomeScreen")
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: "#F2F2F2"}}>
      <Text>Home Screen</Text>
    </View>
  );
}


export default function App() {
  console.log("Loading APP")
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen
          options={{headerShown: false}}
          name="Projects"
          component={WebView}
        />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
