import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const CustomModal = ({visible, onClose, data}) => {
  if (!visible) return null;

  const renderValue = (key, value) => {
    // If the key is "details" and the value is an object, render its sub-keys
    if (key === 'details' && value && typeof value === 'object') {
      // If it's an array, map through each detail object
      if (Array.isArray(value)) {
        return value.map((detail, index) => (
          <View key={index} style={styles.nestedContainer}>
            {Object.entries(detail).map(([subKey, subValue]) => (
              <Text key={subKey} style={styles.nestedText}>
                {subKey}: {String(subValue)}
              </Text>
            ))}
          </View>
        ));
      }
      // Otherwise, if it's an object, render its entries
      return (
        <View style={styles.nestedContainer}>
          {Object.entries(value).map(([subKey, subValue]) => (
            <Text key={subKey} style={styles.nestedText}>
              {subKey}: {String(subValue)}
            </Text>
          ))}
        </View>
      );
    }
    // For any other key, just return the stringified value
    return (
      <Text style={styles.label}>
        {key}: {String(value)}
      </Text>
    );
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Record Details</Text>
        <ScrollView style={styles.content}>
          {Object.entries(data || {}).map(([key, value]) => (
            <View key={key} style={styles.row}>
              {renderValue(key, value)}
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContainer: {
    width: '70%',
    maxHeight: '65%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    borderColor: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  content: {
    maxHeight: '75%',
    marginBottom: 15,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
  // value: {
  //   fontSize: 14,
  //   color: '#333',
  // },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nestedContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  nestedText: {
    fontSize: 18,
    color: '#555',
  },
});
