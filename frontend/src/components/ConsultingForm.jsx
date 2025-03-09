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


const ConsultingForm = () => {
  const [formData, setFormData] = useState({
    name_of_party: '',
    details_of_work: '',
    amount: '',
    total_incl_gst: '',
    cumulative_amount: '',
    cumulative_amount_incl_gst: '',
    material_receipt: '',
    payment_date: new Date(),
    date: new Date(),
    jv_no: '',
    receipt_no: '',
    material_properties: '',
    cube_preparation: '',
    casting: '',
    demoulding: '',
    testing: '',
    remarks: '',
    entered_by: '',
  });

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Process Consultancy Form</Text>

      {/* Single-column text input */}
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

      {/* Three-column layout for date fields */}
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

      {/* Three-column layout for process-related pickers */}
      <View style={styles.row}>
        <Picker
          selectedValue={formData.material_properties}
          style={styles.picker}
          onValueChange={value => handleChange('material_properties', value)}>
          <Picker.Item label="Select Material Properties" value="" />
          <Picker.Item label="Option 1" value="Option 1" />
          <Picker.Item label="Option 2" value="Option 2" />
        </Picker>
        <Picker
          selectedValue={formData.cube_preparation}
          style={styles.picker}
          onValueChange={value => handleChange('cube_preparation', value)}>
          <Picker.Item label="Select Cube Preparation" value="" />
          <Picker.Item label="Option 1" value="Option 1" />
          <Picker.Item label="Option 2" value="Option 2" />
        </Picker>
        <Picker
          selectedValue={formData.casting}
          style={styles.picker}
          onValueChange={value => handleChange('casting', value)}>
          <Picker.Item label="Select Casting" value="" />
          <Picker.Item label="Option 1" value="Option 1" />
          <Picker.Item label="Option 2" value="Option 2" />
        </Picker>
      </View>

      {/* Three-column layout for demoulding, testing, entered_by */}
      <View style={styles.row}>
        <Picker
          selectedValue={formData.demoulding}
          style={styles.picker}
          onValueChange={value => handleChange('demoulding', value)}>
          <Picker.Item label="Select Demoulding" value="" />
          <Picker.Item label="Option 1" value="Option 1" />
          <Picker.Item label="Option 2" value="Option 2" />
        </Picker>
        <Picker
          selectedValue={formData.testing}
          style={styles.picker}
          onValueChange={value => handleChange('testing', value)}>
          <Picker.Item label="Select Testing" value="" />
          <Picker.Item label="Option 1" value="Option 1" />
          <Picker.Item label="Option 2" value="Option 2" />
        </Picker>
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

export default ConsultingForm;

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    // backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    // borderColor: '#ccc',
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
  datePicker: {
    width: '30%',
    height: 50,
    marginHorizontal: 5,
  },
});
