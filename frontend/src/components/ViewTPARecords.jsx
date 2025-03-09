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

const ViewTPARecords = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Entries per page

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://your-backend-url.com/api/process_tpa?page=${page}&size=${pageSize}`,
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
      <Text style={styles.cell}>{item.name_of_corporation}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}>{item.total_incl_gst}</Text>
      <Text style={styles.cell}>{item.cumulative_amount}</Text>
      <Text style={styles.cell}>
        {item.visit_status ? 'Visited' : 'Not Visited'}
      </Text>
      <Text style={styles.cell}>{item.document_receipt}</Text>
      <Text style={styles.cell}>
        {item.report_status ? 'Completed' : 'Pending'}
      </Text>
      <Text style={styles.cell}>{item.payment_status ? 'Paid' : 'Unpaid'}</Text>
      <Text style={styles.cell}>{item.payment_date}</Text>
      <Text style={styles.cell}>{item.jv_no}</Text>
      <Text style={styles.cell}>{item.receipt_no}</Text>
      <Text style={styles.cell}>{item.consultant_code}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.remarks}</Text>
      <Text style={styles.cell}>{item.entered_by}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TPA Records</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <ScrollView horizontal>
          <View>
            {/* Table Header */}
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>Party</Text>
              <Text style={styles.headerCell}>Corporation</Text>
              <Text style={styles.headerCell}>Amount</Text>
              <Text style={styles.headerCell}>Total (GST)</Text>
              <Text style={styles.headerCell}>Cumulative</Text>
              <Text style={styles.headerCell}>Visit Status</Text>
              <Text style={styles.headerCell}>Document</Text>
              <Text style={styles.headerCell}>Report Status</Text>
              <Text style={styles.headerCell}>Payment Status</Text>
              <Text style={styles.headerCell}>Payment Date</Text>
              <Text style={styles.headerCell}>JV No</Text>
              <Text style={styles.headerCell}>Receipt No</Text>
              <Text style={styles.headerCell}>Consultant Code</Text>
              <Text style={styles.headerCell}>Date</Text>
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

export default ViewTPARecords;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    // backgroundColor: '#007bff',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    // color: '#fff',
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
    borderWidth: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  pageButton: {
    // backgroundColor: '#007bff',
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageText: {
    color: '#fff',
    fontSize: 16,
  },
});
