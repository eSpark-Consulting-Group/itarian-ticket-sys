import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../constants';

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    width: '100%',
    padding: 10,
    // paddingHorizontal: 16,
    elevation: 1.5,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
    padding: 4,
  },
  subTitle: {
    fontSize: 14,
    opacity: 0.5,
    padding: 4,
  },
  rightContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default styles;
