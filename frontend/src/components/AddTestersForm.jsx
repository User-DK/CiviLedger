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

import {addTester} from '../../db/tables/testers'; // Update path as needed

const TestersForm = () => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    phone: '',
  });

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async () => {
    if (!formData.code || !formData.name || !formData.phone) {
      Alert.alert('Please fill all fields!');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      Alert.alert('Please enter a valid 10-digit phone number!');
      return;
    }

    try {
      await addTester(formData);
      Alert.alert('Tester added successfully!');
      setFormData({code: '', name: '', phone: ''});
    } catch (error) {
      console.error('Error adding tester:', error);
      Alert.alert('Failed to add tester. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add New Tester</Text>

      <TextInput
        style={styles.input}
        placeholder="Tester Code"
        value={formData.code}
        onChangeText={value => handleChange('code', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tester Name"
        value={formData.name}
        onChangeText={value => handleChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={value => handleChange('phone', value)}
        maxLength={10}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default TestersForm;

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
