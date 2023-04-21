import Words from "./apps/Words";
import LoginScreen from "./apps/LoginScreen";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={style.AndroidSafeArea}>
      <ToastManager duration={2000} hasBackDrop={true} />
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Game' component={Words} />
          </Stack.Navigator>
          </NavigationContainer>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS ? (Platform.OS === "android" ? StatusBar.currentHeight : 0) : 0,
  },
});

export default App;
