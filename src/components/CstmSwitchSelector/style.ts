import {StyleSheet} from 'react-native';

import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../constants';

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 215,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
