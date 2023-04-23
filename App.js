import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Game from "./screens/Game.jsx";
import Login from "./screens/Login.jsx";
import End from "./screens/End.jsx";
import { SafeAreaView, StyleSheet } from "react-native";
import ToastManager from "toastify-react-native";

function App() {
  return (
    <NavigationContainer>
      <ToastManager duration={2000} hasBackDrop={true} width={250} />

      <SafeAreaView style={styles.AndroidSafeArea}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Login} options={{ header: () => {} }} />
          <Stack.Screen name='Game' component={Game} options={{ header: () => {} }} />
          <Stack.Screen name='End' component={End} options={{ header: () => {} }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
  },
});

export default App;
