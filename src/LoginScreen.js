import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('loggedInUser').then((userData) => {
      if (userData) {
        navigation.navigate('APP-CONFIG');
      }
    });
  }, []);

  const handleLogin = () => {
    axios
      .post('http://13.228.24.205:3000/login', { email, password })
      .then(response => {
        if (response.data.success) {
          AsyncStorage.setItem('loggedInUser', JSON.stringify({ email, password }));
          navigation.navigate('APP-CONFIG');
        } else {
          // Handle login error here
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./login.jpg')} // Thêm hình ảnh nền hoa văn
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Login to Home Dashboard</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text style={styles.registerLink} onPress={navigateToRegister}>Register</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    backgroundColor: 'rgba(57, 165, 251, 0.4)', // Màu nền với độ trong suốt
    borderRadius: 20,
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    margin: 10,
    padding: 10,
    borderColor: 'green',
    borderWidth: 2,
    backgroundColor: 'white',
    color: 'black',
    borderRadius:20,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginTop:30,
    marginBottom:20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    marginTop: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: '900', 
  },
  registerLink: {
color: 'red',
fontWeight: '900',
  },
});

export default LoginScreen;