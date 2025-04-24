// import React, { useState } from 'react';
// import { View, Button, Alert } from 'react-native';
// import RNFS from 'react-native-fs';  // File system module
// import { WebView } from 'react-native-webview';  // WebView to display file
// import { Buffer } from 'buffer';  // To handle ArrayBuffer to Base64

// const GenerateExcel = () => {
//   const [showWebView, setShowWebView] = useState(false);
//   const [fileUri, setFileUri] = useState(null);

//   const handleExport = async (type) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/view/excel/${type}`, {
//         method: 'GET',
//       });

//       if (response.ok) {
//         const blob = await response.blob();
//         const arrayBuffer = await blob.arrayBuffer();

//         // Get the Desktop path based on your username (91963)
//         const desktopPath = `C:/Users/91963/Desktop`;

//         // Define the file path where the Excel file will be saved
//         const filePath = `${desktopPath}\\${type}_records.xlsx`;

//         // Convert ArrayBuffer to base64 for writing to the file system
//         const buffer = Buffer.from(arrayBuffer);

//         // Write the file to the Desktop
//         await RNFS.writeFile(filePath, buffer.toString('base64'), 'base64');
//         Alert.alert('Success', `${type} Excel file saved to Desktop`);

//         // Prepare to show the WebView
//         setFileUri(filePath);
//         setShowWebView(true);
//       } else {
//         Alert.alert('Error', 'Failed to generate Excel file.');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'An unexpected error occurred.');
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {showWebView ? (
//         <WebView
//           source={{ uri: fileUri }}
//           style={{ marginTop: 20, flex: 1 }}
//           startInLoadingState
//         />
//       ) : (
//         <View>
//           <Button title="🧪 Export Testing Records" onPress={() => handleExport('testing')} />
//           <Button title="💼 Export Consultancy Records" onPress={() => handleExport('consultancy')} />
//           <Button title="📄 Export TPA Records" onPress={() => handleExport('tpa')} />
//         </View>
//       )}
//     </View>
//   );
// };

// export default GenerateExcel;




//2
// import React from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import { Button } from 'react-native-elements';

// const GenerateExcel = () => {
//   const handleExport = async (type) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/view/excel/${type}`, {
//         method: 'GET',
//       });

//       if (response.ok) {
//         Alert.alert('Success', `${type} Excel file generated successfully!`);
//         // Optional: handle file download here (requires native file system access)
//       } else {
//         Alert.alert('Error', `Failed to generate ${type} Excel file.`);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'An unexpected error occurred.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Generate Excel Sheets</Text>
//       <Button
//         title="🧪 Export Testing Records"
//         onPress={() => handleExport('testing')}
//         buttonStyle={styles.button}
//       />
//       <Button
//         title="💼 Export Consultancy Records"
//         onPress={() => handleExport('consultancy')}
//         buttonStyle={styles.button}
//       />
//       <Button
//         title="📄 Export TPA Records"
//         onPress={() => handleExport('tpa')}
//         buttonStyle={styles.button}
//       />
//     </View>
//   );
// };

// export default GenerateExcel;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     gap: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: 'green',
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
// });


//3
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
