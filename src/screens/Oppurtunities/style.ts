import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {WINDOW_WIDTH} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    elevation: 1,
    width: WINDOW_WIDTH,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    width: WINDOW_WIDTH,
  },
  listInner: {
    padding: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dividerStyle: {
    opacity: 0.2,
    transform: [{scale: 2}],
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  subTitle: {
    fontSize: 12,
    opacity: 0.5,
  },
  iconStyle: {
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 8,
  },
});

export default styles;
