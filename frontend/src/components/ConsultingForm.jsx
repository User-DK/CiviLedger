import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {addConsultancyRecord} from '../../db/tables/ProcessConsultancy';
import {getAllTesterCodes} from '../../db/tables/testers';
import {getAllConsultantsCodes} from '../../db/tables/Consultants';
import {getConsultancyRecordByID} from '../../db/tables/ProcessConsultancy';
import {updateConsultancyRecord} from '../../db/tables/ProcessConsultancy';

const ConsultingForm = ({isEditing}) => {
  const [testers, setTesters] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [currentID, setCurrentID] = useState('');
  const [sucessFetchData, setSucessFetchData] = useState(false);
  const defaultFormData = {
    id: '',
    name_of_party: '',
    details_of_work: '',
    amount: '',
    total_incl_gst: '',
    material_receipt: '',
    testing_status: 0,
    report_status: 0,
    payment_status: 0,
    payment_date: '',
    jv_no: '',
    receipt_no: '',
    date: '',
    material_properties: '',
    cube_preparation: '',
    casting: '',
    demoulding: '',
    testing: '',
    remarks: '',
    entered_by: '',
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testersData = await getAllTesterCodes();
        setTesters(testersData);
        const consultantsData = await getAllConsultantsCodes();
        setConsultants(consultantsData);
      } catch (error) {
        console.error('Error fetching codes:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleChangeID = value => {
    setCurrentID(value);
  };

  const handleSubmit = async () => {
    if (
      isNaN(formData.amount) ||
      isNaN(formData.total_incl_gst)
    ) {
      Alert.alert('Please enter valid numbers!');
      return;
    }

    try {
      await addConsultancyRecord(formData);
      Alert.alert('Record added successfully!');
      setFormData(defaultFormData);
    } catch (error) {
      console.error('Error adding record:', error);
      Alert.alert('Failed to add record. Please try again.');
    }
  };

  const handleFetch = async id => {
    try {
      const result = await getConsultancyRecordByID(id);
      if (result) {
        setFormData({
          id: result.id,
          name_of_party: result.name_of_party,
          details_of_work: result.details_of_work,
          amount: String(result.amount),
          total_incl_gst: String(result.total_incl_gst),
          material_receipt: result.material_receipt,
          testing_status: result.testing_status,
          report_status: result.report_status,
          payment_status: result.payment_status,
          payment_date: result.payment_date,
          jv_no: result.jv_no,
          receipt_no: result.receipt_no,
          date: result.date,
          material_properties: result.material_properties,
          cube_preparation: result.cube_preparation,
          casting: result.casting,
          demoulding: result.demoulding,
          testing: result.testing,
          remarks: result.remarks,
          entered_by: result.entered_by,
        });
        setSucessFetchData(true);
        Alert.alert('Record fetched successfully!');
      } else {
        Alert.alert('No record found with this ID!');
      }
      setCurrentID('');
    } catch (error) {
      console.error('Error fetching record:', error);
      Alert.alert('Failed to fetch record. Please try again.');
    }
  };

  const handleSubmitEditing = async () => {
    try {
      if (
        isNaN(formData.amount) ||
        isNaN(formData.total_incl_gst)
      ) {
        Alert.alert('Please enter valid numbers!');
        return;
      }

      await updateConsultancyRecord(formData);
      Alert.alert('Record updated successfully!');
      setFormData(defaultFormData);
      setCurrentID('');
    } catch (error) {
      console.error('Error updating record:', error);
      Alert.alert('Failed to update record. Please try again.');
    }
  };

  const handleClearFormData = () => {
    setFormData(defaultFormData);
    setCurrentID('');
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Process Consultancy Form</Text>
        {isEditing && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter ID"
              value={currentID}
              onChangeText={value => handleChangeID(value)}
            />
            <Button title="Edit" onPress={() => handleFetch(currentID)} />
          </>
        )}
        <TextInput
          style={styles.input}
          placeholder="Name of Party"
          value={formData.name_of_party}
          onChangeText={value => handleChange('name_of_party', value)}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Details of Work"
          multiline
          numberOfLines={4}
          value={formData.details_of_work}
          onChangeText={value => handleChange('details_of_work', value)}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.column]}
            placeholder="Amount"
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={value => handleChange('amount', value)}
          />
          <TextInput
            style={[styles.input, styles.column]}
            placeholder="Total Incl GST"
            keyboardType="numeric"
            value={formData.total_incl_gst}
            onChangeText={value => handleChange('total_incl_gst', value)}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.column]}
            placeholder="Material Receipt"
            value={formData.material_receipt}
            onChangeText={value => handleChange('material_receipt', value)}
          />
          <TextInput
            style={[styles.input, styles.column]}
            placeholder="JV No."
            value={formData.jv_no}
            onChangeText={value => handleChange('jv_no', value)}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.column]}
            placeholder="Payment Date (YYYY-MM-DD)"
            value={formData.payment_date}
            onChangeText={value => handleChange('payment_date', value)}
          />
          <TextInput
            style={[styles.input, styles.column]}
            placeholder="Date (YYYY-MM-DD)"
            value={formData.date}
            onChangeText={value => handleChange('date', value)}
          />
          <TextInput
            style={[styles.input, styles.column]}
            placeholder="Receipt No."
            value={formData.receipt_no}
            onChangeText={value => handleChange('receipt_no', value)}
          />
        </View>
        {/* Process tester pickers */}
        <View style={styles.row}>
          <Picker
            selectedValue={formData.material_properties}
            style={styles.picker}
            onValueChange={value => handleChange('material_properties', value)}>
            <Picker.Item label="Select Material Properties" value="" />
            {testers.map(code => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
          <Picker
            selectedValue={formData.cube_preparation}
            style={styles.picker}
            onValueChange={value => handleChange('cube_preparation', value)}>
            <Picker.Item label="Select Cube Preparation" value="" />
            {testers.map(code => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
          <Picker
            selectedValue={formData.casting}
            style={styles.picker}
            onValueChange={value => handleChange('casting', value)}>
            <Picker.Item label="Select Casting" value="" />
            {testers.map(code => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
        </View>
        <View style={styles.row}>
          <Picker
            selectedValue={formData.demoulding}
            style={styles.picker}
            onValueChange={value => handleChange('demoulding', value)}>
            <Picker.Item label="Select Demoulding" value="" />
            {testers.map(code => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
          <Picker
            selectedValue={formData.testing}
            style={styles.picker}
            onValueChange={value => handleChange('testing', value)}>
            <Picker.Item label="Select Testing" value="" />
            {testers.map(code => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
          <Picker
            selectedValue={formData.entered_by}
            style={styles.picker}
            onValueChange={value => handleChange('entered_by', value)}>
            <Picker.Item label="Select Entered By" value="" />
            {consultants.map(code => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
        </View>
        {/* Status pickers */}
        <View style={styles.row}>
          <Picker
            selectedValue={formData.payment_status}
            style={styles.picker}
            onValueChange={value => handleChange('payment_status', value)}>
            <Picker.Item label="Select Payment Status" value={0} />
            <Picker.Item label="Paid" value={1} />
            <Picker.Item label="Unpaid" value={0} />
          </Picker>
          <Picker
            selectedValue={formData.report_status}
            style={styles.picker}
            onValueChange={value => handleChange('report_status', value)}>
            <Picker.Item label="Select Report Status" value={0} />
            <Picker.Item label="Done" value={0} />
            <Picker.Item label="In progress" value={1} />
          </Picker>
          <Picker
            selectedValue={formData.testing_status}
            style={styles.picker}
            onValueChange={value => handleChange('testing_status', value)}>
            <Picker.Item label="Select Testing Status" value={0} />
            <Picker.Item label="Done" value={1} />
            <Picker.Item label="Pending" value={0} />
          </Picker>
        </View>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Remarks"
          multiline
          numberOfLines={4}
          value={formData.remarks}
          onChangeText={value => handleChange('remarks', value)}
        />
        <Button
          title="Submit"
          onPress={isEditing ? handleSubmitEditing : handleSubmit}
        />
        <Button title="Clear" onPress={handleClearFormData} />
      </ScrollView>
    </>
  );
};

export default ConsultingForm;

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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
  },
});
