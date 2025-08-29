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
    ActivityIndicator,
    Modal,
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ProfileScreenStyle';
import Svg, { Path } from 'react-native-svg';
import OverlayMenu from '../home/OverlayMenu';
import { useAppContext } from '../../context/AppContext';
import { findLocation } from '../../services/locationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
    const { location } = useAppContext();
    const { showOverlay, setShowOverlay, orderId } = useAppContext();
    const [aqhiData, setAqhiData] = useState(null);
    const [logs, setLogs] = useState([]);
    const [showModal, setShowModal] = useState(false);

   const fetchLogs = async () => {
  try {
    const storedLogs = await AsyncStorage.getItem('gpsLogs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  } catch (err) {
    console.log("Error fetching logs", err);
  }
};
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
      <TouchableOpacity
  style={{
    backgroundColor: '#1f66c1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  }}
  onPress={async () => {
    await fetchLogs();
    setShowModal(true);
  }}
>
  <Text style={{ color: 'white', fontWeight: '600' }}>VIEW LOGS</Text>
</TouchableOpacity>

      <Modal
  visible={showModal}
  animationType="slide"
  onRequestClose={() => setShowModal(false)} // Android back button
>
  <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    {/* Header */}
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#1f66c1' }}>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>GPS Logs</Text>
      <TouchableOpacity onPress={() => setShowModal(false)}>
        <Text style={{ color: 'white', fontSize: 16 }}>Close</Text>
      </TouchableOpacity>
    </View>

    {/* Logs list */}
    <FlatList
      data={logs}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => {
        const dateObj = new Date(item.timestamp);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = String(dateObj.getFullYear()).slice(-2);
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');

        const formatted = `${day}/${month}/${year} | ${hours}:${minutes}:${seconds} | ${item.latitude.toFixed(5)} | ${item.longitude.toFixed(5)} | ${item.accuracy}m`;

        return (
          <View style={{ padding: 8, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
            <Text>{formatted}</Text>
          </View>
        );
      }}
    />
  </SafeAreaView>
</Modal>
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
