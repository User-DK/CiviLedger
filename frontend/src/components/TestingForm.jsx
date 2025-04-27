import React, {useState, useEffect} from 'react';
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

import {addTestingRecord} from '../../db/tables/ProcessTesting';
import {getAllTesterCodes} from '../../db/tables/testers';
import {getAllConsultantsCodes} from '../../db/tables/Consultants';
import {getTestingRecordByID} from '../../db/tables/ProcessTesting';
import {updateTestingRecord} from '../../db/tables/ProcessTesting';

const ProcessTestingForm = ({isEditing}) => {
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
    testing_status: '',
    report_status: '',
    payment_status: '',
    payment_date: '',
    jv_no: '',
    receipt_no: '',
    date: new Date().toISOString().split('T')[0],
    testers: '',
    remarks: '',
    entered_by: '',
  };
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testerCodes = await getAllTesterCodes();
        setTesters(testerCodes);

        const consultantCodes = await getAllConsultantsCodes();
        setConsultants(consultantCodes);
      } catch (error) {
        console.error('Error fetching tester/consultant codes:', error);
      }
    };
    fetchData();
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

  const isNumeric = (...values) => values.every(val => !isNaN(val));

  const handleSubmit = async () => {
    const {
      id,
      name_of_party,
      details_of_work,
      amount,
      total_incl_gst,
      material_receipt,
      testing_status,
      report_status,
      payment_status,
      payment_date,
      jv_no,
      receipt_no,
      date,
      testers,
      remarks,
      entered_by,
    } = formData;

    if (
      !name_of_party ||
      !details_of_work ||
      !amount ||
      !total_incl_gst ||
      !material_receipt ||
      testing_status === '' ||
      report_status === '' ||
      payment_status === '' ||
      !payment_date ||
      !jv_no ||
      !receipt_no ||
      !date ||
      !testers ||
      !remarks ||
      !entered_by
    ) {
      Alert.alert('Please fill all fields!');
      return;
    }

    if (!isNumeric(amount, total_incl_gst)) {
      Alert.alert('Amount fields must be numeric!');
      return;
    }

    try {
      await addTestingRecord({
        ...formData,
        testing_status: parseInt(testing_status),
        report_status: parseInt(report_status),
        payment_status: parseInt(payment_status),
      });
      Alert.alert('Record added successfully!');
      setFormData({
        name_of_party: '',
        details_of_work: '',
        amount: '',
        total_incl_gst: '',
        material_receipt: '',
        testing_status: '',
        report_status: '',
        payment_status: '',
        payment_date: '',
        jv_no: '',
        receipt_no: '',
        date: '',
        testers: '',
        remarks: '',
        entered_by: '',
      });
    } catch (error) {
      console.error('Error adding record:', error);
      Alert.alert('Failed to add record. Please try again.');
    }
  };

  const handleFetch = async id => {
    try {
      const result = await getTestingRecordByID(id);
      if (result) {
        console.log('Fetched record:', result);
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
          testers: result.testers,
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

      await updateTestingRecord(formData);
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
      <Text style={styles.heading}>Process Testing Form</Text>
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

      <View style={styles.row}>
        <Picker
          selectedValue={formData.testing_status}
          style={styles.picker}
          onValueChange={value => handleChange('testing_status', value)}>
          <Picker.Item label="Select Testing Status" value="" />
          <Picker.Item label="Done" value="1" />
          <Picker.Item label="Pending" value="0" />
        </Picker>
        <Picker
          selectedValue={formData.report_status}
          style={styles.picker}
          onValueChange={value => handleChange('report_status', value)}>
          <Picker.Item label="Select Report Status" value="" />
          <Picker.Item label="Completed" value="1" />
          <Picker.Item label="Pending" value="0" />
        </Picker>
        <Picker
          selectedValue={formData.payment_status}
          style={styles.picker}
          onValueChange={value => handleChange('payment_status', value)}>
          <Picker.Item label="Select Payment Status" value="" />
          <Picker.Item label="Paid" value="1" />
          <Picker.Item label="Unpaid" value="0" />
        </Picker>
      </View>

      <View style={styles.row}>
        <Picker
          selectedValue={formData.testers}
          style={styles.picker}
          onValueChange={value => handleChange('testers', value)}>
          <Picker.Item label="Select Tester" value="" />
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

export default ProcessTestingForm;

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
