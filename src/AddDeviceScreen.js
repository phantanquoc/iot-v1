import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AddDeviceScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComponentType, setSelectedComponentType] = useState('');
  const [componentProps, setComponentProps] = useState({});

  const handleAddComponent = (type) => {
    setSelectedComponentType(type);
    setComponentProps({});
    setModalVisible(true);
  };

  const handleSaveComponent = () => {
    // Gửi dữ liệu thành phần mới lên server
    AsyncStorage.getItem('loggedInUser').then((userData) => {
      if (userData) {
        const { email } = JSON.parse(userData);
        axios.post('http://13.228.24.205:3000/components', {
          userId: email,
          type: selectedComponentType,
          props: componentProps,
        })
          .then(response => {
            // Cập nhật danh sách components sau khi thêm mới
            // Cần thêm cập nhật danh sách components (bạn có thể lấy thông tin từ server nếu cần)
            // setComponents([...components, response.data.component]);
            setModalVisible(false);
            navigation.navigate('Home');
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddComponent('button')}
      >
        <Text style={styles.buttonText}>Add Button</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddComponent('gauge')}
      >
        <Text style={styles.buttonText}>Add Gauge</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddComponent('label')}
      >
        <Text style={styles.buttonText}>Add Label</Text>
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

export default AddDeviceScreen;