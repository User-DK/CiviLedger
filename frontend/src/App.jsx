// // import * as React from 'react';
// // import {View, Text, useColorScheme} from 'react-native';
// // import {useState} from 'react';
// // import {NavigationContainer} from '@react-navigation/native';
// // import {Button} from 'react-native-elements'; // Changed Button import
// // import AddConsultantsForm from './components/AddConsultantsForm';
// // import ConsultingForm from './components/ConsultingForm';
// // import AddTestersForm from './components/AddTestersForm';
// // import TestingForm from './components/TestingForm';
// // import TPAForm from './components/TPAForm';
// // import Home from './components/Home';
// // import LightTheme from './themes/LightTheme';
// // import DarkTheme from './themes/DarkTheme';
// // import {
// //   ThemeMode,
// //   RawThemeContext,
// //   ThemeContext,
// //   ThemeSetterContext,
// // } from './themes/Theme';

// // import HighContrastTheme from './themes/HighContrastTheme';
// // import useHighContrastState from './hooks/useHighContrastState';
// // // import useColorScheme from './hooks/useColorScheme';

// // export default function App() {
// //   const [selectedScreen, setSelectedScreen] = useState('Home');
// //   const [rawtheme, setRawTheme] = useState('system');
// //   const colorScheme = useColorScheme() || 'light';
// //   const theme = rawtheme === 'system' ? colorScheme || 'light' : rawtheme;

// //   const isHighContrast = useHighContrastState();

// //   const renderScreen = () => {
// //     switch (selectedScreen) {
// //       case 'Home':
// //         return <Home />;
// //       case 'AddConsultantsForm':
// //         return <AddConsultantsForm />;
// //       case 'ConsultingForm':
// //         return <ConsultingForm />;
// //       case 'AddTestersForm':
// //         return <AddTestersForm />;
// //       case 'TestingForm':
// //         return <TestingForm />;
// //       case 'TPAForm':
// //         return <TPAForm />;
// //       default:
// //         return <Home />;
// //     }
// //   };

// //   return (
// //     <ThemeSetterContext.Provider value={setRawTheme}>
// //       <RawThemeContext.Provider value={rawtheme}>
// //         <ThemeContext.Provider value={theme}>
// //           <NavigationContainer
// //             theme={
// //               isHighContrast
// //                 ? HighContrastTheme
// //                 : theme === 'dark'
// //                 ? DarkTheme
// //                 : LightTheme
// //             }>
// //             <View style={{flexDirection: 'row', height: '100%'}}>
// //               {/* Sidebar */}
// //               <View
// //                 style={{width: 250, backgroundColor: '#f0f0f0', padding: 20}}>
// //                 <Text
// //                   style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
// //                   Menu
// //                 </Text>
// //                 <Button
// //                   title="Home"
// //                   onPress={() => setSelectedScreen('Home')}
// //                 />
// //                 <Button
// //                   title="Add Consultants"
// //                   onPress={() => setSelectedScreen('AddConsultantsForm')}
// //                 />
// //                 <Button
// //                   title="Add Consultancy Data"
// //                   onPress={() => setSelectedScreen('ConsultingForm')}
// //                 />
// //                 <Button
// //                   title="Add Testers"
// //                   onPress={() => setSelectedScreen('AddTestersForm')}
// //                 />
// //                 <Button
// //                   title="Add Testing Data"
// //                   onPress={() => setSelectedScreen('TestingForm')}
// //                 />
// //                 <Button
// //                   title="Add TPA Data"
// //                   onPress={() => setSelectedScreen('TPAForm')}
// //                 />
// //               </View>

// //               {/* Main Content */}
// //               <View style={{flex: 1, padding: 20}}>{renderScreen()}</View>
// //             </View>
// //           </NavigationContainer>
// //         </ThemeContext.Provider>
// //       </RawThemeContext.Provider>
// //     </ThemeSetterContext.Provider>
// //   );
// // }

