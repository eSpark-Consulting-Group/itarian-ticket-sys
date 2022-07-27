import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  divider_1: {
    width: moderateScale(40, 0),
    transform: [{scaleY: 6}],
  },
  centerContent: {paddingHorizontal: 10},
  divider_2: {
    width: moderateScale(160, 0),
    transform: [{scaleY: 6}],
  },
});

export default styles;
