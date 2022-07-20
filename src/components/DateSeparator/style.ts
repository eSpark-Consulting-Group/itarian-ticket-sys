import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  divider_1: {
    flex: 0.2,
    transform: [{scaleY: 6}],
  },
  centerContent: {paddingHorizontal: 10},
  divider_2: {
    flex: 0.8,
    transform: [{scaleY: 6}],
  },
});

export default styles;
