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

import {addTPARecord} from '../../db/tables/ProcessTPA'; // make sure you have this function
import {getAllConsultantsCodes} from '../../db/tables/Consultants';
import {getTPARecordByID} from '../../db/tables/ProcessTPA';
import {updateTPARecord} from '../../db/tables/ProcessTPA';

const ProcessTPAForm = ({isEditing}) => {
  const [consultants, setConsultants] = useState([]);
  const defaultFormData = {
    id: '',
    name_of_party: '',
    name_of_corporation: '',
    details_of_work: '',
    amount: '',
    total_incl_gst: '',
    visit_status: '',
    document_receipt: '',
    report_status: '',
    payment_status: '',
    payment_date: '',
    jv_no: '',
    receipt_no: '',
    consultant_code: '',
    date: new Date().toISOString().split('T')[0],
    remarks: '',
    entered_by: '',
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [currentID, setCurrentID] = useState('');
  const [sucessFetchData, setSucessFetchData] = useState(false);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const consultantCodes = await getAllConsultantsCodes();
        setConsultants(consultantCodes);
      } catch (error) {
        console.error('Error fetching consultants:', error);
      }
    };
    fetchConsultants();
  }, []);

  const handleChange = (name, value) => {
    if (name === 'amount') {
      const amountValue = parseFloat(value);
      if (!isNaN(amountValue)) {
        const totalInclGst = (amountValue * 1.18).toFixed(2); // 18% GST added
        setFormData(prevFormData => ({
          ...prevFormData,
          amount: value,
          total_incl_gst: totalInclGst,
        }));
      } else {
        setFormData(prevFormData => ({
          ...prevFormData,
          amount: value,
          total_incl_gst: '',
        }));
      }
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  const handleChangeID = value => {
    setCurrentID(value);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'name_of_party',
      'name_of_corporation',
      'details_of_work',
      'amount',
      'total_incl_gst',
      'visit_status',
      'document_receipt',
      'report_status',
      'payment_status',
      'payment_date',
      'jv_no',
      'receipt_no',
      'consultant_code',
      'date',
      'remarks',
      'entered_by',
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        Alert.alert('Please fill all fields!');
        return;
      }
    }

    if (isNaN(formData.amount) || isNaN(formData.total_incl_gst)) {
      Alert.alert('Please enter valid numbers!');
      return;
    }

    try {
      await addTPARecord(formData);
      Alert.alert('Record added successfully!');
      setFormData(defaultFormData);
    } catch (error) {
      console.error('Error adding record:', error);
      Alert.alert('Failed to add record. Please try again.');
    }
  };

  const handleFetch = async id => {
    try {
      const result = await getTPARecordByID(id);
      if (result) {
        setFormData({
          id: result.id,
          name_of_party: result.name_of_party,
          name_of_corporation: result.name_of_corporation,
          details_of_work: result.details_of_work,
          amount: String(result.amount),
          total_incl_gst: String(result.total_incl_gst),
          visit_status: result.visit_status,
          document_receipt: result.document_receipt,
          report_status: result.report_status,
          payment_status: result.payment_status,
          payment_date: result.payment_date,
          jv_no: result.jv_no,
          receipt_no: result.receipt_no,
          date: result.date,
          consultant_code: result.consultant_code,
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
      if (isNaN(formData.amount) || isNaN(formData.total_incl_gst)) {
        Alert.alert('Please enter valid numbers!');
        return;
      }

      await updateTPARecord(formData);
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Process TPA Form</Text>
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
        style={styles.input}
        placeholder="Name of Corporation"
        value={formData.name_of_corporation}
        onChangeText={value => handleChange('name_of_corporation', value)}
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
          placeholder="JV No"
          keyboardType="numeric"
          value={formData.jv_no}
          onChangeText={value => handleChange('jv_no', value)}
        />
        <TextInput
          style={[styles.input, styles.column]}
          placeholder="Receipt No"
          keyboardType="numeric"
          value={formData.receipt_no}
          onChangeText={value => handleChange('receipt_no', value)}
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
      </View>

      <View style={styles.row}>
        <Picker
          selectedValue={formData.visit_status}
          style={styles.picker}
          onValueChange={value => handleChange('visit_status', value)}>
          <Picker.Item label="Select Visit Status" value="" />
          <Picker.Item label="Visited" value={1} />
          <Picker.Item label="Not Visited" value={0} />
        </Picker>
        <Picker
          selectedValue={formData.report_status}
          style={styles.picker}
          onValueChange={value => handleChange('report_status', value)}>
          <Picker.Item label="Select Report Status" value="" />
          <Picker.Item label="Completed" value={1} />
          <Picker.Item label="Pending" value={0} />
        </Picker>
        <Picker
          selectedValue={formData.payment_status}
          style={styles.picker}
          onValueChange={value => handleChange('payment_status', value)}>
          <Picker.Item label="Select Payment Status" value="" />
          <Picker.Item label="Paid" value={1} />
          <Picker.Item label="Unpaid" value={0} />
        </Picker>
      </View>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.column]}
          placeholder="Document Receipt"
          value={formData.document_receipt}
          onChangeText={value => handleChange('document_receipt', value)}
        />
        <Picker
          selectedValue={formData.consultant_code}
          style={styles.picker}
          onValueChange={value => handleChange('consultant_code', value)}>
          <Picker.Item label="Select Consultant Code" value="" />
          {consultants.map(code => (
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
  );
};

export default ProcessTPAForm;

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
