import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import FT from 'react-native-vector-icons/Fontisto';
import AD from 'react-native-vector-icons/AntDesign';

import {GapView, ModalField} from '../../components';
import {Divider} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import {WINDOW_HEIGHT} from '../../constants';

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
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return (
      <View>
        <View style={{flexDirection: 'row', padding: 8}}>
          <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
            <Image source={item.img} style={styles.imageStyle} />
          </View>
          <GapView mode="horizontal" />
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: colors.text, ...styles.titleStyle}}>
              {item.title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: colors.text, ...styles.subText}}>
                {item.time}
              </Text>
              <View
                style={{
                  backgroundColor: dark ? '#ffffff' : '#000000',
                  ...styles.divider,
                }}
              />
              <Text style={{color: colors.text, ...styles.subText}}>
                {item.date}
              </Text>
            </View>
          </View>
        </View>
        {item.note && (
          <Text style={{color: colors.text, padding: 8}}>{item.note}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ModalField
        mode="none"
        pressEnable={false}
        contentStyle={{
          ...styles.subHeader,
        }}>
        <SubHeader />
      </ModalField>
      <ModalField
        mode="none"
        contentStyle={{
          height: PixelRatio.roundToNearestPixel(WINDOW_HEIGHT * 0.45),
        }}
        pressEnable={false}>
        <FlatList
          data={dataSource}
          renderItem={renderList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <Divider
              style={{backgroundColor: colors.background, height: 1.2}}
            />
          )}
        />
      </ModalField>
    </View>
  );
};

const SubHeader = () => {
  const {colors}: Theme = useTheme();
  return (
    <>
      <Text style={{color: colors.text, ...styles.titleStyle}}>All</Text>
      <View style={{flexDirection: 'row'}}>
        <AD
          name="addfile"
          size={24}
          color={colors.text}
          style={{opacity: 0.8}}
          onPress={() => console.log('Pressed')}
        />
        <GapView mode="horizontal" length={30} />
        <FT
          name="equalizer"
          size={24}
          color={colors.text}
          style={{opacity: 0.8}}
          onPress={() => console.log('Pressed')}
        />
      </View>
    </>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
