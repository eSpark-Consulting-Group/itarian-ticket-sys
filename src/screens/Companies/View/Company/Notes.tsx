import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import FT from 'react-native-vector-icons/Fontisto';
import AD from 'react-native-vector-icons/AntDesign';

import {
  EmptyListMsg,
  GapView,
  ModalField,
  CstmMenu,
} from '../../../../components';
import {Divider} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../navigation/routes/RootNavigation';
import {
  NoteTypes_ACIT,
  noteList as dataSource,
} from '../../../../constants/SampleArrays';

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
  const navigation = useNavigation<StackLvl2>();
  const route = useRoute<any>();

  const [visible, setVisible] = useState(false);
  const [filterType, setfilterType] = useState('All');
  const [data, setData] = useState(dataSource);
  const showMenu = (): void => setVisible(true);
  const hideMenu = (): void => setVisible(false);

  useEffect(() => {
    if (filterType == 'All') {
      setData(dataSource);
    } else {
      const filteredData = dataSource.filter(val => val.type == filterType);
      setData([...filteredData]);
    }
  }, [filterType]);

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return (
      <View key={`compant-notes-${index}`}>
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

  const subHeader = () => {
    return (
      <>
        <Text style={{color: colors.text, ...styles.titleStyle}}>
          {filterType}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <AD
            name="addfile"
            size={24}
            color={colors.text}
            style={{opacity: 0.8}}
            onPress={() =>
              navigation.navigate('Stack2', {
                screen: 'ComposeNote',
                params: {
                  from: 'Company',
                  item: 'GoneTo',
                  data: NoteTypes_ACIT,
                  selected: {},
                  stack: 'Stack1',
                  title: route?.params?.title,
                  headerTitle: 'Note Type',
                  status: route?.params?.status,
                },
              })
            }
          />
          <GapView mode="horizontal" length={30} />
          <CstmMenu
            menuItems={[{text: 'All'}, ...NoteTypes_ACIT]}
            visible={visible}
            hideMenu={hideMenu}
            onChange={setfilterType}
            children={
              <FT
                name="equalizer"
                size={24}
                color={colors.text}
                style={{opacity: 0.8}}
                onPress={showMenu}
              />
            }
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ModalField
        pressEnable={false}
        contentStyle={{
          ...styles.subHeader,
        }}>
        {subHeader()}
      </ModalField>
      {data?.length > 0 ? (
        <ModalField pressEnable={false} fieldPadding={0} listMode>
          <FlatList
            data={data}
            renderItem={renderList}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{height: 70}}
            ItemSeparatorComponent={() => (
              <Divider
                style={{backgroundColor: colors.background, height: 1.2}}
              />
            )}
          />
        </ModalField>
      ) : (
        <NotFound />
      )}
    </View>
  );
};

type StackLvl2 = StackNavigationProp<RootStackParamList, 'Stack2'>;

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
  subHeaderText: {opacity: 0.8, fontWeight: 'bold', fontSize: 16},
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
