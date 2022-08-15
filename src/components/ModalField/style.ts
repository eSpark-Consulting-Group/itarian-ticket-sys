import {StyleSheet} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {WINDOW_WIDTH} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer_1: {
    backgroundColor: '#fff',
    flex: 0.1,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  inllineDisplay: {
    backgroundColor: '#fff',
    height: moderateVerticalScale(50, 0),
    paddingHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  blockDisplay: {
    backgroundColor: '#fff',
    height: moderateVerticalScale(50, 0),
    paddingHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'center',
    elevation: 1,
  },
  multilineDisplay: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10,
    elevation: 1,
  },
  inlineIconBtn: {
    borderRadius: 1000,
    borderWidth: 1,
    width: moderateScale(40, 0),
    height: moderateScale(40, 0),
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyFieldStyle: {
    width: WINDOW_WIDTH,
    paddingHorizontal: 15,
  },
});

export default styles;
