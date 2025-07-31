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

const ResourceScreen = () => {
        const { showOverlay, setShowOverlay } = useAppContext();
        return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontSize: 18 }}>RESOURCES</Text>
                     {showOverlay && (
        <OverlayMenu onClose={() => setShowOverlay(false)} />
      )}
                </SafeAreaView>
             )
}
    export default ResourceScreen;
