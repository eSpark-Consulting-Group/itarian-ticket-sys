import {StyleSheet} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  labelStyle: {
    height: moderateVerticalScale(22, 0),
    opacity: 0.7,
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
  },
  multilineDisplay: {
    height: moderateVerticalScale(100, 0),
    textAlignVertical: 'top',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#00000066',
    elevation: 1,
    padding: 8,
  },
});

export default styles;
