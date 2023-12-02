import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    axios
      .post('http://13.228.24.205:3000/register', { username, email, password })
      .then(response => {
        // Handle server response
        console.log(response.data);

        // Navigate to the login screen after successful registration
        navigation.navigate('Login');
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./login.jpg')} // Use the same background image as the login screen
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.logo}>Register to Home</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              style={styles.input}
              onChangeText={text => setUsername(text)}
            />
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
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'rgba(57, 165, 251, 0.4)',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content verticall
  },
  logo: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white', // Adjust background color if needed
  },
  registerButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    width:'40%',
  alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;