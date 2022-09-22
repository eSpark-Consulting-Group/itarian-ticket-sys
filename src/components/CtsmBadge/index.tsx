import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {Badge} from 'react-native-paper';

export default function CstmBadge({
  style,
  qty,
}: {
  style?: ViewStyle;
  qty?: number | string;
}) {
  return (
    <>
      {qty && (
        <Badge size={15} style={[styles.badgeStyle, style]}>
          {qty}
        </Badge>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    zIndex: 1,
    right: -5,
    top: -5,
    backgroundColor: '#dc1e1e',
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
