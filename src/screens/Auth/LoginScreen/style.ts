import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: moderateVerticalScale(height, 0),
  },
  imageContainer: {
    height: moderateVerticalScale(50, 0),
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerImage: {
    width: '50%',
    height: '100%',
  },
});

export default styles;
