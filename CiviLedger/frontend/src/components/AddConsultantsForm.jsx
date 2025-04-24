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

import {addConsultant} from '../../db/tables/Consultants'; // Adjust path as needed

const ConsultantsForm = () => {
  const [formData, setFormData] = useState({
    consultant_code: '',
    name: '',
    phone: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async () => {
    if (
      !formData.consultant_code ||
      !formData.name ||
      !formData.phone ||
      !formData.password
    ) {
      Alert.alert('Please fill all fields!');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      Alert.alert('Phone number must be 10 digits!');
      return;
    }

    try {
      await addConsultant(formData);
      Alert.alert('Consultant added successfully!');
      setFormData({
        consultant_code: '',
        name: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      console.error('Error adding consultant:', error);
      Alert.alert('Failed to add consultant. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add New Consultant</Text>

      <TextInput
        style={styles.input}
        placeholder="Consultant Code"
        value={formData.consultant_code}
        onChangeText={value => handleChange('consultant_code', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Consultant Name"
        value={formData.name}
        onChangeText={value => handleChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        maxLength={10}
        value={formData.phone}
        onChangeText={value => handleChange('phone', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={value => handleChange('password', value)}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default ConsultantsForm;

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
