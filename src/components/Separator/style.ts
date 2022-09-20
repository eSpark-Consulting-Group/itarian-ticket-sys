import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {WINDOW_WIDTH} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH * 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  divider_1: {
    flex: 1,
    transform: [{scaleY: 6}],
  },
  centerContent: {
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  divider_2: {
    flex: 1,
    transform: [{scaleY: 6}],
  },
});

export default styles;
