import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { styles } from './OverlayMenuStyles';

const OverlayMenu = ({ onClose }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const options = [
    { label: 'Cora', icon: require('../../assets/chatbot.png') },
    { label: 'Calendar', icon: require('../../assets/calender1.png') },
    { label: 'Community', icon: require('../../assets/community.png') },
    // { label: 'Care', icon: require('../../assets/care.png') },
    { label: 'Contact', icon: require('../../assets/contact.png') },
  ];

  return (
    <Animated.View style={[styles.overlayContainer, { opacity: fadeAnim }]}>
      {/* Entire background that catches taps */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>

      {/* Slide-up menu */}
      <Animated.View
        style={[
          styles.overlayCard,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        {options.map((item, index) => (
          <TouchableOpacity key={index} style={styles.overlayRow}>
            <Image source={item.icon} style={styles.overlayIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.overlayTitle}>{item.label}</Text>
              <Text style={styles.overlaySubtitle}>
                {getOverlayDescription(item.label)}
              </Text>
            </View>
            <Image
              source={require('../../assets/rightArrow.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Animated.View>
  );
};

const getOverlayDescription = (label) => {
  switch (label) {
    case 'Cora': return 'Find quick answers from our friendly assistant.';
    case 'Calendar': return 'View your upcoming sessions and important dates.';
    case 'Community': return 'Join others on a similar journey—share stories, tips, and support.';
    // case 'Care': return 'Get quick help with app issues from our friendly team.';
    case 'Contact': return 'If Cora can not help, we are here! Please reach out to our team with app questions.';
    default: return '';
  }
};

export default OverlayMenu;