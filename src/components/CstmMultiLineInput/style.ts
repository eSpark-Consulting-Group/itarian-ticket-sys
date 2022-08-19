import {StyleSheet} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    // flex: 0.8,
    // height: moderateVerticalScale(130, 0),
    overflow: 'hidden',
  },
  labelStyle: {
    height: moderateVerticalScale(25, 0),
    opacity: 0.7,
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
  },
  multilineDisplay: {
    height: moderateVerticalScale(105, 0),
    textAlignVertical: 'top',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
});

export default styles;
