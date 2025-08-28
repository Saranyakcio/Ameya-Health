import {StyleSheet, Platform, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.93;
export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#E6F4FB',
  },
  header: {
    //backgroundColor: '#EDFAFF',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 180,
  backgroundColor: '#1f66c1',
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  zIndex: -1,
},
askHabbieCard: {
  marginLeft: 11,
  borderRadius: 16,
  marginTop: 5,
  overflow: 'hidden',
},
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.95,
  },
  greeting: {
    color: '#000',
    fontSize: 14,
    fontWeight: 500,
  },
  userName: {
    color: '#000',
    fontSize: 18,
    fontWeight: 500,
  },
  newForYou: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 600,
    width: 60
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 24,
    marginRight: 12,
  },

  askImage: {
    width: '100%',
    height: 145,
  },
  askTextOverlay: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  askTitle: {
    color: '#fff',
    fontSize: 24.12,
    fontWeight: 700,
  },
  askSubtitle: {
    color: '#fff',
    fontSize: 12.6,
    fontWeight: 400,
    width: '60%',
    marginTop: 6,
  },
  alertCard: {
  marginHorizontal: 10,
  //marginTop: 20,
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 10,
  width: '95%',
  marginTop: 6,
  //height: 140
  //elevation: 3,
},

alertHeaderRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

alertTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
},

alertBox: {
  marginTop: 10,
  position: 'absolute',
  width: '100%',
  borderRadius: 12,
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 5,
},

alertHeader: {
  backgroundColor: '#F52D35',
  paddingVertical: 14,
  paddingHorizontal: 16,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
 dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    gap: 2,
  },
  dot: {
    marginHorizontal: 4,
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
viewAll: {
  fontSize: 14,
  fontWeight: '500',
  color: '#333',
  textDecorationLine: 'underline',
},
time: {
  fontSize: 11,
  fontWeight: '500',
  color: '#333',
},
secondaryAlertBox: {
  marginTop: 10,
  backgroundColor: '#F52D35',
  padding: 12,
  borderRadius: 6,
},

stackedContainer: {
  position: 'relative',
  height: 220, // ensure enough height to show stacked alerts
  marginTop: 16,
},

alertStackContainer: {
  marginTop: 10,
  minHeight: 80,
  position: 'relative',
  //height: 220,
  //position: 'relative',
},
expandedContainer: {
  marginTop: 16,
},
alertWrapper: {
  backgroundColor: '#F52D35',
  borderRadius: 12,
  overflow: 'hidden',
  marginBottom: 16,
  borderColor: '#fff',
  borderWidth: .5,
  elevation: 3,
  shadowColor: '#fff',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
},

alertHeaderBox: {
  paddingVertical: 14,
  paddingHorizontal: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

collapsedAlertText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},

alertExpanded: {
  backgroundColor: '#fff',
  padding: 16,
  borderTopWidth: 1,
  borderTopColor: '#ccc',
},
divider: {
    width: '90%',
    borderWidth: .2,
    margin: 10,
    backgroundColor: '#F52D35',
  },
  alertCount: {
    fontSize: 18,
    fontWeight: 400,
    marginTop: 10
  },
alertTitleRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
alertDetails: {
  marginTop: 10,
  paddingTop: 10,
  borderTopColor: '#fff',
  borderTopWidth: 1,
},

alertTextTitle: {
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 6,
},

alertText: {
  color: '#fff',
  marginBottom: 4,
},
alertContainer: {
  marginTop: 10,
},

// alertExpanded: {
//   backgroundColor: '#fff',
//   marginTop: -2,
//   padding: 16,
//   borderBottomLeftRadius: 12,
//   borderBottomRightRadius: 12,
//   elevation: 3,
// },

// collapsedAlertText: {
//   color: '#fff',
//   fontWeight: '600',
//   fontSize: 15,
//   flex: 1,
// },

alertDetailsExpanded: {
  backgroundColor: '#fff',
  padding: 14,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  borderColor: '#ccc',
  borderWidth: 0.5,
},

expandedTitle: {
  fontSize: 14,
  color: '#333',
  marginBottom: 8,
},

alertRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 4,
},

expandedSubtitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000',
},

expandedTime: {
  fontSize: 12,
  color: '#888',
},

expandedLocation: {
  fontSize: 13,
  color: '#555',
},

sectionTitle: {
  marginTop: 5,
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 6,
  color: '#333',
},

bulletPoint: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 6,
},

bullet: {
  height: 14,
  width: 14,
  marginTop: 4,
  marginRight: 6,
},

