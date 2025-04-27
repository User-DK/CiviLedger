import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {Linking} from 'react-native';
import {getip} from '../../db/tables/ip';

const GenerateExcel = () => {
  const handleExport = async type => {
    try {
      const ipdata = await getip();
      const ip = ipdata ? ipdata.ip : 'localhost:5000'; // Default to localhost if no IP is found
      const url = `http://${ip}/api/view/excel/${type}`;

      const supported = await Linking.canOpenURL(url);
      if (supported) {
        try {
          await Linking.openURL(url); // Attempt to open the URL
        } catch (openError) {
          console.error('Error opening URL:', openError);
          Alert.alert('Error', 'Failed to open the URL.');
        }
      } else {
        Alert.alert(
          'Error',
          'Browser cannot open the URL to download the file.',
        );
      }
    } catch (error) {
      console.error('Error during export:', error);
      Alert.alert('Error', error.message || 'An error occurred during export.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Excel Sheets</Text>
      <Button
        title="🧪 Export Testing Records"
        onPress={() => handleExport('testing')}
        buttonStyle={styles.button}
      />
      <Button
        title="💼 Export Consultancy Records"
        onPress={() => handleExport('consultancy')}
        buttonStyle={styles.button}
      />
      <Button
        title="📄 Export TPA Records"
        onPress={() => handleExport('tpa')}
        buttonStyle={styles.button}
      />
      <Button
        title="📊 Export Estimation Records"
        onPress={() => handleExport('estimation')}
        buttonStyle={styles.button}
      />
      <Button
        title="📋 Export Estimation Details"
        onPress={() => handleExport('estimationDetails')}
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default GenerateExcel;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
