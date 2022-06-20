import {StyleSheet, Dimensions} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    height: moderateVerticalScale(20, 0),
    // backgroundColor: 'pink',
  },
  center: {
    flex: 0.8,
    // backgroundColor: 'yellow',
  },
  adjuster: {
    flex: 0.1,
  },
  text: {
    color: '#F7F7F7',
    fontWeight: '800',
    fontSize: height * 0.025,
  },
});

export default styles;
