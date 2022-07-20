import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  emptyListLabel: {
    opacity: 0.35,
    fontSize: 22,
    fontWeight: '500',
  },
  emptyListContainer: {
    alignItems: 'center',
  },
  emptyListAdjuster: {
    height: 100,
  },
});

export default styles;
