import React, { useRef } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { useTheme } from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';

import { CstmPressable } from '../CstmPressable';

export default function CstmColorPicker({
  visible,
  updateColor,
  color,
}: {
  visible: boolean;
  color: string;
  updateColor: (color: string) => void;
}): JSX.Element {
  const colorRef = useRef(color);
  const { colors, dark } = useTheme();

  return (
    <Modal
      presentationStyle="overFullScreen"
      visible={visible}
      transparent
      statusBarTranslucent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000a5',
        }}>
        <View
          style={{
            width: '90%',
            height: '50%',
            backgroundColor: colors.background,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 3,
            borderColor: colors.primary,
          }}>
          <View
            style={{
              flex: 1,
              height: '70%',
              width: '50%',
            }}>
            <ColorPicker
              color={colorRef.current}
              row={false}
              sliderHidden={false}
              thumbSize={20}
              noSnap={true}
              swatches={false}
              onColorChangeComplete={value => {
                colorRef.current = value;
                console.log('xx', value, 'Color', colorRef.current);
              }}
            />
          </View>
          <View
            style={{
              flex: 0.3,
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingHorizontal: 12,
            }}>
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 99,
                elevation: 5,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CstmPressable
                style={{ padding: 10 }}
                android_ripple={{
                  color: '#ffffff2e',
                  borderless: true,
                }}
                onPress={(): void => updateColor(colorRef.current)}>
                <II size={30} name="checkmark" color={'#fff'} />
              </CstmPressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
