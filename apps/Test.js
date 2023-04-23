import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title='Go to Details' onPress={() => navigation.push("Details")} />
    </View>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button title='Go to Home' onPress={() => navigation.push("Home")} />
    </View>
  );
}

export default function Test() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Details' component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
