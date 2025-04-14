import * as React from 'react';
import {View, Text, useColorScheme, StyleSheet, Alert} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {Button} from 'react-native-elements';
// import AddConsultantsForm from './components/AddConsultantsForm';
// import ConsultingForm from './components/ConsultingForm';
// import AddTestersForm from './components/AddTestersForm';
// import TestingForm from './components/TestingForm';
// import TPAForm from './components/TPAForm';
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
import {Platform} from 'react-native';
import {openAndInitDB} from '../db/initDB';
import AllForm from './components/AllForm';
import EstimationForm from './components/Estimation';
import ViewTestersRecords from './components/ViewTesters';
import ViewConsultantsRecords from './components/ViewConsultants';
import ViewTestRates from './components/ViewTestRates';

export default function App() {
  const [selectedScreen, setSelectedScreen] = useState('Home');
  const [rawtheme, setRawTheme] = useState('system');
  const colorScheme = useColorScheme() || 'light';
  const theme = rawtheme === 'system' ? colorScheme : rawtheme;
  const isHighContrast = useHighContrastState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    Platform.OS === 'windows', // Sidebar is always visible on Windows
  );

  const loadData = useCallback(async () => {
    try {
      const db = await openAndInitDB();
      Alert.alert(
        'Database initialized successfully',
        'You can now use the app.',
        [{text: 'OK'}],
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
      case 'AllForm':
        return <AllForm />;
      case 'AllEditForm':
        return <AllForm isEditing={true} />;
      case 'EstimationForm':
        return <EstimationForm />;
      case 'ViewTPARecords':
        return <ViewTPARecords />;
      case 'ViewTestingRecords':
        return <ViewTestingRecords />;
      case 'ViewConsultingRecords':
        return <ViewConsultingRecords />;
      case 'ViewConsultants':
        return <ViewConsultantsRecords />;
      case 'ViewTesters':
        return <ViewTestersRecords />;
      case 'ViewTestRates':
        return <ViewTestRates />;
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
              {/* Sidebar or Toggle Button */}
              {Platform.OS === 'windows' || isSidebarVisible ? (
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
                      iconText="🏠"
                    />
                    {/* <CustomButton
                    title="Add Consultants"
                    onPress={() => setSelectedScreen('AddConsultantsForm')}
                    theme={appTheme}
                  /> */}
                    <CustomButton
                      title="Fill Details"
                      onPress={() => setSelectedScreen('AllForm')}
                      theme={appTheme}
                      iconText="✏️"
                    />
                    <CustomButton
                      title="Edit Details"
                      onPress={() => setSelectedScreen('AllEditForm')}
                      theme={appTheme}
                      iconText="✏️"
                    />
                    {/* <CustomButton
                      title="Add Consultancy Data"
                      onPress={() => setSelectedScreen('ConsultingForm')}
                      theme={appTheme}
                    /> */}
                    {/* <CustomButton
                    title="Add Testers"
                    onPress={() => setSelectedScreen('AddTestersForm')}
                    theme={appTheme}
                  /> */}
                    {/* <CustomButton
                      title="Add Testing Data"
                      onPress={() => setSelectedScreen('TestingForm')}
                      theme={appTheme}
                    /> */}
                    <CustomButton
                      title="Estimate Cost"
                      onPress={() => setSelectedScreen('EstimationForm')}
                      theme={appTheme}
                    />
                    <CustomButton
                      title="View TPA Records"
                      onPress={() => setSelectedScreen('ViewTPARecords')}
                      theme={appTheme}
                      iconText="📄"
                    />
                    <CustomButton
                      title="View Testing Records"
                      onPress={() => setSelectedScreen('ViewTestingRecords')}
                      theme={appTheme}
                      iconText="🧪"
                    />

                    <CustomButton
                      title="View Consulting Records"
                      onPress={() => setSelectedScreen('ViewConsultingRecords')}
                      theme={appTheme}
                      iconText="💼"
                    />
                    <CustomButton
                      title="View Consultants"
                      onPress={() => setSelectedScreen('ViewConsultants')}
                      theme={appTheme}
                      iconText="👨‍💼"
                    />
                    <CustomButton
                      title="View Testers"
                      onPress={() => setSelectedScreen('ViewTesters')}
                      theme={appTheme}
                      iconText="👩‍🔬"
                    />
                    <CustomButton
                      title="View Test Rates"
                      onPress={() => setSelectedScreen('ViewTestRates')}
                      theme={appTheme}
                      iconText="💵
                    "
                    />
                  </View>
                </View>
              ) : null}

              {/* Always show the toggle button on Android */}
              {Platform.OS === 'android' && (
                <Button
                  title={isSidebarVisible ? 'Close Menu' : 'Toggle Menu'}
                  onPress={() => setIsSidebarVisible(!isSidebarVisible)}
                  buttonStyle={styles.toggleButton}
                />
              )}

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
const CustomButton = ({title, onPress, theme, iconText}) => {
  return (
    <Button
      title={
        <View style={styles.buttonContent}>
          <Text style={[styles.icon, {color: theme.colors.text}]}>
            {iconText}
          </Text>
          <Text style={[styles.buttonText, {color: theme.colors.text}]}>
            {title}
          </Text>
        </View>
      }
      onPress={onPress}
      buttonStyle={[
        styles.button,
        {backgroundColor: theme === DarkThemeCustom ? 'black' : 'white'},
      ]}
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
    borderRightColor: '#919191',
    shadowColor: '#919191',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row', // Ensures icon and text are side by side
    alignItems: 'center', // Vertically aligns the icon and text
    justifyContent: 'center', // Centers the content horizontally
  },
  icon: {
    fontSize: 18, // Adjust the size of the icon
    marginRight: 8, // Adds spacing between the icon and text
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // menuTitle: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  //   textAlign: 'center',
  // },
  buttonContainer: {
    gap: 10,
    borderColor: '#919191',
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
