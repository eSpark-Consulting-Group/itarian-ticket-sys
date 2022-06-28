import {View, Text, TouchableOpacity, ViewProps, FlatList} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Switch, TextInput} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import II from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../theme/colors';

const ModalForm = () => {
  const {colors}: Theme = useTheme();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const componentData = [
    {
      type: 'inline',
      data: {
        content_1: 'Amount',
        content_2: '0.00',
      },
    },
    {
      type: 'inline-icon',
      data: {
        content_1: 'Add Resource',
      },
    },
    {
      type: 'inline-switch',
      data: {
        content_1: 'Are you out of the office?',
      },
    },
    {
      type: 'block',
      data: {
        content_1: 'Agile Financial',
        content_2: 'ABC Street, USA',
      },
    },
    {
      type: 'iconBlock',
      data: {
        icon: 'business',
        content_1: 'Agile Financial',
        content_2: 'ABC Street, USA',
      },
    },
    {
      type: 'iconBlock',
      data: {
        icon: 'person',
        content_1: 'Johnny Bravo',
      },
    },
    {
      type: 'multiline',
      data: {
        content_1: 'Additional Info',
      },
    },
  ];

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const ParallelContainer = (props: ViewProps) => {
    return <View {...props}>{props.children}</View>;
  };

  const checkType = (type: any) => {
    let containerStyle = {};
    const getBlock = () => {
      containerStyle = styles.blockDisplay;
    };
    const getInline = () => {
      containerStyle = styles.inllineDisplay;
    };
    const getMultiline = () => {
      containerStyle = styles.multilineDisplay;
    };

    switch (type) {
      case 'inline':
        getBlock();
        break;
      case 'inline-icon':
        getBlock();
        break;
      case 'inline-switch':
        getBlock();
        break;
      case 'block':
        getInline();
        break;
      case 'iconBlock':
        getInline();
        break;
      case 'multiline':
        getMultiline();
        break;

      default:
        break;
    }
    return containerStyle;
  };

  const checkContentType = (type: any, data: any) => {
    let contentType;

    const getBlockContent = () => {
      contentType = (
        <>
          <Text style={{color: colors.text}}>{data.content_1}</Text>
          <Text
            style={{color: colors.text, fontWeight: 'bold', marginRight: 20}}>
            {data.content_2}
          </Text>
        </>
      );
    };

    const getBlockIconContent = () => {
      contentType = (
        <>
          <Text style={{color: colors.text}}>{data.content_1}</Text>
          <TouchableOpacity
            style={{
              borderRadius: 1000,
              borderWidth: 1,

              width: moderateScale(40, 0),
              height: moderateScale(40, 0),
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MCI name="table-large-plus" size={moderateScale(20, 0)} />
          </TouchableOpacity>
        </>
      );
    };

    const getBlockSwitchContent = () => {
      contentType = (
        <>
          <Text style={{color: colors.text, fontWeight: 'bold'}}>
            {data.content_1}
          </Text>
          <Switch
            value={isSwitchOn}
            style={{marginRight: 5}}
            color={colors.primary}
            thumbColor={colors.primary}
            onValueChange={onToggleSwitch}
            trackColor={{true: '#5b57578f', false: '#5b57578f'}}
          />
        </>
      );
    };

    const getInlineContent = () => {
      contentType = (
        <>
          <Text style={{color: colors.text}}>{data.content_1}</Text>
          <Text style={{color: colors.text, fontWeight: 'bold'}}>
            {data.content_2}
          </Text>
        </>
      );
    };

    const getIconInlineContent = () => {
      contentType = (
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <II name={data.icon} size={15} />
            <Text
              style={{color: colors.text, fontWeight: 'bold', marginLeft: 10}}>
              {data.content_1}
            </Text>
          </View>
          {data.content_2 && (
            <Text style={{color: colors.text, marginLeft: 25}}>
              {data.content_2}
            </Text>
          )}
        </>
      );
    };

    const getMultilineContent = () => {
      contentType = (
        <>
          <Text>{data.content_1}</Text>
          <TextInput
            mode="outlined"
            multiline
            style={{flex: 0.9}}
            theme={{colors: {primary: colors.primary}}}
          />
        </>
      );
    };

    switch (type) {
      case 'inline':
        getBlockContent();
        break;
      case 'inline-icon':
        getBlockIconContent();
        break;
      case 'inline-switch':
        getBlockSwitchContent();
        break;
      case 'block':
        getInlineContent();
        break;
      case 'iconBlock':
        getIconInlineContent();
        break;
      case 'multiline':
        getMultilineContent();
        break;

      default:
        break;
    }

    return contentType;
  };

  return (
    <FlatList
      data={componentData}
      renderItem={({item}) => {
        return (
          <ParallelContainer style={checkType(item.type)}>
            {checkContentType(item.type, item.data)}
          </ParallelContainer>
        );
      }}
    />
  );
};

export default ModalForm;
