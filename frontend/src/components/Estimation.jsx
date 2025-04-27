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
import {Picker} from '@react-native-picker/picker';
import {addEstimationDetail} from '../../db/tables/EstimationDetails';
import {
  addProcessEstimation,
  updateTotalandGST,
} from '../../db/tables/ProcessEstimation';
import {
  getAllMaterialTypes,
  getMaterialTestsMap,
} from '../../db/tables/MaterialsAndTestRates'; // Update the path if needed
import {useEffect} from 'react';

const EstimationForm = () => {
  const [filteredTests, setFilteredTests] = useState([]);
  const [partyId, setPartyId] = useState(null); // Store partyId after adding party details
  const [materialTypes, setMaterialTypes] = useState([]); // Store material types
  const [materialTestsMap, setMaterialTestsMap] = useState({}); // Store material tests map
  //const [totalAmount, setTotalAmount] = useState(0); // Store total amount for the estimation
  const [formData, setFormData] = useState({
    name_of_party: '',
    service_type: '',
    igst: '18',
    cgst: '9',
    sgst: '9',
    items: [], // Store all items locally before submitting
  });

  const [currentItem, setCurrentItem] = useState({
    material_type: '',
    test_name: '',
    no_of_tests: '',
    basic_amount: '',
  });

  const fetchData = async () => {
    try {
      const materialTypes = await getAllMaterialTypes();
      const materialTestsMap = await getMaterialTestsMap(); // Fetch the material tests map from the database

      return {materialTypes, materialTestsMap};
    } catch (error) {
      console.error('Error fetching data:', error);
      return {materialTypes: [], materialTestsMap: {}};
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const {materialTypes, materialTestsMap} = await fetchData(); // <== now it calls the correct one
        setMaterialTypes(materialTypes);
        setMaterialTestsMap(materialTestsMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleItemChange = (name, value) => {
    if (name === 'material_type' && materialTestsMap) {
      const tests = materialTestsMap[value] || {};
      setFilteredTests(Object.keys(tests));
      setCurrentItem({
        material_type: value,
        test_name: '',
        basic_amount: '',
        no_of_tests: '',
      });
    } else if (name === 'test_name') {
      const basicAmount =
        materialTestsMap[currentItem.material_type]?.[value] ?? '';
      setCurrentItem(prevItem => ({
        ...prevItem,
        test_name: value,
        basic_amount: basicAmount,
      }));
    } else {
      setCurrentItem(prev => ({...prev, [name]: value}));
    }
  };

  const addPartyDetails = async () => {
    if (!formData.name_of_party || !formData.service_type) {
      Alert.alert(
        'Error',
        'Please fill in the Name of Party and Service Type.',
      );
      return;
    }

    try {
      const result = await addProcessEstimation({
        name_of_party: formData.name_of_party,
        service_type: formData.service_type,
        igst: formData.igst,
        cgst: formData.cgst,
        sgst: formData.sgst,
        total_amount: 0, // Initialize total amount as 0
        total_amount_inc_gst: 0, // Initialize total amount including GST as 0
      });

      if (result) {
        setPartyId(result); // Store the partyId for future use
        Alert.alert('Success', 'Party details added successfully!');
      } else {
        Alert.alert('Error', 'Failed to add party details.');
      }
    } catch (error) {
      console.error('Error adding party details:', error);
      Alert.alert('Error', 'An error occurred while adding party details.');
    }
  };

  const addItem = () => {
    const {material_type, test_name, no_of_tests, basic_amount} = currentItem;

    if (!material_type || !test_name || !no_of_tests || !basic_amount) {
      Alert.alert('Error', 'Please fill all fields for the item!');
      return;
    }

    const totalAmount = parseFloat(basic_amount) * parseInt(no_of_tests);

    const updatedItems = [
      ...formData.items,
      {
        material_type,
        test_name,
        no_of_tests,
        basic_amount,
        total_amount: totalAmount,
      },
    ];

    setFormData({
      ...formData,
      items: updatedItems,
    });

    // Reset the current item fields
    setCurrentItem({
      material_type: '',
      test_name: '',
      no_of_tests: '',
      basic_amount: '',
    });

    Alert.alert('Item added successfully!');
  };

  const calculateTotalAmountIncGST = () => {
    const totalBasicAmount = formData.items.reduce(
      (sum, item) =>
        sum + parseFloat(item.basic_amount) * parseInt(item.no_of_tests),
      0,
    );

    let gstPercentage = 0;

    if (parseFloat(formData.igst) > 0) {
      gstPercentage = parseFloat(formData.igst);
    } else {
      gstPercentage =
        parseFloat(formData.cgst || '0') + parseFloat(formData.sgst || '0');
    }

    const gstAmount = (totalBasicAmount * gstPercentage) / 100;

    const finalAmount = totalBasicAmount + gstAmount;

    return finalAmount;
  };

  const calculateTotalAmount = () => {
    const totalBasicAmount = formData.items.reduce(
      (sum, item) =>
        sum + parseFloat(item.basic_amount) * parseInt(item.no_of_tests),
      0,
    );
    return totalBasicAmount;
  };

  const handleSubmit = async () => {
    if (!partyId) {
      Alert.alert('Error', 'Please add party details first!');
      return;
    }

    if (formData.items.length === 0) {
      Alert.alert('Error', 'Please add at least one item!');
      return;
    }

    try {
      // Insert all items into the database
      for (const item of formData.items) {
        await addEstimationDetail({
          party_id: partyId,
          material_type: item.material_type,
          test_name: item.test_name,
          no_of_tests: item.no_of_tests,
          total_amount: item.total_amount,
        });
      }

      const totalAmount = calculateTotalAmount();
      const totalAmountIncGST = calculateTotalAmountIncGST();

      await updateTotalandGST(partyId, totalAmount, totalAmountIncGST);

      Alert.alert('Success', 'Estimation details submitted successfully!');
      setFormData({
        name_of_party: '',
        service_type: '',
        igst: '18',
        cgst: '9',
        sgst: '9',
        items: [],
      });
      setPartyId(null); // Reset partyId
    } catch (error) {
      console.error('Error submitting estimation details:', error);
      Alert.alert(
        'Error',
        'An error occurred while submitting estimation details.',
      );
    }
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

      <TextInput
        style={[styles.input, styles.uniformField]}
        placeholder="SGST (%)"
        keyboardType="numeric"
        value={formData.sgst}
        onChangeText={value => handleChange('sgst', value)}
      />

      <Button title="Add Party Details" onPress={addPartyDetails} />

      <View style={styles.row}>
        <Picker
          selectedValue={currentItem.material_type}
          style={[styles.picker, styles.column, styles.uniformField]}
          onValueChange={value => handleItemChange('material_type', value)}>
          <Picker.Item label="Select Material Type" value="" />
          {materialTypes.map(({material_name}) => (
            <Picker.Item
              key={material_name}
              label={material_name}
              value={material_name}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={currentItem.test_name}
          style={[styles.picker, styles.column, styles.uniformField]}
          onValueChange={value => handleItemChange('test_name', value)}>
          <Picker.Item label="Select Test Name" value="" />
          {filteredTests.map(test => (
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

      <Text style={styles.totalAmount}>
        Final Amount (Inc_gst): Rs.{' '}
        {isNaN(calculateTotalAmountIncGST())
          ? '0.00'
          : calculateTotalAmountIncGST().toFixed(2)}
      </Text>

      <Button title="Submit" onPress={handleSubmit} />
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
