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
import {getPaginatedProcessEstimations} from '../../db/tables/ProcessEstimation'; // Import the function to fetch paginated estimations
import CustomModal from './CustomModal';
import {getEstimationDetailsByPartyID} from '../../db/tables/EstimationDetails';

const ViewEstimation = () => {
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
      const result = await getPaginatedProcessEstimations(page, pageSize); // Fetch paginated data
      if (result?.records) {
        setData(result.records);
        setTotalPages(result.totalPages || 1);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const openModal = async item => {
    try {
      const details = await getEstimationDetailsByPartyID(item.id);
      if (details && details.length > 0) {
        const formattedDetails = details.map(detail => ({
          material_type: detail.material_type,
          test_name: detail.test_name,
          no_of_tests: detail.no_of_tests,
          total_amount: detail.total_amount,
        }));
        Alert.alert(JSON.stringify(formattedDetails));
        setSelectedItem({...item, details: formattedDetails});
      } else {
        setSelectedItem(item);
      }
    } catch (error) {
      console.error('Error fetching estimation details:', error);
      setSelectedItem(item);
    } finally {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Estimation Records</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id?.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => openModal(item)}>
              <Text style={styles.cardTitle}>ID: {item.id}</Text>
              <Text style={styles.cardSubtitle}>
                Name of Party: {item.name_of_party}
              </Text>
              <Text style={styles.cardSubtitle}>
                Service Type: {item.service_type}
              </Text>
              <Text style={styles.cardSubtitle}>
                Total Amount: Rs. {item.total_amount}
              </Text>
              <Text style={styles.cardSubtitle}>
                Last Updated: {item.lastUpdatedAt}
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

      {/* Custom Modal to show record details */}
      <CustomModal
        visible={modalVisible}
        data={selectedItem}
        onClose={closeModal}
      />
    </View>
  );
};

export default ViewEstimation;

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
