import {StyleSheet} from 'react-native';

import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../constants/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    elevation: 1,
    width: WINDOW_WIDTH,
  },
  subHeader: {
    elevation: 1,
    width: WINDOW_WIDTH,
    borderBottomWidth: 0.25,
    borderTopWidth: 0.25,
    borderColor: '#ffffff42',
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
  dividerStyle: {
    opacity: 0.2,
    transform: [{scale: 2}],
  },
});

export default styles;
