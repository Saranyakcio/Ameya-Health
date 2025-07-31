import React, {useEffect, useCallback, useState, useRef} from 'react';
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, Platform, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import GPSWatcher from './src/components/GPSWatcher';
import { AppProvider } from './src/context/AppContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <NewAppScreen templateFileName="App.tsx" /> */}
       <AppProvider>
        <GPSWatcher /> 
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
   </AppProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
