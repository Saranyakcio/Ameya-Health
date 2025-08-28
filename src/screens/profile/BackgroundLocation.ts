import BackgroundService from 'react-native-background-actions';
import Geolocation, {
  GeoError,
  GeoPosition,
  GeoOptions,
} from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import { use } from 'react';
import { useAppContext } from '../../context/AppContext';

 
let watchId: number | null = null;
 
interface TaskData {
  [key: string]: any;
}

// Background task function
const task = async (taskData?: TaskData): Promise<void> => {
const { setLocation, orderId, location } = useAppContext();
  // Keep the task alive indefinitely
  await new Promise<void>((resolve) => {
    watchId = Geolocation.watchPosition(
      (position: GeoPosition) => {
        console.log('Background location:', position);
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy });
        // Send location to server or store locally here
        console.log('Background location:', position );
      },
      (error: GeoError) => {
        console.log(
          'Background Geolocation Error:',
          error.code,
          error.message
        );
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 2, // meters
        interval: 5000, // Android only (ms)
        fastestInterval: 5000, // Android only (ms)
        showsBackgroundLocationIndicator: true, // iOS (optional)
      } as GeoOptions
    );
    // NOTE: Do not call resolve(), we want this promise to stay pending
  });
};
 
// Options for background service
const options = {
  taskName: 'LocationTracker',
  taskTitle: 'Tracking Location',
  taskDesc: 'Your location is being tracked in the background.',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  linkingURI: 'yourApp://', // Optional deep link
};
 
// Request permissions
const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('always');
    return auth === 'granted';
  } else if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location to track your position.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return false;
};
 
// Start background location service
export const startBackgroundLocation = async (): Promise<void> => {
  const hasPermission = await requestLocationPermission();
 
  if (!hasPermission) {
    console.log('Location permission not granted. Cannot start service.');
    return;
  }
 
  try {
    const isRunning =  BackgroundService.isRunning();
    if (!isRunning) {
      await BackgroundService.start(task, options);
      console.log('Background location service started.');
    }
  } catch (error) {
    console.log('Error starting background service:', error);
  }
};
 
// Stop background location service
export const stopBackgroundLocation = async (): Promise<void> => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    watchId = null;
  }
  await BackgroundService.stop();
  console.log('Background location service stopped.');
};