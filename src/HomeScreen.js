import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [components, setComponents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComponentType, setSelectedComponentType] = useState('');
  const [componentProps, setComponentProps] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Gọi API để lấy danh sách components từ server
    if (!loading) {
      AsyncStorage.getItem('loggedInUser').then((userData) => {// auto login
        if (userData) {
          const { email } = JSON.parse(userData);
          setLoading(true);
          axios.get(`http://13.228.24.205:3000/components/${email}`)
            .then(response => {
              setComponents(response.data);
              setLoading(false);
            })
            .catch(error => {
              console.error(error);
              setLoading(false);
            });
        }
      });
    }
  }, [modalVisible, loading]);

  const renderComponent = (type, props, index) => {//
    switch (type) {
      case 'button':
        return (
          <TouchableOpacity
            key={index}
            style={styles.component}
            onPress={() => handleComponentPress(props)}
          >
            <Text>Button: {props.text}</Text>
          </TouchableOpacity>
        );
      case 'gauge':
        return (
          <View key={index} style={styles.component}>
            <Text>Gauge: {props.value}</Text>
          </View>
        );
      case 'label':
        return (
          <View key={index} style={styles.component}>
            <Text>Label: {props.text}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const handleAddComponent = (type) => {
    setSelectedComponentType(type);
    setComponentProps({});
    setModalVisible(true);
  };

  const handleComponentPress = (props) => {
    console.log('Component Pressed:', props);
  };

  const handleSaveComponent = () => {
    AsyncStorage.getItem('loggedInUser').then((userData) => {
      if (userData) {
        const { email } = JSON.parse(userData);
        axios.post('http://13.228.24.205:3000/components', {
          userId: email,
          type: selectedComponentType,
          props: componentProps,
        })
          .then(response => {
            setComponents([...components, response.data.component]);
            setModalVisible(false);
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleAddDevicePress = () => {
    navigation.navigate('AddDevice');
  };

  return (
    <View style={styles.container}>
      {components.map((component, index) => (
        renderComponent(component.type, component.props, index)
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddDevicePress}
      >
        <Text style={styles.buttonText}>Add Device</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} onRequestClose={handleModalClose} transparent>
        <View style={styles.modalContainer}>
          {selectedComponentType === 'button' && (
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Button Configuration</Text>
              <TextInput
                placeholder="Text"
                style={styles.input}
                value={componentProps.text}
                onChangeText={(text) => setComponentProps({ ...componentProps, text })}
              />
              <Button title="Save" onPress={handleSaveComponent} />
            </View>
          )}
          {selectedComponentType === 'gauge' && (
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Gauge Configuration</Text>
              <TextInput
                placeholder="Value"
                style={styles.input}
                value={componentProps.value}
                onChangeText={(value) => setComponentProps({ ...componentProps, value })}
              />
              <Button title="Save" onPress={handleSaveComponent} />
            </View>
          )}
          {selectedComponentType === 'label' && (
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Label Configuration</Text>
              <TextInput
                placeholder="Text"
                style={styles.input}
                value={componentProps.text}
                onChangeText={(text) => setComponentProps({ ...componentProps, text })}
              />
              <Button title="Save" onPress={handleSaveComponent} />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  component: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;