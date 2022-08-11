import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: 3.5,
    borderRadius: 10,
  },
  itemStyle: {
    width: moderateScale(110),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10,
  },
  textStyle: {
    fontWeight: 'bold',
  },
  dividerStyle: {
    width: 2,
    height: 25,
    margin: 2,
    backgroundColor: '#8f8f8f26',
    alignSelf: 'center',
  },
});

export default styles;
