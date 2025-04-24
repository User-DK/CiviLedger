import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import {getAllTestRates} from '../../db/tables/estimation'; // Assuming the getAllTestRates method is in this file

const ViewTestRates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAllTestRates();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.test_name}</Text>
      <Text style={styles.cell}>{item.rate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Test Rates</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        // FlatList now handles all scrolling, no need for ScrollView
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>Test Name</Text>
              <Text style={styles.headerCell}>Rate</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default ViewTestRates;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
