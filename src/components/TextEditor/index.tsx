import { Theme, useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import { SCREEN_WIDTH } from '../../constants';
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
  const { colors }: Theme = useTheme();
  return (
    <View>
      <RichToolbar
        editor={richText}
        selectedIconTint={colors.text}
        iconTint={colors.card}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.setSubscript,
          actions.setSuperscript,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.blockquote,
          actions.setParagraph,
          actions.heading1,
          actions.heading2,
          actions.heading3,
          actions.heading4,
          // actions.table,
          actions.outdent,
          actions.indent,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.checkboxList,
          actions.undo,
          actions.redo,
        ]}
        iconMap={{
          [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>),
          [actions.heading2]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H2</Text>),
          [actions.heading3]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H3</Text>),
          [actions.heading4]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H4</Text>),
          [actions.setParagraph]: ({tintColor}) => (<Text style={[{color: tintColor}]}>P</Text>),

        }}
        style={{backgroundColor: colors.primary, width: SCREEN_WIDTH - 30,}}
      />
      <RichEditor
        ref={richText}
        onChange={onChangeText}
        placeholder={placeholder}
        initialContentHTML={value}
        androidHardwareAccelerationDisabled={true}
        style={styles.richTextEditorStyle}
        editorStyle={{ backgroundColor: colors.background, color: colors.text }}
        initialHeight={100}
        injectedJavaScript='document.body.style.webkitUserSelect = "none";'
        injectedJavaScriptBeforeContentLoaded='document.body.style.webkitUserSelect = "none";'
      />
    </View>
  );
};
