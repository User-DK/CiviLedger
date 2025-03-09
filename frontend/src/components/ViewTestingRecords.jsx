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

const ViewTestingRecords = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Entries per page

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://your-backend-url.com/api/testing_records?page=${page}&size=${pageSize}`,
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
      <Text style={styles.cell}>{item.cumulative_amount_incl_gst}</Text>
      <Text style={styles.cell}>{item.material_receipt}</Text>
      <Text style={styles.cell}>{item.testing_status}</Text>
      <Text style={styles.cell}>{item.report_status}</Text>
      <Text style={styles.cell}>{item.payment_status}</Text>
      <Text style={styles.cell}>{item.payment_date}</Text>
      <Text style={styles.cell}>{item.jv_no}</Text>
      <Text style={styles.cell}>{item.receipt_no}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.testers}</Text>
      <Text style={styles.cell}>{item.remarks}</Text>
      <Text style={styles.cell}>{item.entered_by}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Testing Records</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView horizontal>
          <View>
            {/* Table Header */}
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>Party</Text>
              <Text style={styles.headerCell}>Details of Work</Text>
              <Text style={styles.headerCell}>Amount</Text>
              <Text style={styles.headerCell}>Total Incl GST</Text>
              <Text style={styles.headerCell}>Cumulative Amount</Text>
              <Text style={styles.headerCell}>Cumulative Incl GST</Text>
              <Text style={styles.headerCell}>Material Receipt</Text>
              <Text style={styles.headerCell}>Testing Status</Text>
              <Text style={styles.headerCell}>Report Status</Text>
              <Text style={styles.headerCell}>Payment Status</Text>
              <Text style={styles.headerCell}>Payment Date</Text>
              <Text style={styles.headerCell}>JV No</Text>
              <Text style={styles.headerCell}>Receipt No</Text>
              <Text style={styles.headerCell}>Date</Text>
              <Text style={styles.headerCell}>Testers</Text>
              <Text style={styles.headerCell}>Remarks</Text>
              <Text style={styles.headerCell}>Entered By</Text>
            </View>

            {/* Table Data */}
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      )}

      {/* Pagination Controls */}
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

export default ViewTestingRecords;

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
