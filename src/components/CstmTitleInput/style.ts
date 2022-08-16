import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SCREEN_WIDTH} from '../../constants';

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 5,
    height: 40,
    padding: 10,
    width: SCREEN_WIDTH * 0.9,
  },
});

export default styles;
