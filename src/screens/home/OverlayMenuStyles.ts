import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
   overlayContainer: {
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'flex-end',
  backgroundColor: '#000000CC',
  zIndex: 1,
},
// overlayContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 100,
//     backgroundColor: '#000000CC',
//     zIndex: 1,
//   },

overlayBackground: {
  //...StyleSheet.absoluteFillObject,
  backgroundColor: '#000000CC',
},

overlayCard: {
  position: 'absolute',
  bottom: 75,
  left: 0,
  right: 0,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  paddingVertical: 25,
  paddingHorizontal: 20,
  //elevation: 20,
  //backgroundColor: '#fff',
  //borderTopLeftRadius: 24,
  //borderTopRightRadius: 24,
  //elevation: 10,
  //shadowColor: '#000',
  //shadowOffset: { width: 0, height: -3 },
  //shadowOpacity: 0.1,
  //shadowRadius: 4,
},
overlayRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 5,
  //borderBottomWidth: 1,
  //borderBottomColor: '#f0f0f0',
},

overlayIcon: {
    width: 42,
    height: 42,
    marginRight: 12,
    resizeMode: 'contain',
},

overlayTitle: {
  fontSize: 20,
  fontWeight: '500',
  color: '#E6E9EB',
},

overlaySubtitle: {
  fontSize: 14,
  fontWeight: '400',
  color: '#E6E9EB',
  marginTop: 2,
},

arrowIcon: {
  width: 20,
  height: 20,
  tintColor: '#fff',
  marginLeft: 10,
  resizeMode: 'contain',
},
 });