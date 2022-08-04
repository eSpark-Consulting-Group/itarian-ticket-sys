import {StyleSheet} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {WINDOW_HEIGHT} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    height: moderateVerticalScale(60, 0),
  },
  input: {
    backgroundColor: 'transparent',
  },
  center: {flex: 0.8},
  adjuster: {flex: 0.1},
  text: {color: '#F7F7F7', fontWeight: '800', fontSize: WINDOW_HEIGHT * 0.025},
});

export default styles;
