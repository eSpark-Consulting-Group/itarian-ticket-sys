import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Theme, useTheme} from '@react-navigation/native';

import styles from './styles';
import {EmptyListMsg, FloatButton} from '../../components';
import {expReportList} from '../../constants/SampleArrays';
import {ExpenseAdditionalButtons} from '../../constants/ButtonsList';
import {AdditionalButtons, ExpReportList} from '../../types';
import ListItem from '../../screens/Agenda/ListItem';

const Expenses = ({navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    ExpenseAdditionalButtons,
  );

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewExpenseReport',
      });
    };
    setActionButtons(tempArr);
  };

  useEffect(() => {
    updatePress();
  }, []);
 

  return (
    <View style={styles.container}>
      {(
        expReportList.length > 0 ? (
          <FlatList
            data={expReportList}
            renderItem={({item}) => {
              return (
                <ListItem
                  onPress={ticket => {
                    navigation.navigate('Stack3', {
                      screen: 'NewExpenseReport',
                      params: {
                        title: 'Edit Expense',
                        data: {
                          ticket: ticket,
                          date: item.date.toDateString(),
                          totExp: item.totExp,
                          from: 'ExpenseReportsScreen',
                        },
                      },
                    });
                  }}
                  dataSource={item}
                  renderDate={true}
                />
              );
            }}
          />
        ) : (
          <NotFound />
        )
      )}
      <FloatButton AdditionalButtons={actionButtons} />
    </View>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Data" />
    </View>
  );
};

export default Expenses;
