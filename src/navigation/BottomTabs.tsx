import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image, StyleSheet, Text, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import HomeScreen from '../screens/home/HomeScreen';
import OverlayMenu from '../screens/home/OverlayMenu';
import { useAppContext } from '../context/AppContext';
import ReportScreen from '../screens/reports/ReportScreen';
import ResourceScreen from '../screens/resources/ResourceScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const TabBarBackground = ({ style }) => {
    const height = 75;
    const curveRadius = 65;

    const d = `
    M0,0
    H${width / 2 - curveRadius}
    C${width / 2 - 40},0 ${width / 2 - 40},40 ${width / 2},40
    C${width / 2 + 40},40 ${width / 2 + 40},0 ${width / 2 + curveRadius},0
    H${width}
    V${height}
    H0
    Z
`;
    return (
        <Svg width={width} height={height + 20} style={style}>
            <Path fill="#DCEEF5" d={d} />
        </Svg>
    );
};

export default function BottomTabs() {
    const { setShowOverlay } = useAppContext();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const handlePlusPress = () => {
        const next = !isOverlayOpen;
        setShowOverlay(next);
        setIsOverlayOpen(next);
    };
    const CustomTabBarButton = ({ children, onPress }) => (
        <TouchableOpacity
            style={styles.plusButtonContainer}
            onPress={onPress}
            activeOpacity={0.9}
        >
            {children}
        </TouchableOpacity>
    );

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: { ...styles.tabBar },
                    tabBarShowLabel: false,
                    tabBarBackground: () => <TabBarBackground />,
                    tabBarIcon: ({ focused }) => {
                        let icon;
                        let label;

                        switch (route.name) {
                            case 'Home':
                                icon = require('../assets/home.png');
                                label = 'Home';
                                break;
                            case 'Resource':
                                icon = require('../assets/search.png');
                                label = 'Resources';
                                break;
                            case 'Add':
                                return null;
                            case 'Report':
                                icon = require('../assets/report.png');
                                label = 'Reports';
                                break;
                            case 'Profile':
                                icon = require('../assets/profile.png');
                                label = 'Profile';
                                break;
                        }

                        return (
                            <View style={styles.tabItem}>
                                <Image
                                    source={icon}
                                    style={[
                                        styles.icon,
                                        //{ tintColor: focused ? '#1f66c1' : '#7a7a7a' },
                                    ]}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        //color: focused ? '#1f66c1' : '#7a7a7a',
                                        color: '#3F3FA6',
                                        fontWeight: 400,
                                        width: 70,
                                        textAlign: 'center'
                                    }}
                                >
                                    {label}
                                </Text>
                            </View>
                        );
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Resource" component={ResourceScreen} />
                <Tab.Screen
                    name="Add"
                    component={HomeScreen}
                    options={{
                        tabBarButton: (props) => <CustomTabBarButton {...props}
                            onPress={handlePlusPress}
                        />,
                        tabBarIcon: () => (
                            <Image
                                source={
                                    isOverlayOpen
                                        ? require('../assets/closetab.png')
                                        : require('../assets/dashboard.png')
                                }
                                style={{ width: 85, height: 85 }}
                            />
                        ),
                    }}
                />
                <Tab.Screen name="Report" component={ReportScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        height: 75,
        backgroundColor: 'transparent',
        elevation: 0,
        borderTopWidth: 0,
    },
    icon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginBottom: 7
    },
    tabItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 26
    },
    plusButtonContainer: {
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
        //width: 80,
        //height: 80,
        //borderRadius: 35,
        // REMOVE this background:
        // backgroundColor: '#DCEEF5',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.15,
        // shadowRadius: 5,
        // elevation: 5,
    },
});