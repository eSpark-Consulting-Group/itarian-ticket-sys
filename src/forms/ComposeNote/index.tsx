import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';

import {
  FloatButton,
  ModalHeader,
  ModalView,
  OutlineBtn,
  SimpleLoader,
  SingleLineField,
} from '../../components';
import {WINDOW_WIDTH} from '../../constants';
import {NotesAdditionalButtons} from '../../constants/ButtonsList';
import {AdditionalButtons, NoteTypes} from '../../types';
import {stNotesList} from '../../constants/SelectionList';

export default function ComposeNote({route, navigation}: any) {
  const {colors, dark} = useTheme();
  const [noteTypeList, setNoteTypeList] = useState<NoteTypes[]>([]);
  const [currChkInd, setCurrChkInd] = useState<number | any>(0);
  const [loader, setLoader] = useState<boolean>(true);
  const [stack, setStack] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [showTimeSt, setShowTimeSt] = useState<boolean>(false);
  const [selectedStNote, setSelectedStNote] = useState(stNotesList[0]);
  const [notes, setNotes] = useState<string>('');
  const [flag, setFlag] = useState<boolean>(false);
  const showFlag = route?.params?.showFlag;
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    NotesAdditionalButtons,
  );

  useEffect(() => {
    setNoteTypeList(route?.params?.data);
    setLoader(false);
  }, []);

  useEffect(() => {
    setSelectedStNote(route?.params?.selected);
    setNotes(route?.params?.selected?.name);
    console.log('Received Params', route?.params);
  }, [route?.params?.selected]);

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = handlePress;
    tempArr[1].onPress = () => setShowTimeSt(true);
    setActionButtons(tempArr);
  };

  const handlePress = () => {
    navigation.navigate('Stack2', {
      screen: 'CstmItemSelector',
      params: {
        ...route?.params,
        from: 'ComposeNote',
        item: stNotesList[0].id,
        data: stNotesList,
        selected: selectedStNote,
        stack: 'Stack2',
        headerTitle: 'Standard Notes',
      },
    });
  };

  useEffect(() => {
    setStack(route?.params?.stack);
    setFrom(route?.params?.from);
  }, []);

  useEffect(() => {
    navigation?.setParams({
      ...route?.params,
      notes: notes,
      flag: flag,
      type: noteTypeList[currChkInd]?.text,
      stack: stack,
      from: from,
      showTime: showTimeSt,
    });
  }, [notes, showTimeSt, currChkInd]);

  useEffect(() => {
    updatePress();
  }, []);

  const renderNoteTypes = (item: NoteTypes, index: number) => {
    return (
      <View key={index} style={{marginHorizontal: 1}}>
        <OutlineBtn
          key={index}
          text={item.text}
          widthLength={WINDOW_WIDTH * (noteTypeList?.length > 3 ? 0.27 : 0.312)}
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
      {noteTypeList?.length > 0 && (
        <>
          <ModalHeader empty>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {noteTypeList.map(renderNoteTypes)}
              </ScrollView>
            </View>
          </ModalHeader>
          {showFlag && (
            <SingleLineField
              enable={false}
              showRightSwitch
              title="Flag"
              rightSwitchVal={flag}
              onChangeSwitch={() => setFlag(!flag)}
            />
          )}
          <SingleLineField
            mode="multiline"
            onChangeText={e => setNotes(e)}
            subTitle="Compose Note"
            title={notes}
            inputable
          />
          {showTimeSt && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: dark ? '#000000' : '#ffffff',
                marginVertical: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MCI name="check" color={'green'} size={20} />
                <Text style={{color: 'green'}}>
                  Time Stamp will be added on save
                </Text>
              </View>
              <>
                <TouchableOpacity onPress={() => setShowTimeSt(false)}>
                  <MCI name="close" color={colors.text} size={20} />
                </TouchableOpacity>
              </>
            </View>
          )}
        </>
      )}
      {loader && <SimpleLoader />}
      {!showFlag && <FloatButton AdditionalButtons={actionButtons} />}
    </ModalView>
  );
}
