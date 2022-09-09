import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import {SingleLineField} from '../../components';
import {Filter} from '../../types';

export default function App({route, navigation}: {route: any, navigation: any}) {
  var {dataSource: dSource, title} = route?.params;
  const [dataSource, setDataSource] = useState(dSource);

  useEffect(() => {
    console.log('route?.params.dataSource:', dataSource);
  }, [route?.params]);

  const updateSwitch = (index: number) => {
    let tempArr: Filter[] = [...dataSource];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    console.log('tempArr', tempArr);
    setDataSource(tempArr);
  };


   // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
   useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params]);

  const handlePress = (item: Filter, index: number) => {
    if (item?.list) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          ...route?.params,
          from: 'Filters',
          item: index,
          data: item.list,
          selected: item.selectedItem,
          stack: 'Stack1',
          title: route?.params?.title,
          headerTitle: item.headerTitle,
          searchable: item.searchable,
        },
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {dataSource.map((item: Filter, index: number) => (
        <SingleLineField
          key={index}
          subTitle={item.subTitle}
          title={item.title != '' ? item.title : title}
          enable={item.enable}
          titleWidth={item.titleWidth}
          rightIcon={item.rightIcon}
          showRightSwitch={item.showRightSwitch}
          rightSwitchVal={item.rightSwitchVal}
          onChangeSwitch={() => updateSwitch(index)}
          leftIcon={item.leftIcon}
          leftIconStyles={{opacity: 1}}
          onPress={() => handlePress(item, index)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
