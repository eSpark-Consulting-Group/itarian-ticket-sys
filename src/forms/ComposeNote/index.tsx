import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  CstmMultiLine,
  ModalField,
  ModalHeader,
  ModalView,
  OutlineBtn,
  SimpleLoader,
} from '../../components';
import { WINDOW_WIDTH } from '../../constants';
import { MultiLineField, SingleLineField } from '../../components/FormFields';
import { NoteTypeArray, NoteTypes } from '../../constants/SampleArrays';

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

export default function ComposeNote({ route, navigation }: any) {
  const { colors, dark } = useTheme();
  const [noteTypeList, setNoteTypeList] = useState<NoteTypes[]>([]);
  const [currChkInd, setCurrChkInd] = useState<number | any>(null);
  const [loader, setLoader] = useState<boolean>(true);


  useEffect(() => {
    setNoteTypeList(route?.params?.data);
    const selectedInd = route?.params?.data?.findIndex(
      (val: any) => val.id == route?.params?.selected?.id,
    );
    if (selectedInd != -1) setCurrChkInd(selectedInd);
    setLoader(false);
  }, [route?.params]);


  const renderNoteTypes = (item: Item, index: number) => {
    return (
      <View style={{ marginHorizontal: 1 }} >
        <OutlineBtn
          key={index}
          text={item.text}
          widthLength={WINDOW_WIDTH * 0.25}
          // onPress={() => handleType(item, index)}
          onPress={() => setCurrChkInd(index)}
          border
          backColor={colors.card}
          textColor={colors.text}
          highlight={index == currChkInd ? true : false}
        />
      </View>
    );
  };

  return (
    <ModalView>
      {noteTypeList?.length > 0 && <>
        <ModalHeader empty>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              width: '100%',
            }}>
            {noteTypeList.map(renderNoteTypes)}
          </ScrollView>
        </ModalHeader>
        {/* <SingleLineField title="Flag" showRightSwitch /> */}
        <MultiLineField title="Compose Note" />
      </>}
      {loader && <SimpleLoader />}
    </ModalView>
  );
}

const styles = StyleSheet.create({});
