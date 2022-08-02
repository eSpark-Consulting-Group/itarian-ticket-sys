import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../constants/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  header: {
    elevation: 1,
    padding: 8,
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
  listInnerContainer: {
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  menuIconContainer: {
    width: moderateScale(30),
    flexDirection: 'row-reverse',
  },
  dimIconStyles: {opacity: 0.5, alignSelf: 'center', paddingRight: 5},
  adjuster: {
    width: 8,
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
  },
  dividerStyle: {
    opacity: 0.2,
    transform: [{scale: 2}],
  },
  menuItemButtonStyle: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  dropDown: {
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

export default styles;
