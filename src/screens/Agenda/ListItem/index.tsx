import React from 'react';
import {View, Text, FlatList} from 'react-native';

import {useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';

import styles from './style';
import {Theme} from '../../../theme/colors';
import {DateSeparator} from '../../../components';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';
import { CstmPressable } from '../../../components/CstmPressable/indes';
import {DateSeparator, EmptyListMsg, GapView} from '../../../components';
import {Ticket} from '../../../types';

export type dates = {
  date: Date;
};

export type Item = {
  company_name: string;
  id: number;
  location: 'Remote' | 'On-Site' | 'In-House';
  task: string;
  ticket_no: string;
};

const ListItem = ({
  dataSource,
  renderDate = true,
  onPress,
}: {
  dataSource: any;
  renderDate?: boolean;
  onPress?: (item: Ticket) => void;
}) => {
  const {colors, dark}: Theme = useTheme();

  const renderData = (item2: any, ind: number) => {
    return (
      <CstmPressable
        style={{paddingHorizontal: 20}}
        key={item2.id}
        onPress={() => onPress?.(item2)}
        android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
        <View style={styles.itemContentContainer}>
          <View style={styles.itemContentIconContainer}>
            <View style={styles.itemContentIcon}>
              <II name="pricetag" size={22} color="#fff" />
            </View>
          </View>
          <View style={{width: '75%'}}>
            <Text style={{fontWeight: 'bold', color: colors.text}}>
              Ticket #{item2.ticket_no}
            </Text>
            <Text style={{fontWeight: 'bold', color: colors.text}}>
              {item2.ticket_summary}
            </Text>
            <View style={styles.descContentContainer}>
              {item2.expType && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '110%',
                  }}>
                  <Text style={{color: colors.text}}>{item2.expType}</Text>
                  <Text style={{...styles.schedule_dur}}>{item2.totExp}</Text>
                </View>
              )}
              {item2.schedule_time && (
                <View style={styles.rowContainer}>
                  <II
                    name="calendar-outline"
                    color={colors.text}
                    style={styles.margin_5}
                  />
                  <Text style={{...styles.margin_5, color: colors.text}}>
                    {item2.schedule_time}
                  </Text>
                  <Text style={{...styles.schedule_dur, color: '#fff'}}>
                    {item2.time_dur}
                  </Text>
                </View>
              )}
              {item2.company && (
                <View style={styles.rowContainer}>
                  <II
                    name="business"
                    color={colors.text}
                    style={styles.margin_5}
                  />
                  <Text style={{color: colors.text}}>{item2.company}</Text>
                </View>
              )}
              {item2.site && (
                <View style={styles.rowContainer}>
                  <II
                    name="location-outline"
                    color={colors.text}
                    style={styles.margin_5}
                  />
                  <Text style={{color: colors.text}}>{item2.site}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {renderDate ? (
          dataSource.data.length === ind + 1 ? null : (
            <Divider style={styles.divider} />
          )
        ) : dataSource.length === ind + 1 ? null : (
          <Divider style={styles.divider} />
        )}
      </CstmPressable>
    );
  };

  return (
    <View style={styles.itemContainer}>
      <GapView />
      {renderDate && (
        <DateSeparator text={dataSource.date.toString().slice(0, 10)} />
      )}
      <FlatList
        data={renderDate ? dataSource.data : dataSource}
        renderItem={({item, index}) => renderData(item, index)}
      />
    </View>
  );
};

export const RenderTickets = ({listData}: {listData: Ticket[]}) => {
  return (
    <>
      {listData.length !== 0 ? (
        <View style={styles.renderListContainer}>
          <ListItem dataSource={listData} renderDate={false} />
        </View>
      ) : (
        <NotFound />
      )}
    </>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.renderNotFound}>
      <EmptyListMsg label="Tickets" />
    </View>
  );
};

export default ListItem;
