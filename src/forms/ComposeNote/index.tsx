import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  CstmMultiLine,
  ModalField,
  ModalHeader,
  ModalView,
  OutlineBtn,
} from '../../components';
import {WINDOW_WIDTH} from '../../constants';
import {MultiLineField} from '../../components/FormFields';

const noteTypes: Item[] = [
  {
    text: 'Discussion',
    highlight: true,
  },
  {
    text: 'Internal',
    highlight: false,
  },
  {
    text: 'Resolution',
    highlight: false,
  },
];

type Item = {
  text: string;
  highlight: boolean;
};

export default function ComposeNote() {
  const {colors, dark} = useTheme();
  const [noteTypeList, setNoteTypeList] = useState(noteTypes);

  const handleType = (item: Item, index: number) => {
    let tempArr = [...noteTypeList];
    tempArr[index].highlight = true;
    const finalArr = [...tempArr];
    finalArr.forEach((value, index2) => {
      if (index != index2) {
        return (tempArr[index2].highlight = false);
      }
    });
    console.log('kia ha ', finalArr, item.text);
    setNoteTypeList(finalArr);
  };

  const renderNoteTypes = (item: Item, index: number) => {
    return (
      <OutlineBtn
        key={index}
        text={item.text}
        widthLength={WINDOW_WIDTH * 0.25}
        onPress={() => handleType(item, index)}
        border
        backColor={colors.card}
        textColor={colors.text}
        highlight={item.highlight}
      />
    );
  };

  return (
    <ModalView>
      <ModalHeader empty>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          {noteTypeList.map(renderNoteTypes)}
        </View>
      </ModalHeader>
      <MultiLineField title="Compose Note" />
    </ModalView>
  );
}

const styles = StyleSheet.create({});
