import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getPaginatedTesterRecords } from '../../db/tables/testers';

const ViewTestersRecords = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const pageSize = 15;

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getPaginatedTesterRecords(page, pageSize);
      if (result?.records) {
        setData(result.records);
        const total = Math.ceil(result.totalPages / pageSize);
        setTotalPages(total || 1);
      } else {
        setData([]);
      }
      Alert.alert("results", JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const openModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Testers Records</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.tester_code?.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => openModal(item)}>
              <Text style={styles.cardTitle}>
                Tester Code: {item.tester_code}
              </Text>
              <Text style={styles.cardSubtitle}>
                Name of the Tester: {item.tester_name}
              </Text>
              <Text style={styles.cardSubtitle}>
                Tester Phone: {item.tester_phone}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={page === 1}
          onPress={() => setPage(prev => prev - 1)}
          style={[styles.pageButton, page === 1 && styles.disabledButton]}>
          <Text style={styles.pageText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>
          Page {page} of {totalPages}
        </Text>
        <TouchableOpacity
          disabled={page === totalPages}
          onPress={() => setPage(prev => prev + 1)}
          style={[
            styles.pageButton,
            page === totalPages && styles.disabledButton,
          ]}>
          <Text style={styles.pageText}>Next</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default ViewTestersRecords;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#919191',
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  pageButton: {
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageText: {
    fontSize: 14,
    marginHorizontal: 10,
  },
});
