import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  listItemContainer: {
    flexDirection: 'row',
    padding: moderateScale(15),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 8,
  },
  iconStyle: {
    borderRadius: 100,
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlignVertical: 'bottom',
  },
  dividerStyle: {
    width: 6,
    alignSelf: 'center',
    marginLeft: 3,
    transform: [{rotate: '90deg'}, {scale: 1.75}],
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.75,
    marginLeft: 3,
    textAlignVertical: 'bottom',
  },
  listDividerStyle: {opacity: 0.2, transform: [{scale: 2}]},
});

export default styles;
