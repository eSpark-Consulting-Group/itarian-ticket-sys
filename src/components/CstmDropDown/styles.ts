import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  labelText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    opacity: 0.7,
    height: 25,
  },
  dropdownLabelContainer: {
    borderWidth: 2,
    borderRadius: 2,
  },
  dropdownLabelInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  dropDownText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
  },
  dropDownContainer: {
    height: 130,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  itemContainer: {
    flex: 1,
    padding: 8,
  },
  itemText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
  },
});

export default styles;
