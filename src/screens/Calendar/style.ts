import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  line: {
    height: 1,
    position: 'absolute',
    left: 50 - 1,
    backgroundColor: 'rgb(216,216,216)',
  },
  timeLabel: {
    position: 'absolute',
    left: 15,
    color: 'rgb(170,170,170)',
    fontSize: 10,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
  },
});

export default styles;
