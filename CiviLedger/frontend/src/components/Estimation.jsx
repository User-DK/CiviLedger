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
import {useNavigation} from '@react-navigation/native';

const testTypes = {
  'LL PL Earth Work': 1000,
  'Proctor Density': 1500,
  'Sieve Analysis for Hard Murrm': 1000,
  'Liquid lim. & Plastic lim.-Murum': 1000,
  'Sieve Analysis for 40mm Below': 550,
  'Group Test for 40mm Below': 2300,
  'Flakiness Index for 40mm Below': 750,
  'Sieve Analysis for 40mm Above': 550,
  'Group Test for 40mm Above': 2700,
  'Flakiness Index for 40mm Above': 750,
  'Bitumen: Penetration, Softening Point, Sp. Gravity': 1650,
  Ductility: 1000,
  Penetration: 550,
  'Softening Point': 550,
  'Sieve Analysis Mix Material': 550,
  'Group Test Mix Material': 2300,
  'Flakiness Mix Material': 750,
  'Extraction Mix Material': 1350,
  'GSB Mix Design': 15000,
  'BM Job Mix Design': 7500,
  'BC Job Mix Design': 15500,
  'Cement Testing': 3500,
  'Crushed Sand (Sieve +Silt)': 1100,
  'Bricks (Wet, Dry, Water Absorption)': 3000,
  'Bricks (Wet, Dry, Water Absorption, Efflorescence)': 2250,
  'Concrete Cube': 500,
  'Steel testing': 1200,
  'Concrete Mix Design': 12500,
  '20 mm Aggregate (Sieve Analysis)': 550,
  '10 mm Aggregate (Sieve Analysis)': 1850,
  '10/20 mm Aggregate (Gr. Test)': 2300,
};

const EstimationForm = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name_of_party: '',
    service_type: '',
    igst: '',
    cgst: '',
    items: [],
  });

  const [currentItem, setCurrentItem] = useState({
    material_type: '',
    test_name: '',
    no_of_tests: '',
    basic_amount: '',
  });

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleItemChange = (name, value) => {
    if (name === 'test_name' && testTypes[value]) {
      setCurrentItem({
        ...currentItem,
        test_name: value,
        basic_amount: testTypes[value].toString(),
      });
    } else {
      setCurrentItem({...currentItem, [name]: value});
    }
  };

  const addItem = () => {
    if (
      currentItem.material_type &&
      currentItem.test_name &&
      currentItem.no_of_tests &&
      currentItem.basic_amount
    ) {
      setFormData({
        ...formData,
        items: [...formData.items, {...currentItem}],
      });
      setCurrentItem({
        material_type: '',
        test_name: '',
        no_of_tests: '',
        basic_amount: '',
      });
    }
  };

  const calculateTotalAmount = () => {
    const totalBasicAmount = formData.items.reduce(
      (sum, item) =>
        sum + parseFloat(item.basic_amount) * parseInt(item.no_of_tests),
      0,
    );
    const igstAmount =
      (totalBasicAmount * parseFloat(formData.igst || '0')) / 100;
    const cgstAmount =
      (totalBasicAmount * parseFloat(formData.cgst || '0')) / 100;
    return totalBasicAmount + igstAmount + cgstAmount;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Estimation Form</Text>

      <TextInput
        style={[styles.input, styles.uniformField]}
        placeholder="Name of Party"
        value={formData.name_of_party}
        onChangeText={value => handleChange('name_of_party', value)}
      />

      <Picker
        selectedValue={formData.service_type}
        style={[styles.picker, styles.serviceTypePicker]}
        onValueChange={value => handleChange('service_type', value)}>
        <Picker.Item label="Select Service Type" value="" />
        <Picker.Item label="Testing" value="1" />
        <Picker.Item label="Consultancy" value="2" />
        <Picker.Item label="TPA" value="3" />
      </Picker>

      <TextInput
        style={[styles.input, styles.uniformField]}
        placeholder="IGST (%)"
        keyboardType="numeric"
        value={formData.igst}
        onChangeText={value => handleChange('igst', value)}
      />
      <TextInput
        style={[styles.input, styles.uniformField]}
        placeholder="CGST (%)"
        keyboardType="numeric"
        value={formData.cgst}
        onChangeText={value => handleChange('cgst', value)}
      />

      <View style={styles.row}>
        <Picker
          selectedValue={currentItem.material_type}
          style={[styles.picker, styles.column, styles.uniformField]}
          onValueChange={value => handleItemChange('material_type', value)}>
          <Picker.Item label="Select Material Type" value="" />
          <Picker.Item label="SOIL" value="SOIL" />
          <Picker.Item label="Aggregate" value="Aggregate" />
          <Picker.Item label="Building Materials" value="Building_Materials" />
          <Picker.Item label="BT Mix Designs" value="BT_Mix_Designs" />
          <Picker.Item label="Paving_Mixtures" value="Paving_Mixtures" />
          <Picker.Item label="Bitumen" value="Bitumen" />
        </Picker>
        <Picker
          selectedValue={currentItem.test_name}
          style={[styles.picker, styles.column, styles.uniformField]}
          onValueChange={value => handleItemChange('test_name', value)}>
          <Picker.Item label="Select Test Name" value="" />
          {Object.keys(testTypes).map(test => (
            <Picker.Item key={test} label={test} value={test} />
          ))}
        </Picker>
        <TextInput
          style={[
            styles.input,
            styles.column,
            styles.uniformField,
            {marginVertical: 11},
          ]}
          placeholder="No. of Tests"
          keyboardType="numeric"
          value={currentItem.no_of_tests}
          onChangeText={value => handleItemChange('no_of_tests', value)}
        />
        <TextInput
          style={[
            styles.input,
            styles.column,
            styles.uniformField,
            {marginVertical: 11},
          ]}
          placeholder="Basic Amount (Rs)"
          keyboardType="numeric"
          value={currentItem.basic_amount}
          editable={false}
        />
        <Button title="Add" onPress={addItem} />
      </View>

      <View style={styles.row}>
        <Text style={[styles.column, styles.columnTitle]}>Sr.No</Text>
        <Text style={[styles.column, styles.columnTitle]}>
          Type of Material
        </Text>
        <Text style={[styles.column, styles.columnTitle]}>Name of Test</Text>
        <Text style={[styles.column, styles.columnTitle]}>No. of Tests</Text>
        <Text style={[styles.column, styles.columnTitle]}>
          Total Amount (Rs.)
        </Text>
      </View>

      {formData.items.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.column, styles.centeredText]}>{index + 1}</Text>
          <Text style={[styles.column, styles.centeredText]}>
            {item.material_type}
          </Text>
          <Text style={[styles.column, styles.centeredText]}>
            {item.test_name}
          </Text>
          <Text style={[styles.column, styles.centeredText]}>
            {item.no_of_tests}
          </Text>
          <Text style={[styles.column, styles.centeredText]}>
            {parseFloat(item.basic_amount) * parseInt(item.no_of_tests)}
          </Text>
        </View>
      ))}

      <Text style={styles.totalAmount}>
        Final Amount: Rs.{' '}
        {isNaN(calculateTotalAmount())
          ? '0.00'
          : calculateTotalAmount().toFixed(2)}
      </Text>

      <Button
        title="Submit"
        onPress={() => console.log('Form Submitted', formData)}
      />
    </ScrollView>
  );
};

export default EstimationForm;

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
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  columnTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
  picker: {
    width: '100%',
  },
  uniformField: {
    height: 50,
    paddingHorizontal: 12,
    justifyContent: 'center',
    fontSize: 16,
  },
  serviceTypePicker: {
    height: 35,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
