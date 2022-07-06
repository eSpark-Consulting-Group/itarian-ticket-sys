import {StyleSheet} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

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
    flex: 1,
    height: moderateVerticalScale(50, 0),
    paddingHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  blockDisplay: {
    backgroundColor: '#fff',
    flex: 1,
    height: moderateVerticalScale(50, 0),
    paddingHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'center',
    elevation: 2,
  },
  multilineDisplay: {
    backgroundColor: '#fff',
    flex: 1,
    height: moderateVerticalScale(120, 0),
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
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
});

export default styles;
