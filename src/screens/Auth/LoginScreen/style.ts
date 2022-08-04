import {StyleSheet} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {WINDOW_HEIGHT} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    height: moderateVerticalScale(WINDOW_HEIGHT, 0),
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
