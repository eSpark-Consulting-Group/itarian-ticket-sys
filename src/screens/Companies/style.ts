import {StyleSheet, Dimensions} from 'react-native';

import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../constants/Dimensions';
import {moderateScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    elevation: 1,
    width: width,
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
});

export default styles;
