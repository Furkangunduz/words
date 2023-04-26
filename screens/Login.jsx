import React, { useState } from "react";
import { StyleSheet, StatusBar, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ navigation }) => {
  const [userName, setUserName] = useState("");

  const handleStartButtonPress = () => {
    if (!userName) {
      Alert.alert("Error", "Please enter a username.");
      return;
    }
    AsyncStorage.setItem("userName", `${userName}`)
      .then(() => {
        navigation.navigate("Game", { userName });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Failed to save username to storage.");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Username'
          placeholderTextColor='#003f5c'
          onChange={(event) => setUserName(event.nativeEvent.text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleStartButtonPress}>
        <Text style={styles.loginText}>START</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  loginText: {
    fontWeight: "bold",
    color: "white",
  },
});
