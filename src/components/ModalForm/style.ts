import {StyleSheet} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';

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
  blockDisplay: {
    backgroundColor: '#fff',
    flex: 1,
    height: moderateVerticalScale(50, 0),
    paddingHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inllineDisplay: {
    backgroundColor: '#fff',
    flex: 1,
    height: moderateVerticalScale(50, 0),
    paddingHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  multilineDisplay: {
    backgroundColor: '#fff',
    flex: 1,
    height: moderateVerticalScale(120, 0),
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});

export default styles;
