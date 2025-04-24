import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {addTestRate} from '../../db/tables/estimation';

const AddTestRateForm = () => {
  const [formData, setFormData] = useState({
    test_name: '',
    rate: '',
  });

  // Handle input changes
  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const isNumeric = (...values) => values.every(val => !isNaN(val));

  // Handle form submission
  const handleSubmit = async () => {
    const {test_name, rate} = formData;

    // Validate the fields
    if (!test_name || !rate) {
      Alert.alert('Please fill all fields!');
      return;
    }

    if (!isNumeric(rate)) {
      Alert.alert('Rate must be numeric!');
      return;
    }

    try {
      await addTestRate({test_name, rate});
      Alert.alert('Test rate added successfully!');
      setFormData({test_name: '', rate: ''});
    } catch (error) {
      console.error('Error adding test rate:', error);
      Alert.alert('Failed to add test rate. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Test Rate</Text>

      <TextInput
        style={styles.input}
        placeholder="Test Name"
        value={formData.test_name}
        onChangeText={value => handleChange('test_name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Rate"
        keyboardType="numeric"
        value={formData.rate}
        onChangeText={value => handleChange('rate', value)}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default AddTestRateForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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
