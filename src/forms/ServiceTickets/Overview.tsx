import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';

import {
  boardList,
  customFeildList,
  itemList,
  siteList,
  statusList,
  subTypesList,
  typesList,
} from '../../constants/SampleArrays';
import {PriorityField, SingleLineField} from '../../components';
import {SelectFeilds} from '../../types/index';
const Overview = () => {
  const {colors}: Theme = useTheme();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const IsFocused = useIsFocused();

  const [state, setState] = useState<State>({
    customFeild: {name: 'Custom Feilds 1', id: 1},
    site: {name: 'Site 1', id: 1},
    board: {name: 'Board 1', id: 1},
    status: {name: 'Status 1', id: 1},
    type: {name: 'Type 1', id: 1},
    subType: {name: 'Subtype 1', id: 1},
    item: {name: 'Item 1', id: 1},
  });

  useEffect(() => {
    if (route?.params?.item) {
      var obj: any = state;
      obj[route?.params?.item] = route?.params?.selected;
      setState({...obj});
    }
  }, [route?.params]);

  type State = {
    customFeild: SelectFeilds;
    site: SelectFeilds;
    board: SelectFeilds;
    status: SelectFeilds;
    type: SelectFeilds;
    subType: SelectFeilds;
    item: SelectFeilds;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      <PriorityField />
      <SingleLineField
        title={state?.customFeild.name}
        leftIcon="clipboard-text-outline"
        rightIcon="chevron-right"
        onPress={() => {
          navigation.navigate('Stack2', {
            screen: 'CstmItemSelector',
            params: {
              from: 'STickets',
              item: 'customFeild',
              data: customFeildList,
              selected: state?.customFeild,
              stack: 'Stack1',
              // title: route?.params?.title,
              headerTitle: 'Custom Feild',
              searchable: true,
            },
          });
        }}
      />
      <SingleLineField
        title={state?.site?.name}
        subTitle="Site"
        rightIcon="chevron-right"
        onPress={() => {
          navigation.navigate('Stack2', {
            screen: 'CstmItemSelector',
            params: {
              from: 'STickets',
              item: 'site',
              data: siteList,
              selected: state?.site,
              stack: 'Stack1',
              title: route?.params?.title,
              headerTitle: 'Site',
            },
          });
        }}
      />
      <SingleLineField
        title="123 Elm Street Tampa, Fl 32364 United States"
        titleWidth={moderateScale(130)}
        subTitle="Address"
        // rightIcon="chevron-right"
      />
      <SingleLineField
        title={state?.board?.name}
        subTitle="Board"
        rightIcon="chevron-right"
        onPress={() => {
          navigation.navigate('Stack2', {
            screen: 'CstmItemSelector',
            params: {
              from: 'STickets',
              item: 'board',
              data: boardList,
              selected: state?.board,
              stack: 'Stack1',
              title: route?.params?.title,
              headerTitle: 'Board',
            },
          });
        }}
      />
      <SingleLineField
        title={state?.status.name}
        subTitle="Status"
        rightIcon="chevron-right"
        onPress={() => {
          navigation.navigate('Stack2', {
            screen: 'CstmItemSelector',
            params: {
              from: 'STickets',
              item: 'status',
              data: statusList,
              selected: state?.status,
              stack: 'Stack1',
              title: route?.params?.title,
              headerTitle: 'Status',
            },
          });
        }}
      />
      <SingleLineField
        title="Sales - Existing"
        subTitle="Board"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title="The Sale of Agreements"
        subTitle="Agreement"
        enable={false}
      />
      <SingleLineField
        title={state.type.name}
        subTitle="Type"
        rightIcon="chevron-right"
        onPress={() => {
          navigation.navigate('Stack2', {
            screen: 'CstmItemSelector',
            params: {
              from: 'STickets',
              item: 'type',
              data: typesList,
              selected: state?.type,
              stack: 'Stack1',
              title: route?.params?.title,
              headerTitle: 'Type',
            },
          });
        }}
      />
      <SingleLineField
        title={state.subType.name}
        subTitle="Subtype"
        rightIcon="chevron-right"
        onPress={() => {
          navigation.navigate('Stack2', {
            screen: 'CstmItemSelector',
            params: {
              from: 'STickets',
              item: 'subType',
              data: subTypesList,
              selected: state?.subType,
              stack: 'Stack1',
              title: route?.params?.title,
              headerTitle: 'Subtype',
            },
          });
        }}
      />
      <SingleLineField
        title={state.item.name}
        subTitle="Item"
        rightIcon="chevron-right"
        onPress={() => {
          navigation.navigate('Stack2', {
            screen: 'CstmItemSelector',
            params: {
              from: 'STickets',
              item: 'item',
              data: itemList,
              selected: state?.item,
              stack: 'Stack1',
              title: route?.params?.title,
              headerTitle: 'Item',
            },
          });
        }}
      />
    </ScrollView>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priorityBox: {
    backgroundColor: 'yellow',
    borderWidth: 1,
    height: 10,
    width: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
  },
  subTitle: {
    opacity: 0.6,
  },
});
