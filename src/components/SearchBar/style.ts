import {StyleSheet} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // backgroundColor: 'teal',
  },
  adjuster: {
    width: '2.5%',
  },
  tagContainer: {
    width: '15%',
  },
  tagButtonStyle: {
    flex: 1,
    height: '100%',
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  searchInputContainer: {
    height: '100%',
  },
  inputStyle: {
    backgroundColor: '#80808040',
    borderRadius: 15,
    elevation: 0
  },
  menuItemButtonStyle: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default styles;