// import * as React from 'react';
// import { View, Text, useColorScheme, StyleSheet } from 'react-native';
// import { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { Button } from 'react-native-elements'; // Ensure package is installed
// import AddConsultantsForm from './components/AddConsultantsForm';
// import ConsultingForm from './components/ConsultingForm';
// import AddTestersForm from './components/AddTestersForm';
// import TestingForm from './components/TestingForm';
// import TPAForm from './components/TPAForm';
// import Home from './components/Home';
// import LightTheme from './themes/LightTheme';
// import DarkTheme from './themes/DarkTheme';
// import {
//   ThemeMode,
//   RawThemeContext,
//   ThemeContext,
//   ThemeSetterContext,
// } from './themes/Theme';
// import HighContrastTheme from './themes/HighContrastTheme';
// import useHighContrastState from './hooks/useHighContrastState';

// export default function App() {
//   const [selectedScreen, setSelectedScreen] = useState('Home');
//   const [rawtheme, setRawTheme] = useState('system');
//   const colorScheme = useColorScheme() || 'light';
//   const theme = rawtheme === 'system' ? colorScheme || 'light' : rawtheme;

//   const isHighContrast = useHighContrastState();
//   const appTheme =
//     isHighContrast ? HighContrastTheme : theme === 'dark' ? DarkTheme : LightTheme;

//   const renderScreen = () => {
//     switch (selectedScreen) {
//       case 'Home':
//         return <Home />;
//       case 'AddConsultantsForm':
//         return <AddConsultantsForm />;
//       case 'ConsultingForm':
//         return <ConsultingForm />;
//       case 'AddTestersForm':
//         return <AddTestersForm />;
//       case 'TestingForm':
//         return <TestingForm />;
//       case 'TPAForm':
//         return <TPAForm />;
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <ThemeSetterContext.Provider value={setRawTheme}>
//       <RawThemeContext.Provider value={rawtheme}>
//         <ThemeContext.Provider value={theme}>
//           <NavigationContainer theme={appTheme}>
//             <View style={styles.container}>
//               {/* Sidebar */}
//               <View style={styles.sidebar}>
//                 <Text style={styles.menuTitle}>Menu</Text>
//                 <View style={styles.buttonContainer}>
//                   <CustomButton title="Home" onPress={() => setSelectedScreen('Home')} />
//                   <CustomButton
//                     title="Add Consultants"
//                     onPress={() => setSelectedScreen('AddConsultantsForm')}
//                   />
//                   <CustomButton
//                     title="Add Consultancy Data"
//                     onPress={() => setSelectedScreen('ConsultingForm')}
//                   />
//                   <CustomButton
//                     title="Add Testers"
//                     onPress={() => setSelectedScreen('AddTestersForm')}
//                   />
//                   <CustomButton
//                     title="Add Testing Data"
//                     onPress={() => setSelectedScreen('TestingForm')}
//                   />
//                   <CustomButton
//                     title="Add TPA Data"
//                     onPress={() => setSelectedScreen('TPAForm')}
//                   />
//                 </View>
//               </View>

//               {/* Main Content */}
//               <View style={styles.mainContent}>{renderScreen()}</View>
//             </View>
//           </NavigationContainer>
//         </ThemeContext.Provider>
//       </RawThemeContext.Provider>
//     </ThemeSetterContext.Provider>
//   );
// }

// // Custom button component for consistency
// const CustomButton = ({ title, onPress }) => {
//   return (
//     <Button
//       title={title}
//       onPress={onPress}
//       buttonStyle={styles.button}
//       titleStyle={styles.buttonText}
//     />
//   );
// };

// // Stylesheet for consistency and professional look
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     height: '100%',
//     backgroundColor: '#F8F9FA',
//   },
//   sidebar: {
//     width: 250,
//     backgroundColor: '#EAECEF',
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//     borderRightWidth: 1,
//     borderRightColor: '#D1D5DB',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   menuTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     gap: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   mainContent: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'white',
//   },
// });

