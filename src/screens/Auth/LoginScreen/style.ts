import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
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
