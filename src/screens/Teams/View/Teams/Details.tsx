import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTheme, Theme, useNavigation, useRoute} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import {GapView, SingleLineField} from '../../../../components';

interface Item {
  title: string;
  onPress?: () => void;
  headerTitle?: string;
  subTitle?: string;
  enable?: boolean;
  rightIcon?: string;
  titleWidth?: number;
  leftIcon?: string;
  searchable?: boolean;
  rightChild?: React.ReactNode;
  rightIconRound?: string;
  roundedIconEnable?: boolean;
}

export default function Details() {
  const {colors, dark}: Theme = useTheme();
  const routes: any = useRoute()
  const teamDetails = routes?.params?.teamDetails
  console.log("teamDetails?.relationships", teamDetails?.relationships);
  
  const renderList = ({item, index}: {item: Item; index: number}) => {
    return <SingleLineField title={item.title} gap={true} subTitle={item?.subTitle} fieldPadding={24} onPress={item?.onPress} />;
  };

  const dataSource: Item[] = [
    {
      subTitle: 'Name',
      title: teamDetails?.attributes?.name ?? ""
    },
    {
      subTitle: 'Team Lead',
      title: teamDetails?.attributes?.teamlead?.user_name ?? ""
    },
    {
      subTitle: 'Admin Notes',
      title: teamDetails?.attributes?.admin_notes ?? ""
    },
  ];

  return (
    <View>
      <GapView />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        ItemSeparatorComponent={() => (
          <Divider style={{backgroundColor: colors.background, height: 1.5}} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
