import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  NavigationProp,
  useRoute,
} from '@react-navigation/native';
import FT from 'react-native-vector-icons/Fontisto';
import AD from 'react-native-vector-icons/AntDesign';

import { EmptyListMsg, GapView, ModalField } from '../../components';
import { Divider, Modal } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import { WINDOW_HEIGHT } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { STNoteTypes } from '../../constants/SampleArrays';

const dataSource: Item[] = [
  {
    id: 1,
    img: require('../../assets/images/avatar_holder.webp'),
    title: 'Template 1',
    time: '12:19 AM',
    date: '11 Nov, 2021',
    note: 'Sit anim laborum laboris reprehenderit tempor anim magna ut. Sunt eiusmod Lorem veniam exercitation pariatur sit occaecat sunt non eu deserunt aliquip dolor.',
  },
  {
    id: 2,
    img: require('../../assets/images/avatar_holder.webp'),
    title: 'Template 2',
    time: '12:19 AM',
    date: '15 Nov, 2021',
  },
  {
    id: 3,
    img: require('../../assets/images/avatar_holder.webp'),
    title: 'Template 3',
    time: '12:19 AM',
    date: '19 Nov, 2021',
  },
  {
    id: 4,
    img: require('../../assets/images/avatar_holder.webp'),
    title: 'Template 4',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    note: 'Sit anim laborum laboris reprehenderit tempor anim magna ut. Sunt eiusmod Lorem veniam exercitation pariatur sit occaecat sunt non eu deserunt aliquip dolor.',
  },
  {
    id: 5,
    img: require('../../assets/images/avatar_holder.webp'),
    title: 'Template 5',
    time: '12:19 AM',
    date: '19 Nov, 2021',
  },
  {
    id: 6,
    img: require('../../assets/images/avatar_holder.webp'),
    title: 'Template 6',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    note: 'Sit anim laborum laboris reprehenderit tempor anim magna ut. Sunt eiusmod Lorem veniam exercitation pariatur sit occaecat sunt non eu deserunt aliquip dolor.',
  },
  {
    id: 7,
    img: require('../../assets/images/avatar_holder.webp'),
    title: 'Template 7',
    time: '12:19 AM',
    date: '19 Nov, 2021',
  },
  {
    id: 8,
    img: require('../../assets/images/avatar_holder.webp'),
    title: 'Template 8',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    note: 'Sit anim laborum laboris reprehenderit tempor anim magna ut. Sunt eiusmod Lorem veniam exercitation pariatur sit occaecat sunt non eu deserunt aliquip dolor.',
  },
  {
    id: 9,
    img: require('../../assets/images/avatar_holder.webp'),
    title: 'Template 9',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    note: 'Sit anim laborum laboris reprehenderit tempor anim magna ut. Sunt eiusmod Lorem veniam exercitation pariatur sit occaecat sunt non eu deserunt aliquip dolor.',
  },
];

interface Item {
  id: number;
  img?: any;
  title: string;
  time: string;
  date: string;
  note?: string;
}

const Notes = () => {
  const { colors, dark }: Theme = useTheme();

  const renderList = ({ item, index }: { item: Item; index: number }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', padding: 8 }}>
          <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Image source={item.img} style={styles.imageStyle} />
          </View>
          <GapView mode="horizontal" />
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ color: colors.text, ...styles.titleStyle }}>
              {item.title}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: colors.text, ...styles.subText }}>
                {item.time}
              </Text>
              <View
                style={{
                  backgroundColor: dark ? '#ffffff' : '#000000',
                  ...styles.divider,
                }}
              />
              <Text style={{ color: colors.text, ...styles.subText }}>
                {item.date}
              </Text>
            </View>
          </View>
        </View>
        {item.note && (
          <Text style={{ color: colors.text, padding: 8 }}>{item.note}</Text>
        )}
      </View>
    );
  };

  if (dataSource.length == 0) {
    return (
      <View style={styles.container}>
        <NotFound />
      </View>
    );
  } else {
    return (
      <>
        <ModalField
          mode="none"
          pressEnable={false}
          contentStyle={{
            ...styles.subHeader,
          }}>
          <SubHeader />
        </ModalField>
        <ModalField mode="none" pressEnable={false} fieldPadding={0}>
          <FlatList
            data={dataSource}
            renderItem={renderList}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ height: 120 }}
            ItemSeparatorComponent={() => (
              <Divider
                style={{ backgroundColor: colors.background, height: 1.2 }}
              />
            )}
          />
        </ModalField>
      </>
    );
  }
};
type StackLvl2 = StackNavigationProp<RootStackParamList, 'Stack2'>;

const SubHeader = () => {
  const { colors }: Theme = useTheme();
  const navigation = useNavigation<StackLvl2>();
  const route = useRoute<any>();
  return (
    <>
      <Text style={{ color: colors.text, ...styles.titleStyle }}>All</Text>
      <View style={{ flexDirection: 'row' }}>
        <AD
          name="addfile"
          size={24}
          color={colors.text}
          style={{ opacity: 0.8 }}
          onPress={() => navigation.navigate('Stack2', {
            screen: 'ComposeNote',
            params: {
              from: 'STickets',
              item: 'GoneTo',
              data: STNoteTypes,
              selected: null,
              stack: 'Stack2',
              title: route?.params?.title,
              headerTitle: 'Note Type',
              status: route?.params?.status,
            },
          })}
        />
        <GapView mode="horizontal" length={30} />
        <FT
          name="equalizer"
          size={24}
          color={colors.text}
          style={{ opacity: 0.8 }}
          onPress={() => console.log('Pressed')}
        />
      </View>
    </>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Notes" />
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    width: 2,
    height: 14,
    marginHorizontal: 6,
    alignSelf: 'center',
    opacity: 0.2,
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    opacity: 0.6,
  },
});
