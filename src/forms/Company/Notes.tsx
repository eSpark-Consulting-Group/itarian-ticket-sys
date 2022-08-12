import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import FT from 'react-native-vector-icons/Fontisto';

import {ModalField, SingleLineField} from '../../components';

const dataSource: Item[] = [
  {
    id: 1,
    img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    title: 'Template 1',
    time: '12:19 AM',
    date: '11 Nov, 2021',
  },
  {
    id: 2,
    img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    title: 'Template 2',
    time: '12:19 AM',
    date: '15 Nov, 2021',
  },
  {
    id: 3,
    img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    title: 'Template 3',
    time: '12:19 AM',
    date: '19 Nov, 2021',
  },
];

interface Item {
  id: number;
  img?: string;
  title: string;
  time: string;
  date: string;
}

const Notes = () => {
  const {colors}: Theme = useTheme();

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return <View />;
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

        {/* <FlatList data={} /> */}
      </ModalField>
    </View>
  );
};

const SubHeader = () => {
  const {colors}: Theme = useTheme();
  return (
    <>
      <Text style={{color: colors.text, opacity: 0.8}}>All</Text>
      <FT
        name="equalizer"
        size={24}
        color={colors.text}
        style={{opacity: 0.8}}
        onPress={() => console.log('Pressed')}
      />
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
});
