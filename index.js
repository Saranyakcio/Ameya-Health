/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Geolocation from 'react-native-geolocation-service';
import BackgroundFetch from 'react-native-background-fetch';
import { NativeModules } from 'react-native';
import { syncService } from './src/services/syncService';
import { findLocation } from './src/services/locationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

let MyHeadlessTask = async event => {
  // Get task id from event {}:
  let taskId = event.taskId;
  let isTimeout = event.timeout; // <-- true when your background-time has expired.
  if (isTimeout) {
    // This task has exceeded its allowed running-time.
    // You must stop what you're doing immediately finish(taskId)
    //BackgroundFetch.finish(taskId);
    return;
  }

  syncService.performSync();
// Get location in background
 const orderId = await AsyncStorage.getItem('orderId');
    if (!orderId) {
      console.log('No orderId found in AsyncStorage');
      BackgroundFetch.finish(taskId);
      return;
    }
  Geolocation.getCurrentPosition(
   async pos => {
      console.log('Background GPS:', pos.coords);
      const { latitude, longitude, accuracy } = pos.coords;
      
      // Optionally send to server here
        const response = await findLocation(latitude, longitude, orderId);
        console.log('[BackgroundFetch] Location API response:', response);
      BackgroundFetch.finish(taskId);
    },
    err => {
      console.log('Background GPS error:', err.message);
      BackgroundFetch.finish(taskId);
    },
    {enableHighAccuracy: true}
  );

};
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App)
