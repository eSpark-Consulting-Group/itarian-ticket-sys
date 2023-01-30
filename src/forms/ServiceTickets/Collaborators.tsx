import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Divider } from 'react-native-paper';

import {
  CstmPressable,
  GapView,
  NotFound,
  SingleLineField,
  TicketComponent,
} from '../../components';
import { useHookstate } from '@hookstate/core';
import { ticketStore } from '../../stores/ticketStore';
import moment from 'moment';
// @ts-ignore
import HTMLView from 'react-native-htmlview';
import { Company } from '../../types';
import { moderateScale } from 'react-native-size-matters';
import { WINDOW_WIDTH } from '../../constants';

const Collaborators = () => {
  const { colors, dark }: Theme = useTheme();
  const route: any = useRoute();
  const ticketCollaborators: any = useHookstate(
    ticketStore?.ticketCollaborators,
  ).get();

  const renderList = ({ item, index }: { item: Company; index: number }) => {
    return (
      <View key={`company-details-${index}`} style={styles.listContainer}>
        <CstmPressable
          android_ripple={{ color: dark ? '#ffffff0e' : '#0000000e' }}>
          <View style={{ padding: moderateScale(15) }}>
            <Text
              style={{
                color: colors.text,
              }}>
              {item?.name}
            </Text>
          </View>
        </CstmPressable>
        {/* <Divider
          style={{ backgroundColor: colors.text, ...styles.dividerStyle }}
        /> */}
      </View>
    );
  };

  console.log("ticketCollaborators?.length", ticketCollaborators?.length);
  return (
    <>
      {ticketCollaborators?.length > 0 ? (
        <FlatList
          data={ticketCollaborators ?? []}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingVertical: 5,
          }}
          renderItem={renderList}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: 8 }}
          ItemSeparatorComponent={() => (
            <Divider
              style={{
                backgroundColor: colors.text,
                height: 1.5,
                opacity: 0.2,
                // transform: [{ scale: 2 }],
              }}
            />
          )}
        />
      ) : (
        <NotFound label="Collaborators" />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    elevation: 1,
    width: WINDOW_WIDTH,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    width: WINDOW_WIDTH,
  },
  dividerStyle: {
    opacity: 0.2,
    transform: [{ scale: 2 }],
  },
});

export default Collaborators;
