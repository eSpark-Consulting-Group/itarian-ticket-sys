import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {WINDOW_WIDTH} from '../../../constants';

const styles = StyleSheet.create({
  itemContainer: {
    width: WINDOW_WIDTH,
    marginVertical: 10,
  },
  itemContentContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  itemContentIconContainer: {
    marginRight: 10,
  },
  itemContentIcon: {
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(40, 0),
    height: moderateScale(40, 0),
    backgroundColor: '#28648f',
  },
  descContentContainer: {marginTop: 5},
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  margin_5: {marginRight: 5},
  schedule_dur: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 1000,
    paddingHorizontal: 5,
  },
  divider: {
    width: WINDOW_WIDTH,
    transform: [{scaleY: 1}],
    // marginVertical: 5,
    opacity: 0.5,
    backgroundColor: '#999',
  },
});

export default styles;
