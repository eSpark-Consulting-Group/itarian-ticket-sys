import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import { DarkTheme, LightTheme } from '../../theme/colors';
import styles from './styles';

export const TextEditor = ({
  value = '',
  onChangeText,
  placeholder,
}: {
  title?: string;
  value?: string;
  width?: string | number;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}) => {
  const richText = useRef<any>();

  return (
    <View>
      <RichToolbar
        editor={richText}
        selectedIconTint={DarkTheme.colors.card}
        iconTint={LightTheme.colors.card}
        actions={[
          // actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.setStrikethrough,
          actions.setUnderline,
        ]}
        style={styles.richTextToolbarStyle}
      />
      <RichEditor
        ref={richText}
        onChange={onChangeText}
        placeholder={placeholder}
        initialContentHTML={value}
        androidHardwareAccelerationDisabled={true}
        style={styles.richTextEditorStyle}
        initialHeight={100}
        injectedJavaScript='document.body.style.webkitUserSelect = "none";'
        injectedJavaScriptBeforeContentLoaded='document.body.style.webkitUserSelect = "none";'
      />
    </View>
  );
};
