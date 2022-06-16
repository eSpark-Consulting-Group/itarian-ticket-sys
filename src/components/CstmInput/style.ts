import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 0.08,
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'transparent',
  },
  center: {flex: 0.8},
  adjuster: {flex: 0.1},
  text: {color: '#F7F7F7', fontWeight: '800', fontSize: height * 0.025},
});

export default styles;
