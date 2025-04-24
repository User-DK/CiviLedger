import React, {useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ProcessTestingForm from './TestingForm';
import ConsultingForm from './ConsultingForm';
import TPAForm from './TPAForm';
import TestersForm from './AddTestersForm';
import ConsultantsForm from './AddConsultantsForm';
import AddTestRateForm from './AddTestRatesForm';

const AllForm = ({isEditing}) => {
  const [selectedForm, setSelectedForm] = useState('');

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case 'Testing':
        return <ProcessTestingForm isEditing={isEditing} />;
      case 'Consulting':
        return <ConsultingForm isEditing={isEditing} />;
      case 'TPA':
        return <TPAForm isEditing={isEditing} />;
      case 'Testers':
        return <TestersForm isEditing={isEditing} />;
      case 'Consultants':
        return <ConsultantsForm isEditing={isEditing} />;
      case 'TestRates':
        return <AddTestRateForm isEditing={isEditing} />;
      default:
        return (
          <Text style={styles.placeholderText}>
            Please select a form to display.
          </Text>
        );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Select a Form</Text>
      <Picker
        selectedValue={selectedForm}
        style={styles.picker}
        onValueChange={value => setSelectedForm(value)}>
        <Picker.Item label="Select a Form" value="" />
        <Picker.Item label="Testing" value="Testing" />
        <Picker.Item label="Consulting" value="Consulting" />
        <Picker.Item label="TPA" value="TPA" />
        <Picker.Item label="Testers" value="Testers" />
        <Picker.Item label="Consultants" value="Consultants" />
        <Picker.Item label="Test Rates" value="TestRates" />
      </Picker>

      <View style={styles.formContainer}>{renderSelectedForm()}</View>
    </ScrollView>
  );
};

export default AllForm;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
});
