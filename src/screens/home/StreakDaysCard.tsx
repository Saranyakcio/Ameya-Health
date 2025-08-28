import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.87;

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type Props = {
  streakCount?: number;
  completedDays?: string[];
  borderRadius?: number;
};

const StreakDaysCard: React.FC<Props> = ({
  streakCount = 12,
  completedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  borderRadius = 16,
}) => {
  return (
    <View style={[styles.cardWrapper, { borderRadius }]}>
      <ImageBackground
        source={require('../../assets/sun.png')}
        style={styles.bg}
        imageStyle={{ borderRadius }}
        resizeMode="cover"
      >
          <View style={styles.leftSection}>
            <Text style={styles.streakNumber}>{streakCount}</Text>
            <Text style={styles.streakLabel}>Streak Days</Text>
          </View>
          <View style={styles.daysSection}>
            {days.map(day => {
              const done = completedDays.includes(day);
              const isSunday = day === 'Sun';
              return (
                <View key={day} style={styles.dayItem}>
                  {isSunday && !done && <View style={styles.dayTopBar} />}
                  <Text style={[styles.dayText, !done && styles.dimmedText]}>
                    {day}
                  </Text>
                  <View style={[styles.checkCircle, done && styles.checkCircleActive]}>
                    {done && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                </View>
              );
            })}
          </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),

  },
  bg: {
    minHeight: 100,
    padding: 10,
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 52,
  },
  streakLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  daysSection: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayItem: {
  alignItems: 'center',
  marginHorizontal: 3,
  paddingTop: 4,
},
dayTopBar: {
  width: 30,
  height: 4,
  borderRadius: 2,
  backgroundColor: 'rgba(255,255,255,0.9)',
  marginBottom: 4,
},
  dayText: {
    fontSize: 16,
    fontFamily: 'semibold',
    fontWeight: '600',
    color: '#fff',
  },
  dimmedText: {
    opacity: 0.6,
  },
  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  checkMark: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4E9FFC',
  },

});
export default StreakDaysCard;
