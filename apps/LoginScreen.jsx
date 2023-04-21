import React, { Component, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const onLogin = () => {
      if (username === 'admin' && password === 'password') {
        navigation.navigate('Game');
      } else {
        Alert.alert('Invalid credentials', 'Please enter a valid username and password');
      }
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
  
        <Button
          title={'Login'}
          style={styles.input}
          onPress={onLogin}
        />
      </View>
    );
};

export default LoginScreen;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
};
