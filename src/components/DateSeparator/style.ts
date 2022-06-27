import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider_1: {
    width: '15%',
    transform: [{scaleY: 6}],
  },
  divider_2: {
    width: '35%',
    transform: [{scaleY: 6}],
  },
});

export default styles;