bulletText: {
  flex: 1,
  color: '#333',
  fontSize: 14,
  lineHeight: 20,
},
cardRow: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 16,
    marginTop : 10,
},
imageView: {
  // width: 190,
  // height: 240
    maxWidth: 175,
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    paddingBottom: 10,
    position: 'relative',
},
assessmentRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop : 20,
    marginBottom: 10
  },
  assessmentCard: {
    //width: 188,
    maxWidth: 168,
    height: 184,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    paddingBottom: 10,
    position: 'relative',
  },
  cardOverlay: {
  position: 'absolute',
  bottom: 10,
  left: 10,
},
leftIcon: {
  position: 'absolute',
  top: 12,
  left: 12,
  width: 40,
  height: 40,
  resizeMode: 'contain',
},
//   assessmentImage: {
//     width: '100%',
//     height: 100,
//   },
belowText : {
 position: 'absolute',
  bottom: 12,
  left: 12,
  //backgroundColor: '#3D434B',
  color: '#000',
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 8,
  fontSize: 16,
  fontWeight: '600',
},
durationTagBelow: {
  position: 'absolute',
  bottom: 20,
  left: 12,
  //backgroundColor: '#3D434B',
  color: '#000',
  paddingHorizontal: 6,
  paddingVertical: 4,
  borderRadius: 8,
  fontSize: 50,
  fontWeight: '600',
},
  durationTag: {
  position: 'absolute',
  top: 12,
  left: 12,
  //backgroundColor: '#3D434B',
  color: '#000',
  paddingHorizontal: 6,
  paddingVertical: 4,
  borderRadius: 8,
  fontSize: 20,
  fontWeight: '600',
},
  cardTitle: {
    fontSize: 16,
    marginHorizontal: 8,
    marginTop: 8,
    fontWeight: 400,
    color: '#333333',
  },
  cardTitleProgram: {
    fontSize: 18,
    width: 100,
    marginHorizontal: 8,
    marginTop: 8,
    fontWeight: 600,
    color: '#333333',
  },
  cardProgress: {
    marginHorizontal: 8,
    width: 100,
     color: '#333333',
     fontSize: 18,
     fontWeight: 600,
  },
  cardProgressProgram: {
    marginHorizontal: 8,
     color: '#fff',
     fontSize: 16,
     fontWeight: 700,
  },
  rectangleView : {
        width: CARD_WIDTH,
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: 12,
        borderRadius: 16,
  },
  cotes: {
    width: 392, 
    height: 174,
  },
  quoteContainer: {
    padding: 50,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
    }),
    color: '#000',
    lineHeight: 22,
  },
  authorText: {
    marginTop: 8,
    fontSize: 12,
    color: '#555',
    fontFamily: 'Regular',
  },
  schedulingCard: {
    margin: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    position: 'relative',
  },
  scheduleTitle: {
    color: '#3F3FA6',
    marginBottom: 4,
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 10,
    marginTop: 5
  },
  scheduleSubtitle: {
    fontSize: 22,
    fontWeight: 400,
    color: '#333333'
  },
  scheduleDescription: {
    marginTop: 4,
    color: '#333333',
    fontSize: 14,
    fontWeight: 400
  },
  notifyText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: 500,
    marginLeft: 10,
    //width: '80%'
  },
  arrowButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#246CD3',
    borderRadius: 25,
    marginTop: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  panel: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    height: '96%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  title: {
    fontWeight: '400',
    fontSize: 20,
    fontFamily: 'Regular',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
  },
  close: {
    width: 20,
    height: 20,
  },
  tabRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',  // Keeps tabs aligned left
  marginBottom: 12,
  gap: 24,  // Space between Unread and Read
},

tab: {
  fontSize: 16,
  fontWeight: '600',
  paddingBottom: 4,
  color: '#666',
  fontFamily: 'semibold',
  borderBottomWidth: 2,
  borderBottomColor: 'transparent', // Default no underline
},

activeTab: {
  color: '#000',
  borderBottomColor: '#3F3FA6', // Show underline when active
},
  clearAll: {
    color: '#106AAD',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'medium',
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    textDecorationColor: '#106AAD',
  },
  viewVideo: {
    marginTop: 8,
    color: '#106AAD',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'medium',
    textDecorationLine: 'underline',
    textDecorationColor: '#106AAD',
  },
  sectionHeader: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'semibold',
    //marginBottom: 6,
  },
  notificationItem: {
    marginTop: 4,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  notificationTitle: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'semibold',
  },
  notificationTime: {
    fontSize: 12,
    color: '#6D6D6D',
  },
  notificationSubtitle: {
    fontSize: 16,
    marginTop: 4,
    color: '#444',
  },
});