// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
// } from 'react-native';
// import {getAllTestRates} from '../../db/tables/estimation'; // Assuming the getAllTestRates method is in this file

// const ViewTestRates = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const result = await getAllTestRates();
//       setData(result);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderItem = ({item}) => (
//     <View style={styles.row}>
//       <Text style={styles.cell}>{item.test_name}</Text>
//       <Text style={styles.cell}>{item.rate}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Test Rates</Text>

//       {loading ? (
//         <ActivityIndicator size="large" />
//       ) : (
//         // FlatList now handles all scrolling, no need for ScrollView
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//           ListHeaderComponent={
//             <View style={styles.headerRow}>
//               <Text style={styles.headerCell}>Test Name</Text>
//               <Text style={styles.headerCell}>Rate</Text>
//             </View>
//           }
//         />
//       )}
//     </View>
//   );
// };

// export default ViewTestRates;

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   headerCell: {
//     flex: 1,
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingHorizontal: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   cell: {
//     flex: 1,
//     fontSize: 14,
//     textAlign: 'center',
//     paddingHorizontal: 8,
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  getAllTestRates,
  addMaterialType,
  addTestRate,
  updateTestRate,
} from '../../db/tables/MaterialsAndTestRates'; // Update the path if needed

const ViewTestRates = () => {
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    materialType: '',
    testName: '',
    rate: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const data = await getAllTestRates(); // Should return array [{ material_type, test_name, rate }]
      setTests(data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const handleNewTestChange = (field, value) => {
    setNewTest({...newTest, [field]: value});
  };

  const handleAddTest = async () => {
    const {materialType, testName, rate} = newTest;

    if (!materialType || !testName || !rate) {
      Alert.alert('Please fill all fields!');
      return;
    }

    if (isNaN(rate)) {
      Alert.alert('Rate must be a number!');
      return;
    }

    try {
      await addMaterialType({material_name: materialType});
      await addTestRate({
        material_type: materialType,
        test_name: testName,
        rate: parseInt(rate),
      });

      Alert.alert('Test added successfully!');
      setNewTest({materialType: '', testName: '', rate: ''});
      fetchTests();
    } catch (error) {
      console.error('Error adding test:', error);
      Alert.alert('Error adding test. Maybe it already exists.');
    }
  };

  const handleEditChange = (index, field, value) => {
    const updatedTests = [...tests];
    updatedTests[index][field] = value;
    setTests(updatedTests);
  };

  const handleSaveEdit = async index => {
    const {material_type, test_name, rate} = tests[index];

    if (!material_type || !test_name || !rate) {
      Alert.alert('Please fill all fields!');
      return;
    }

    try {
      await updateTestRate(material_type, test_name, parseInt(rate));
      Alert.alert('Test updated successfully!');
      setEditingIndex(null);
      fetchTests();
    } catch (error) {
      console.error('Error updating test:', error);
      Alert.alert('Failed to update test.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add New Test</Text>

      <TextInput
        style={styles.input}
        placeholder="Material Type"
        value={newTest.materialType}
        onChangeText={value => handleNewTestChange('materialType', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Test Name"
        value={newTest.testName}
        onChangeText={value => handleNewTestChange('testName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Rate"
        value={newTest.rate}
        onChangeText={value => handleNewTestChange('rate', value)}
        keyboardType="numeric"
      />

      <Button title="Add Test" onPress={handleAddTest} />

      <Text style={styles.listHeading}>Existing Tests</Text>

      {tests.map((test, index) => (
        <View key={index} style={styles.testItem}>
          {editingIndex === index ? (
            <>
              <TextInput
                style={styles.input}
                value={test.test_name}
                onChangeText={value =>
                  handleEditChange(index, 'test_name', value)
                }
              />
              <TextInput
                style={styles.input}
                value={String(test.rate)}
                onChangeText={value => handleEditChange(index, 'rate', value)}
                keyboardType="numeric"
              />
              <Button title="Save" onPress={() => handleSaveEdit(index)} />
            </>
          ) : (
            <>
              <Text style={styles.materialType}>{test.material_type}</Text>
              <Text style={styles.testDetails}>
                {test.test_name} - ₹{test.rate}
              </Text>
              <TouchableOpacity
                onPress={() => setEditingIndex(index)}
                style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default ViewTestRates;

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
  listHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  testItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  materialType: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  testDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 5,
    minWidth: 80, // ensures a minimum width
    justifyContent: 'center',
    alignItems: 'center', // centers the text horizontally
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
