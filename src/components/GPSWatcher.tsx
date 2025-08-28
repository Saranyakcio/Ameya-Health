import React, { useEffect, useRef } from 'react';
import { Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import BackgroundFetch from 'react-native-background-fetch';
import { useAppContext } from '../context/AppContext';
import { findLocation } from '../services/locationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GPSWatcher = () => {
  const { setLocation, orderId, location } = useAppContext();
  const watchId = useRef(null);

  const requestLocationPermission = async () => {
    console.log('PERMISSIONS CODE START');
    if (Platform.OS === 'android') {
      const fineLocation = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (fineLocation !== RESULTS.GRANTED) return false;

      if (Platform.Version >= 29) {
        const bgLocation = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
        if (bgLocation !== RESULTS.GRANTED) return false;
      }
    } else {
      const whenInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (whenInUse !== RESULTS.GRANTED) return false;

      const always = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      if (always !== RESULTS.GRANTED) return false;
    }
    return true;
  };
  useEffect( () => {
    //if (!orderId) return;
    (async () => {
      const granted = await requestLocationPermission();
      if (!granted) {
        Alert.alert('Location permission denied');
        return;
      }

      watchId.current = Geolocation.watchPosition(
        async position => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log('GPS Position:', position.coords);
          setLocation({ latitude, longitude, accuracy });
          const response = await findLocation(latitude, longitude, orderId);
          console.log("RESPONSE LOCATION",response)
        },
        error => {
          console.log('GPS Error:', error.message);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 5000,
          fastestInterval: 2000,
          useSignificantChanges: false,
          showsBackgroundLocationIndicator: true,
        },
      );
    })();

    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, [orderId]);
useEffect(() => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      startOnBoot: true,     
      enableHeadless: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
    },
    async taskId => {
      console.log('[BackgroundFetch] Event received: ', taskId);
      //await syncService.performSync();
      BackgroundFetch.finish(taskId);
    },
    error => {
      console.log('[BackgroundFetch] Failed to start:', error);
    },
  );
}, []);

  return null;
};

export default GPSWatcher;