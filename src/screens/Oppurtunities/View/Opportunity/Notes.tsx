import React from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import FT from 'react-native-vector-icons/Fontisto';
import AD from 'react-native-vector-icons/AntDesign';

import {EmptyListMsg, GapView, ModalField} from '../../../../components';
import {Divider, Modal} from 'react-native-paper';

const dataSource: Item[] = [];

interface Item {
  id: number;
  img?: any;
  title: string;
  time: string;
  date: string;
  note?: string;
}

export default function Notes() {
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
    <>
      <ModalField
        mode="none"
        pressEnable={false}
        contentStyle={{
          ...styles.subHeader,
        }}>
        <SubHeader />
      </ModalField>
      {dataSource.length == 0 ? (
        <View style={styles.container}>
          <NotFound />
        </View>
      ) : (
        <>
          <ModalField mode="none" pressEnable={false} fieldPadding={0}>
            <FlatList
              data={dataSource}
              renderItem={renderList}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{height: 120}}
              ItemSeparatorComponent={() => (
                <Divider
                  style={{backgroundColor: colors.background, height: 1.2}}
                />
              )}
            />
          </ModalField>
        </>
      )}
    </>
  );
}

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

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Notes" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
