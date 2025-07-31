import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ProfileScreenStyle';
import Svg, { Path } from 'react-native-svg';
import OverlayMenu from '../home/OverlayMenu';
import { useAppContext } from '../../context/AppContext';
import { findLocation } from '../../services/locationService';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
    const { location } = useAppContext();
    const { showOverlay, setShowOverlay, orderId } = useAppContext();
    const [aqhiData, setAqhiData] = useState(null);

    const fetchLocation = async () => {
    try {
      const response = await findLocation(location.latitude, location.longitude, orderId);
      console.log("LOCATION RESPONSE",response)
      const features = response?.data?.features;
    if (features && features.length > 0) {
      const aqhi = features[0].properties?.aqhi;
      setAqhiData(aqhi);
    } else {
      setAqhiData(null); 
    }
    } catch (err: any) {
      setAqhiData(null);
    }
  };
  useEffect(() => {
      fetchLocation();
  }, []);

    if (!location || !location.latitude || !location.longitude) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1f66c1" />
        <Text style={{ marginTop: 10, color: '#1f66c1' }}>Getting location...</Text>
      </SafeAreaView>
    );
  }

  const formattedAccuracy = `${location.accuracy?.toFixed(1)} m`;
  
    function toDMS(decimal, isLat = true) {
    const dir = isLat ? (decimal >= 0 ? 'N' : 'S') : (decimal >= 0 ? 'E' : 'W');
    const abs = Math.abs(decimal);
    const degrees = Math.floor(abs);
    const minutesFloat = (abs - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = ((minutesFloat - minutes) * 60).toFixed(3);

    return `${dir} ${degrees}°${minutes}'${seconds}"`;
  }

  const latDMS = toDMS(location.latitude, true);
  const lonDMS = toDMS(location.longitude, false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
               <Svg width={width} height={150} style={styles.curve}>
  <Path
    d={`
      M0,0
      C${width * 0.25},130 ${width * 0.75},130 ${width},0
      L${width},150
      L0,150
      Z
    `}
    fill="#1f66c1"
  />
</Svg>
                <View style={styles.circle}>
                    <Text style={styles.accuracy}>{formattedAccuracy}</Text>
                    <Text style={styles.subtext}>Signal{"\n"}Accuracy</Text>
                </View>
            </View>
            <View style={styles.latLngContainer}>
                <View style={styles.box}>
                    <Text style={styles.label}>Latitude</Text>
                    <Text style={styles.value}>{location.latitude}</Text>
                    <Text style={styles.subvalue}>{latDMS}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.box}>
                    <Text style={styles.label}>Longitude</Text>
                    <Text style={styles.value}>{location.longitude}</Text>
                    <Text style={styles.subvalue}>{lonDMS}</Text>
                </View>
            </View>
            {aqhiData !== null && (
  <View style={styles.alertBox}>
    <Text style={styles.alertTitle}>Air Quality Health Index</Text>
    <Text style={styles.aqhiValue}>AQHI: {aqhiData.toFixed(2)}</Text>
    <Text style={styles.aqhiLevel}>
      {aqhiData <= 3
        ? 'Low Health Risk'
        : aqhiData <= 6
        ? 'Moderate Health Risk'
        : aqhiData <= 10
        ? 'High Health Risk'
        : 'Very High Health Risk'}
    </Text>
  </View>
)}
             {showOverlay && (
        <OverlayMenu onClose={() => setShowOverlay(false)} />
      )}
        </SafeAreaView>
    );
    // return (
    //     <SafeAreaView style={{ flex: 1, backgroundColor: '#1f66c1', }}>
    //    <StatusBar backgroundColor="#1f66c1" barStyle="light-content" />
    //    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
    //    <View style={styles.headerBackground} />
    //    </ScrollView>
    //     </SafeAreaView>
    // )
}
export default ProfileScreen;
