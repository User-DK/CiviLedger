import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ViewConsultingRecords = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://your-backend-url.com/api/consulting_records?page=${page}&size=${pageSize}`,
      );
      const result = await response.json();
      setData(result.records);
      setTotalPages(result.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name_of_party}</Text>
      <Text style={styles.cell}>{item.details_of_work}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}>{item.total_incl_gst}</Text>
      <Text style={styles.cell}>{item.cumulative_amount}</Text>
      <Text style={styles.cell}>{item.material_receipt}</Text>
      <Text style={styles.cell}>{item.payment_date}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.jv_no}</Text>
      <Text style={styles.cell}>{item.receipt_no}</Text>
      <Text style={styles.cell}>{item.material_properties}</Text>
      <Text style={styles.cell}>{item.cube_preparation}</Text>
      <Text style={styles.cell}>{item.casting}</Text>
      <Text style={styles.cell}>{item.demoulding}</Text>
      <Text style={styles.cell}>{item.testing}</Text>
      <Text style={styles.cell}>{item.remarks}</Text>
      <Text style={styles.cell}>{item.entered_by}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Consulting Records</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView horizontal>
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>Party</Text>
              <Text style={styles.headerCell}>Details of Work</Text>
              <Text style={styles.headerCell}>Amount</Text>
              <Text style={styles.headerCell}>Total Incl GST</Text>
              <Text style={styles.headerCell}>Cumulative Amount</Text>
              <Text style={styles.headerCell}>Material Receipt</Text>
              <Text style={styles.headerCell}>Payment Date</Text>
              <Text style={styles.headerCell}>Date</Text>
              <Text style={styles.headerCell}>JV No</Text>
              <Text style={styles.headerCell}>Receipt No</Text>
              <Text style={styles.headerCell}>Material Properties</Text>
              <Text style={styles.headerCell}>Cube Preparation</Text>
              <Text style={styles.headerCell}>Casting</Text>
              <Text style={styles.headerCell}>Demoulding</Text>
              <Text style={styles.headerCell}>Testing</Text>
              <Text style={styles.headerCell}>Remarks</Text>
              <Text style={styles.headerCell}>Entered By</Text>
            </View>

            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      )}

      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={page === 1}
          onPress={() => setPage(page - 1)}
          style={[styles.pageButton, page === 1 && styles.disabledButton]}>
          <Text style={styles.pageText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>
          Page {page} of {totalPages}
        </Text>
        <TouchableOpacity
          disabled={page === totalPages}
          onPress={() => setPage(page + 1)}
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

export default ViewConsultingRecords;

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
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 8,
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
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageText: {
    fontSize: 16,
  },
});
