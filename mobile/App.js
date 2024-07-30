import 'expo-dev-client';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Routes} from "./src/webScreenRoutes";
import {linking} from "./src/webScreen";
import WebView from "./src/WebView";
import SimplerWebView from "./src/SimplerWebView";

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: "#F2F2F2"}}>
      <Text>Home Screen</Text>
      <TouchableHighlight onPressIn={() =>  navigation.navigate(Routes.Posts)}>
        <Text>Press me</Text>
      </TouchableHighlight>
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen
          options={{headerShown: true}}
          name={Routes.Posts}
          component={SimplerWebView}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
