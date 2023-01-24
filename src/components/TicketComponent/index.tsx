import React from 'react';
import { View, Text } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-paper';

import { CstmPressable } from '../CstmPressable';
import styles from './styles';
import { SCREEN_WIDTH } from '../../constants';

const TicketComponent = ({
  item2,
  ind,
  onPress = e => {},
}: {
  item2: any;
  ind: number;
  onPress: (e: any) => void;
}) => {
  const { dark, colors }: Theme = useTheme();
  console.log('item2?.attributes', item2?.attributes);

  return (
    <CstmPressable
      style={{ paddingHorizontal: 20, width: SCREEN_WIDTH }}
      key={`${item2.id}-${ind}`}
      onPress={() => {
        onPress(item2);
      }}
      android_ripple={{ color: dark ? '#ffffff0e' : '#0000000e' }}>
      <View style={styles.itemContentContainer}>
        <View style={styles.itemContentIconContainer}>
          <View
            style={{
              ...styles.itemContentIcon,
              backgroundColor: '#28648f',
            }}>
            <II name="pricetag" size={22} color="#fff" />
          </View>
        </View>
        <View style={{ width: '75%' }}>
          <Text
            style={{ fontWeight: 'bold', color: colors.text, fontSize: 22 }}>
            Ticket #{item2?.id}
          </Text>
          <Text style={{ fontWeight: '500', color: colors.text, fontSize: 16 }}>
            Subject: {item2?.attributes?.subject}
          </Text>
          <Text
            style={{ color: colors.primary, fontSize: 12, fontWeight: '400' }}>
            Status: {item2?.attributes?.ticketstatus?.name}
          </Text>
          <View style={styles.descContentContainer}>
            {item2?.attributes?.company && (
              <View style={styles.rowContainer}>
                <II
                  name="business"
                  color={colors.text}
                  style={styles.margin_5}
                />
                <Text style={{ color: colors.text }}>
                  {item2?.attributes?.company?.toString()}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <Divider style={{ height: 1 }} />
    </CstmPressable>
  );
};

export default TicketComponent;
