import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import ModalView from '../ModalView';
import EmptyListMsg from '../EmptyListMsg';
import FloatButton from '../FloatButton';
import {styles} from './styles';
import {AttachmentAdditionalButtons} from '../../constants/SampleArrays';
import {
  cameraPicker,
  documentPicker,
  imagePicker,
} from '../../utils/helperFunctions';
import {SingleLineField} from '../FormFields';
import moment from 'moment';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

export const Attachments = ({
  id = 0,
  navigation,
  route,
}: {
  id: number;
  navigation: any;
  route: any;
}) => {
  const [attachments, setAttachments] = useState([]);

  const onChooseImage = async () => {
    const image = await imagePicker({});
    if (image) {
      navigation.navigate('Stack2', {
        screen: 'AttachmentDetails',
        params: {
          from: 'Attachments',
          item: 'GoneTo',
          selected: {},
          stack: 'Stack2',
          file: {
            ...image,
            path: image.path,
            name: image?.path.split('/').pop(),
            type: image,
            date: moment(new Date().toDateString()).format('MMM DD, YYYY'),
          },
        },
      });
    }
  };

  const onTakePhoto = async () => {
    const image = await cameraPicker({});
    if (image) {
      navigation.navigate('Stack2', {
        screen: 'AttachmentDetails',
        params: {
          from: 'Attachments',
          item: 'GoneTo',
          selected: {},
          stack: 'Stack2',
          file: {
            ...image,
            path: image.path,
            name: image?.path.split('/').pop(),
            type: image,
            date: moment(new Date().toDateString()).format('MMM DD, YYYY'),
          },
        },
      });
    }
  };

  const onAddFile = async () => {
    const file = await documentPicker({});
    if (file) {
      navigation.navigate('Stack2', {
        screen: 'AttachmentDetails',
        params: {
          from: 'Attachments',
          item: 'GoneTo',
          selected: {},
          stack: 'Stack2',
          file: {
            ...file,
            path: file.uri,
            name: file.name,
            date: moment(new Date().toDateString()).format('MMM DD, YYYY'),
            type: 'file',
          },
        },
      });
    }
  };

  useEffect(() => {
    AttachmentAdditionalButtons[0].onPress = onAddFile;
    AttachmentAdditionalButtons[1].onPress = onChooseImage;
    AttachmentAdditionalButtons[2].onPress = onTakePhoto;
  }, []);

  useEffect(() => {
    if (route?.params?.file) {
      let data: any = [...attachments];
      data.push(route?.params?.file);
      setAttachments(data);
    }
  }, [route?.params]);

  return (
    <ModalView>
      <FlatList
        data={attachments}
        renderItem={({item, index}: any) => {
          return (
            <SingleLineField
              enable={false}
              title={` ${item?.description || '-'} \n Last Updated ${
                item?.date
              }`}
              leftChild={
                item?.type != 'file' ? (
                  <Image
                    source={{uri: item.path}}
                    style={{height: 40, width: 40}}
                  />
                ) : (
                  <MCI name={'file-document'} color={'#8585858a'} size={40} />
                )
              }
            />
          );
        }}
        ListEmptyComponent={<NotFound />}
      />
      <FloatButton AdditionalButtons={AttachmentAdditionalButtons} />
    </ModalView>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg iconName="image" label="Attachments" />
    </View>
  );
};
