import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SwitchScreen = ({ route }) => {
  const { user } = route.params;
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User: {user}</Text>
      
      <Button
        title="Button 1"
        onPress={() => handleButtonPress("Button 1")}
      />

      <Button
        title="Button 2"
        onPress={() => handleButtonPress("Button 2")}
      />

      <Button
        title="Button 3"
        onPress={() => handleButtonPress("Button 3")}
      />

      {selectedButton && (
        <Text style={styles.selectedButton}>Selected Button: {selectedButton}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedButton: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default SwitchScreen;