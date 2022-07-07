import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    borderRadius: 500,
  },
  textStyle: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    flexDirection: 'row',
    padding: 8,
  },
});

export default styles;
