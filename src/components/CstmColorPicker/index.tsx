import React, { useRef } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { useTheme } from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { CstmPressable } from '../CstmPressable';
import GapView from '../GapView';

export default function CstmColorPicker({
  visible,
  updateColor,
  color,
  onClose,
  erasable = false,
  onErase = () => {},
}: {
  visible: boolean;
  color: string;
  updateColor: (color: string) => void;
  onClose?: () => void;
  erasable?: boolean;
  onErase?: (color: string) => void;
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
              flexDirection: 'row',
              width: '100%',
              paddingVertical: 10,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <II
              size={30}
              style={{
                flex: 0.2,
                textAlign: 'center',
              }}
              name="close"
              color={'#fff'}
              onPress={onClose}
            />
            <Text
              style={{
                flex: 1,
                fontSize: 22,
                color: '#ffffff',
                fontWeight: '500',
                textAlign: 'center',
              }}>
              Pick Color
            </Text>
            <View
              style={{
                flex: 0.2,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
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
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: erasable ? 'space-between' : 'flex-end',
              paddingHorizontal: 12,
            }}>
            {erasable && (
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
                  onPress={(): void => onErase('#000')}>
                  <Fontisto size={25} name="eraser" color={'#fff'} />
                </CstmPressable>
              </View>
            )}
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
          <GapView />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
