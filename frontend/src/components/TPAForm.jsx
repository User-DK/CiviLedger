import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const ProcessTPAForm = () => {
  const [formData, setFormData] = useState({
    name_of_party: '',
    name_of_corporation: '',
    details_of_work: '',
    amount: '',
    total_incl_gst: '',
    cumulative_amount: '',
    cumulative_amount_incl_gst: '',
    visit_status: '',
    document_receipt: '',
    report_status: '',
    payment_status: '',
    payment_date: '',
    jv_no: '',
    receipt_no: '',
    consultant_code: '',
    date: '',
    remarks: '',
    entered_by: '',
  });

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Process TPA Form</Text>

      {/* Single-column text input */}
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

      {/* Three-column layout for amount fields */}
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
        <TextInput
          style={[styles.input, styles.column]}
          placeholder="Cumulative Amount"
          keyboardType="numeric"
          value={formData.cumulative_amount}
          onChangeText={value => handleChange('cumulative_amount', value)}
        />
      </View>

      {/* Three-column layout for date fields (No Date Picker) */}
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

      {/* Three-column layout for pickers */}
      <View style={styles.row}>
        <Picker
          selectedValue={formData.visit_status}
          style={styles.picker}
          onValueChange={value => handleChange('visit_status', value)}>
          <Picker.Item label="Select Visit Status" value="" />
          <Picker.Item label="Visited" value="Visited" />
          <Picker.Item label="Not Visited" value="Not Visited" />
        </Picker>
        <Picker
          selectedValue={formData.report_status}
          style={styles.picker}
          onValueChange={value => handleChange('report_status', value)}>
          <Picker.Item label="Select Report Status" value="" />
          <Picker.Item label="Completed" value="Completed" />
          <Picker.Item label="Pending" value="Pending" />
        </Picker>
        <Picker
          selectedValue={formData.payment_status}
          style={styles.picker}
          onValueChange={value => handleChange('payment_status', value)}>
          <Picker.Item label="Select Payment Status" value="" />
          <Picker.Item label="Paid" value="Paid" />
          <Picker.Item label="Unpaid" value="Unpaid" />
        </Picker>
      </View>

      {/* Three-column layout for document receipt, consultant code, and entered by */}
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.column]}
          placeholder="Document Receipt"
          value={formData.document_receipt}
          onChangeText={value => handleChange('document_receipt', value)}
        />
        <TextInput
          style={[styles.input, styles.column]}
          placeholder="Consultant Code"
          value={formData.consultant_code}
          onChangeText={value => handleChange('consultant_code', value)}
        />
        <TextInput
          style={[styles.input, styles.column]}
          placeholder="Entered By"
          value={formData.entered_by}
          onChangeText={value => handleChange('entered_by', value)}
        />
      </View>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Remarks"
        multiline
        numberOfLines={4}
        value={formData.remarks}
        onChangeText={value => handleChange('remarks', value)}
      />

      {/* Submit Button */}
      <Button
        title="Submit"
        onPress={() => console.log('Form Submitted', formData)}
      />
    </ScrollView>
  );
};

export default ProcessTPAForm;

// Styles
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
    width: '100%',
    marginHorizontal: 5,
  },
});
