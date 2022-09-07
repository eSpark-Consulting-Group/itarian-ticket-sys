import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EmptyListMsg from '../EmptyListMsg';

const NotFound = ({
  label,
  iconName = 'selection-search',
}: {
  label: string;
  iconName?: string;
}): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg iconName={iconName} label={label} />
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
