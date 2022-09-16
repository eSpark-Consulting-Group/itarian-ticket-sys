import {StyleSheet} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {WINDOW_HEIGHT} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
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

  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default styles;
