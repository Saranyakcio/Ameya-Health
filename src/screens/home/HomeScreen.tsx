import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  ImageBackground,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  UIManager,
  findNodeHandle,
  Platform,
} from 'react-native';
import { styles } from './HomeScreenStyle';
import OverlayMenu from './OverlayMenu';
import { useOverlay } from '../../context/OverlayContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getOrders } from '../../services/orderService';
import { useAppContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StreakDaysCard from './StreakDaysCard';
import ProfilePic from '../../assets/profilePic.svg';
import AlertIcon from '../../assets/alertIcon.svg';
import { startBackgroundLocation } from '../profile/BackgroundLocation';

const { width } = Dimensions.get('window');
const PAGE_WIDTH = width * 0.93;

const HomeScreen = () => {
  const { showOverlay, setShowOverlay, setOrderId } = useAppContext();

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const flatRef = useRef<FlatList<any>>(null);

  const [showAlternateText, setShowAlternateText] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [expandedVisit, setExpandedVisit] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleExpandedVisit = () => {
    setExpandedVisit(!expandedVisit);
  };
  const [activeTab, setActiveTab] = useState('Unread');

  const [showNotifications, setShowNotifications] = useState(false);
  const avatarRef = useRef<any>(null);
  const notifIconRef = useRef<any>(null);
  const [dropdownLayout, setDropdownLayout] = useState({ top: 0, left: 0, width: 0 });

  const toggleAlert = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      const orderId = response?.order?.id;
      console.log("ORDER ID", orderId)
      setOrderId(orderId);
      await AsyncStorage.setItem('orderId', orderId);
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    if (Platform.OS === 'ios'){
      startBackgroundLocation();
    }    
    fetchOrders();
  }, []);
  const alerts = [
    {
      title: 'AQHI',
      risk: 'High Risk',
      time: '10:55 AM',
      location: 'Vancouver, Canada',
      points: [
        'Close all windows, doors, and fireplace dampers to keep smoke out.',
        'Use HEPA air purifiers if available.',
        'Reduce outdoor activity.',
        'Stay hydrated to help soothe irritated airways.',
        'Call 811 if you feel unwell; call 911 for severe symptoms.',
      ],
    },
    { title: 'Pulse Rate' },
    { title: 'Low Glucose Level' },
  ];
  const pagerItems = [
 <StreakDaysCard
        streakCount={12}
        completedDays={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        borderRadius={20}
      /> ,
 <View style={styles.alertCard}>
          <View style={styles.alertHeaderRow}>
            <Text style={styles.alertTitle}>You have {alerts.length} Alerts</Text>
            <TouchableOpacity onPress={() => {
              if (expandedIndex === 0) {
                setExpandedIndex(null);
              } else {
                setExpandedIndex(0);
              }
            }}>
              <Text style={styles.viewAll}>
                {expandedIndex === 0 ? 'Close All' : 'View All'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.time}>Last Updated on 10:55 AM</Text>
          <View style={styles.alertStackContainer}>
            {alerts.map((alert, index) => {
              const isExpanded = expandedIndex === index;

              const stackStyle =
                expandedIndex === null
                  ? {
                    position: 'absolute',
                    top: index * 12,
                    zIndex: alerts.length - index,
                    width: '100%',
                  }
                  : {
                    position: 'relative',
                    marginBottom: 16,
                  };


              return (
                <View key={index} style={[styles.alertWrapper, stackStyle]}>
                  <TouchableOpacity
                    activeOpacity={0.95}
                    onPress={() => toggleAlert(index)}
                  >
                    <View style={styles.alertHeaderBox}>
                      <Text style={styles.collapsedAlertText}>
                        Health Advisory: {alert.title}
                      </Text>
                      <Image
                        source={
                          isExpanded
                            ? require('../../assets/upArrow.png')
                            : require('../../assets/downArrow.png')
                        }
                        style={{ height: 20, width: 20 }}
                      />
                    </View>
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.alertExpanded}>
                      <View style={{ flexDirection: 'row' }}>
                        <View>
                          <Text style={styles.expandedTitle}>{alert.title}</Text>

                          <View style={styles.alertRow}>
                            <Image
                              source={require('../../assets/Indicator.png')}
                              style={styles.bullet}
                            />
                            <Text style={styles.expandedSubtitle}>High Risk</Text>
                          </View>

                          <Text style={styles.expandedTime}>Last Updated on 10:55 AM</Text>

                          <View style={styles.alertRow}>
                            <Image
                              source={require('../../assets/location-arrow.png')}
                              style={styles.bullet}
                            />
                            <Text style={styles.expandedLocation}>Vancouver, Canada</Text>
                          </View>
                        </View>
                        <Image
                          source={require('../../assets/Circle.png')}
                          style={{ height: 103, width: 114, marginLeft: 20 }}
                        />
                      </View>
                      <View style={styles.divider} />
                      <Text style={styles.sectionTitle}>Necessary Precautions</Text>

                      {(alert.points || []).map((point, idx) => (
                        <View key={idx} style={styles.bulletPoint}>
                          <Image
                            source={
                              idx === (alert.points?.length || 0) - 1
                                ? require('../../assets/alert.png')
                                : require('../../assets/points.png')
                            }
                            style={styles.bullet}
                          />
                          <Text style={styles.bulletText}>{point}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View> ,

        <View style={styles.askHabbieCard}>
                    <Image
                        source={require('../../assets/Group.png')}
                        style={styles.askImage}
                    />
                    <View style={styles.askTextOverlay}>
                        <Text style={styles.askTitle}>Ask Habbie</Text>
                        <Text style={styles.askSubtitle}>
                            Supporting You Every Step Of The Way To Better Health
                        </Text>
                    </View>
                </View>
  ]
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0) {
        setActivePage(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

 const openNotifications = () => {
  if (!notifIconRef.current) {
    setShowNotifications(true);
    return;
  }

  UIManager.measureInWindow(
    findNodeHandle(notifIconRef.current),
    (x, y, iconWidth, iconHeight) => {
      const panelWidth = 300;
      let left = x + iconWidth - panelWidth;
      const padding = 8;
      if (left < padding) left = padding;
      const overlapAmount = 0;
      const top = y - overlapAmount;

      setDropdownLayout({ left, top, width: panelWidth });
      setShowNotifications(true);
    }
  );
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F4FB', }}>
      <StatusBar backgroundColor="#E6F4FB" barStyle="dark-content" />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>

        {/* Curved Blue Header Background */}
        {/* <View style={styles.headerBackground} /> */}
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userRow}>
            {/* <Image
              source={require('../../assets/profilePic.png')}
              style={styles.avatar}
            /> */}
            <ProfilePic width={72} height={72} borderRadius={24} marginRight={12} />
            <View>
              <Text style={styles.greeting}>Hello,</Text>
              <Text style={styles.userName}>Liya Diaz</Text>
            </View>
          </View>
          <Text style={styles.newForYou}>New for you!</Text>
           <TouchableOpacity ref={notifIconRef} onPress={openNotifications}>
            <AlertIcon width={50} height={46.9} />
          </TouchableOpacity>
          {/* <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image source={require('../assets/notifyIcon.png')} style={{ height: 24, width: 24 }} />
            <Image source={require('../assets/sideBar.png')} style={{ height: 16, width: 16, marginTop: 5 }} />
          </View> */}
        </View>
  {/* Horizontal pager with three cards */}
        <View>
          <FlatList
            ref={flatRef}
            data={pagerItems}
            horizontal
            //pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, idx) => String(idx)}
            renderItem={({ item }) => (
              <View style={{ width: PAGE_WIDTH }}>{item}</View>
            )}
            snapToInterval={PAGE_WIDTH}
            //snapToAlignment="center"
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: (width - PAGE_WIDTH) / 2 }}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewConfigRef.current}
          />

          {/* Dots indicator */}
          <View style={styles.dotsContainer}>
            {pagerItems.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  activePage === idx ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Assessment & Program */}
        <View style={styles.cardRow}>
          <View style={styles.imageView}>
            <Image
              source={require('../../assets/assmt1.png')}
            />
            <Text style={styles.durationTag}>Wellness Measures</Text>
            <Text style={styles.durationTagBelow}>2</Text>
            <Text style={styles.belowText}>left to do</Text>
          </View>
          <View style={styles.imageView}>
            <Image
              source={require('../../assets/assmt2.png')}
            />
            <Text style={styles.durationTag}>Program Activities</Text>
             <Text style={styles.durationTagBelow}>2</Text>
            <Text style={styles.belowText}>to go this week</Text>
          </View>
        </View>
        {/* <View style={styles.assessmentRow}>
          <View style={styles.assessmentCard}>
            <Image
              source={require('../../assets/Rectangle1.png')}
            />
            <Image
              source={require('../../assets/assessment1.png')}
              style={styles.leftIcon}
            />
            <Text style={styles.durationTag}>2/6</Text>
            <View style={styles.cardOverlay}> */}
        {/* <Text style={styles.cardTitle}>Assessment</Text> */}
        {/* <Text style={styles.cardProgress}>Today's Assessment</Text>
            </View>
          </View>

          <View style={styles.assessmentCard}>
            <Image
              source={require('../../assets/Rectangle2.png')}
            />
            <Image
              source={require('../../assets/program1.png')}
              style={styles.leftIcon}
            />
            <Text style={styles.durationTag}>1/3</Text>
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitleProgram}>Today's Program</Text> */}
        {/* <Text style={styles.cardProgressProgram}>1/3</Text> */}
        {/* </View>
          </View>
        </View> */}

        {/* Scheduling */}
        {/* <View style={styles.schedulingCard}>
          <View style={styles.alertHeaderRow}>
            <View style={styles.alertTitleRow}>
              <Image
                source={require('../../assets/sparkles.png')}
              />
              <Text style={styles.scheduleTitle}>Notification</Text>
            </View>
            {showAlternateText && (
              <Image
                source={require('../../assets/rightArrow.png')}
                style={{ height: 15, width: 10, tintColor: '#4F4F4F', marginRight: 10 }}
              />
            )}
          </View>
          {!showAlternateText ? (
            <>
              <Text style={styles.scheduleSubtitle}>Track your progress</Text>
              <Text style={styles.notifyText}>
                You have completed all activities
              </Text>
            </>
          ) : (
            <>
              <View style={{ flexDirection: 'row', marginTop: 5,height: 38, backgroundColor: '#F8F8F8',borderRadius: 7,alignItems: 'center' }}>
                <Image
                  source={require('../../assets/activityicon.png')}
                  style={{ height: 12.8, width: 8.8,marginLeft: 15 }}
                />
                <Text style={styles.notifyText}>
                  Good Job! You reached your step count.
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Image
                  source={require('../../assets/activity1.png')}
                  style={{ height: 12.8, width: 8.8,marginLeft: 15 }}
                />
                <Text style={styles.notifyText}>
                  You have a clinical visit scheduled on Jun 27th.
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5,height: 38, backgroundColor: '#F8F8F8',borderRadius: 7,alignItems: 'center' }}>
                <Image
                  source={require('../../assets/activity1.png')}
                  style={{ height: 12.8, width: 8.8,marginLeft: 15 }}
                />
                <Text style={styles.notifyText}>
                  You have a clinical visit scheduled on Jul 29th.
                </Text>
              </View>
            </>
          )}

          {!showAlternateText && (
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => setShowAlternateText(true)}
            >
              <Image source={require('../../assets/rightButton.png')} />
            </TouchableOpacity>
          )}
        </View> */}
        <View style={styles.rectangleView}>
          <ImageBackground
            source={require('../../assets/Rectangle.png')} >
               <View>
            <ImageBackground
              source={require('../../assets/cotes.png')}
              style={styles.cotes}
              resizeMode="contain"
            >
              <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>Life is what happens to us while we are busy making other plans.</Text>
              <Text style={styles.authorText}>John Lennon</Text>
              </View>
            </ImageBackground>
            </View>
          </ImageBackground>
        </View>
        {/* Bottom Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>
      <Modal
        visible={showNotifications}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNotifications(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setShowNotifications(false)} />
        <View
          style={[
            styles.panel,
            {
              top: dropdownLayout.top,
              left: dropdownLayout.left,
              width: dropdownLayout.width || 260,
            },
          ]}
        >
          <View style={styles.headerRow}>
            <Text style={styles.title}>Notifications</Text>
            <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowNotifications(false)}>
                <Image
              source={require('../../assets/close.png')}
              style={styles.close}
            />
            </TouchableOpacity>
          </View>
          <View style={styles.tabRow}>
      <Pressable onPress={() => setActiveTab('Unread')}>
        <Text style={[styles.tab, activeTab === 'Unread' && styles.activeTab]}>
          Unread
        </Text>
      </Pressable>
      <Pressable onPress={() => setActiveTab('Read')}>
        <Text style={[styles.tab, activeTab === 'Read' && styles.activeTab]}>
          Read
        </Text>
      </Pressable>
    </View>
    <View style={{ borderWidth: .3, borderColor: '#ccc', marginTop: -12, marginBottom: 15 }} />
           <Text style={styles.clearAll}>Clear All</Text>
          <Text style={styles.sectionHeader}>Today</Text>

          {/* Sample notification items */}
          <View style={styles.notificationItem}>
            <View>
              <Text style={styles.notificationTitle}>
                Reached your Step Count! 🎯
              </Text>
            </View>
            <Text style={styles.notificationTime}>12m</Text>
             <TouchableOpacity onPress={toggleExpanded}>
            <Text style={styles.notificationSubtitle}
             numberOfLines={expanded ? undefined : 1}
             ellipsizeMode="tail">
             Good Job! You reached your step count. Good Job! You reached your step count. Good Job! You reached your step count. Good Job! You reached your step count. Good Job! You reached your step count.
            </Text>
            { expanded === true &&<Text style={styles.viewVideo}>View Video</Text>}
            </TouchableOpacity>
          </View>

          <View style={styles.notificationItem}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.notificationTitle}>
                Clinical Visit 🗓️
              </Text>
              
            </View>
            <Text style={styles.notificationTime}>12m</Text>
            <TouchableOpacity onPress={toggleExpandedVisit}>
            <Text style={styles.notificationSubtitle}
            numberOfLines={expandedVisit ? undefined : 1}
             ellipsizeMode="tail">
              You have a clinical visit scheduled on Jun 27th.
            </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notificationItem}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.notificationTitle}>Activities 🗓️</Text>
              
            </View>
            <Text style={styles.notificationTime}>12m</Text>
            <Text style={styles.notificationSubtitle}>
              You have 2 activities due in 2 days
            </Text>
          </View>
        </View>
      </Modal>

      {showOverlay && (
        <OverlayMenu onClose={() => setShowOverlay(false)} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
