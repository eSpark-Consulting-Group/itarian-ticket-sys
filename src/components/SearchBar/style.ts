import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    elevation: 2,
    borderBottomWidth: 3,
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
    width: '80%',
    padding: 8,
    height: '100%',
  },
  inputStyle: {
    elevation: 0,
    backgroundColor: '#80808040',
    borderRadius: 15,
  },
  menuItemButtonStyle: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default styles;
