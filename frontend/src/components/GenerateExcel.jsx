import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Linking } from 'react-native';

const GenerateExcel = () => {
  const handleExport = async (type) => {
    const url = `http://localhost:5000/api/view/excel/${type}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url); // This will open the browser
    } else {
      Alert.alert('Error', 'Cannot open browser to download the file.');
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
  },
});
