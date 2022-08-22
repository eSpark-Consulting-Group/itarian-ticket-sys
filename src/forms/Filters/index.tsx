import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {SingleLineField} from '../../components';
import {Filter} from '../../types';

export default function App({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var {dataSource: dSource, title} = route?.params;
  const {colors}: Theme = useTheme();
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
