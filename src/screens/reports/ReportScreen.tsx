import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OverlayMenu from '../home/OverlayMenu';
import { useAppContext } from '../../context/AppContext';

const ReportScreen = () => {
     const { showOverlay, setShowOverlay } = useAppContext();
     return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: 18 }}>AMEYA 360</Text>
             {showOverlay && (
        <OverlayMenu onClose={() => setShowOverlay(false)} />
      )}
        </SafeAreaView>
     )
}
    export default ReportScreen;
