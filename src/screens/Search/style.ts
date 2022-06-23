import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    height: moderateScale(height * 0.1),
  },
});

export default styles;
