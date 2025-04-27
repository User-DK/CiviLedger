import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import {updateip} from '../../db/tables/ip';

const IPForm = () => {
  const [formData, setFormData] = useState({
    ip: '',
  });

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async () => {
    try {
      await updateip(formData);
      Alert.alert('IP added successfully!');
      setFormData({ip: ''});
    } catch (error) {
      console.error('Error adding ip:', error);
      Alert.alert('Failed to add ip. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add IP</Text>

      <TextInput
        style={styles.input}
        placeholder="IP ADDRESS: PORT"
        value={formData.ip}
        onChangeText={value => handleChange('ip', value)}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default IPForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
});
