import {Dimensions, StyleSheet} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
  moderateVerticalScale,
} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 0.08,
    height: moderateVerticalScale(50, 0),
    flexDirection: 'row',
    marginVertical: 10,
  },
  button: {
    flex: 0.8,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: '100%',
  },
  adjuster: {flex: 0.1},
  text: {color: '#F7F7F7', fontWeight: '800', fontSize: 18},
});

export default styles;