import * as React from 'react';
import {View, Text, useColorScheme, StyleSheet} from 'react-native';
import {useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import AddConsultantsForm from './components/AddConsultantsForm';
import ConsultingForm from './components/ConsultingForm';
import AddTestersForm from './components/AddTestersForm';
import TestingForm from './components/TestingForm';
import TPAForm from './components/TPAForm';
import ViewTPARecords from './components/ViewTPARecords';
import ViewTestingRecords from './components/ViewTestingRecords';
import ViewConsultingRecords from './components/ViewConsultingRecords';
import Home from './components/Home';
import LightTheme from './themes/LightTheme';
import DarkThemeCustom from './themes/DarkTheme';
import {
  ThemeMode,
  RawThemeContext,
  ThemeContext,
  ThemeSetterContext,
} from './themes/Theme';
import HighContrastTheme from './themes/HighContrastTheme';
import useHighContrastState from './hooks/useHighContrastState';

export default function App() {
  const [selectedScreen, setSelectedScreen] = useState('Home');
  const [rawtheme, setRawTheme] = useState('system');
  const colorScheme = useColorScheme() || 'light';
  const theme = rawtheme === 'system' ? colorScheme : rawtheme;
  const isHighContrast = useHighContrastState();

  // Select the active theme
  const appTheme = isHighContrast
    ? HighContrastTheme
    : theme === 'dark'
    ? DarkThemeCustom
    : LightTheme;

  console.log(appTheme);

  const renderScreen = () => {
    switch (selectedScreen) {
      case 'Home':
        return <Home />;
      case 'AddConsultantsForm':
        return <AddConsultantsForm />;
      case 'ConsultingForm':
        return <ConsultingForm />;
      case 'AddTestersForm':
        return <AddTestersForm />;
      case 'TestingForm':
        return <TestingForm />;
      case 'TPAForm':
        return <TPAForm />;
      case 'ViewTPARecords':
        return <ViewTPARecords />;
      case 'ViewTestingRecords':
        return <ViewTestingRecords />;
      case 'ViewConsultingRecords':
        return <ViewConsultingRecords />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeSetterContext.Provider value={setRawTheme}>
      <RawThemeContext.Provider value={rawtheme}>
        <ThemeContext.Provider value={theme}>
          <NavigationContainer theme={appTheme}>
            <View
              style={[
                styles.container,
                {backgroundColor: appTheme.colors.background},
              ]}>
              {/* Sidebar */}
              <View
                style={[
                  styles.sidebar,
                  {backgroundColor: appTheme.colors.card},
                ]}>
                {/* <Text style={[styles.menuTitle, { color: appTheme.colors.text }]}>Menu</Text> */}
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="Home"
                    onPress={() => setSelectedScreen('Home')}
                    theme={appTheme}
                  />
                  {/* <CustomButton
                    title="Add Consultants"
                    onPress={() => setSelectedScreen('AddConsultantsForm')}
                    theme={appTheme}
                  /> */}
                  <CustomButton
                    title="Add Consultancy Data"
                    onPress={() => setSelectedScreen('ConsultingForm')}
                    theme={appTheme}
                  />
                  {/* <CustomButton
                    title="Add Testers"
                    onPress={() => setSelectedScreen('AddTestersForm')}
                    theme={appTheme}
                  /> */}
                  <CustomButton
                    title="Add Testing Data"
                    onPress={() => setSelectedScreen('TestingForm')}
                    theme={appTheme}
                  />
                  <CustomButton
                    title="Add TPA Data"
                    onPress={() => setSelectedScreen('TPAForm')}
                    theme={appTheme}
                  />
                  <CustomButton
                    title="View TPA Records"
                    onPress={() => setSelectedScreen('ViewTPARecords')}
                    theme={appTheme}
                  />
                  <CustomButton
                    title="View Testing Records"
                    onPress={() => setSelectedScreen('ViewTestingRecords')}
                    theme={appTheme}
                  />

                  <CustomButton
                    title="View Consulting Records"
                    onPress={() => setSelectedScreen('ViewConsultingRecords')}
                    theme={appTheme}
                  />
                </View>
              </View>

              {/* Main Content */}
              <View
                style={[
                  styles.mainContent,
                  {backgroundColor: appTheme.colors.background},
                ]}>
                {renderScreen()}
              </View>
            </View>
          </NavigationContainer>
        </ThemeContext.Provider>
      </RawThemeContext.Provider>
    </ThemeSetterContext.Provider>
  );
}

// Custom button component using theme colors
const CustomButton = ({title, onPress, theme}) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      // buttonStyle={[styles.button, { backgroundColor: theme.colors.primary }]}
      buttonStyle={[
        styles.button,
        {backgroundColor: theme === DarkThemeCustom ? 'black' : 'white'},
      ]}
      titleStyle={{color: theme.colors.text}}
    />
  );
};

// Stylesheet for consistency
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
  },
  sidebar: {
    width: 250,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRightWidth: 1,
    borderRightColor: '#D1D5DB',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // menuTitle: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  //   textAlign: 'center',
  // },
  buttonContainer: {
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
});

// export default App;
