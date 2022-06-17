import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 0.08,
    flexDirection: 'row',
  },
  button: {
    flex: 0.8,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  adjuster: {flex: 0.1},
  text: {color: '#F7F7F7', fontWeight: '800', fontSize: 18},
});

export default styles;
