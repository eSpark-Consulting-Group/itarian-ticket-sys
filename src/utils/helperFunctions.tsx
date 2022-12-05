import {Linking, Platform} from 'react-native';
import {
  AppInstalledChecker,
  // @ts-ignore
} from 'react-native-check-app-install';
import * as ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
import {ShortcutItem} from 'react-native-quick-actions';
import {showMessage} from 'react-native-flash-message';
import {NoteTypes, SelectFields} from '../types';
import {Buffer} from 'buffer';
import {alert_Dur} from '../constants';

export const getNavigtionApps = async () => {
  const Androidpackages = [
    {package: 'com.waze', name: 'Waze'},
    {package: 'com.google.android.apps.maps', name: 'Google Maps'},
  ];
  const arr: any = [];
  for (let index = 0; index < Androidpackages.length; index++) {
    const element: any = Androidpackages[index];
    const isInstalled = await AppInstalledChecker.checkPackageName(
      element.package,
    );
    if (isInstalled) {
      arr.push(element);
    }
  }
  return arr;
};

export const redirectToMap = (
  lat: any = 12.123,
  lng: any = -12.12312,
  defaultNav: string,
) => {
  const scheme =
    defaultNav == 'Waze'
      ? Platform.select({ios: 'maps:0,0?q=', android: 'waze://?ll='})
      : Platform.select({
          ios: 'maps:0,0?q=',
          android: 'https://www.google.com/maps/search/?api=1&query=',
        });

  const latLng = `${lat},${lng}`;
  const url: any = Platform.select({
    ios: `https://www.google.com/maps/search/?api=1&center=${lat},${lng}`,
    android: `${scheme}${latLng}`,
  });
  console.log('url', url);
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        var browser_url: any = 'https://www.google.de/maps/@' + lat + ',' + lng;
        return Linking.openURL(browser_url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.log('error', err));
};

export const imagePicker = async ({
  multiple = false,
  cropping = false,
  maxFiles = 10,
}) => {
  try {
    const result = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: cropping,
      multiple: multiple,
      compressImageQuality: 0.5,
      maxFiles,
      mediaType: 'photo',
    });
    return result;
  } catch (error) {
    console.log('imagePicker error', error);
  }
};

export const documentPicker = async () => {
  try {
    const result = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
      type: [
        types.pdf,
        types.docx,
        types.xls,
        types.xlsx,
        types.csv,
        types.doc,
        types.plainText,
      ],
    });
    return result;
  } catch (error) {
    console.log('documentPicker error', error);
  }
};

export const cameraPicker = async ({cropping = false}) => {
  try {
    const result = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: cropping,
      compressImageQuality: 0.5,
    });
    return result;
  } catch (error) {
    console.log('cameraPicker error', error);
  }
};

export const searchFromArray = async ({
  text,
  list = [],
  keys = [],
}: {
  text: string;
  list: any;
  keys: any;
}) => {
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource
    const newData = list?.filter((item: any) => {
      const itemData = keys
        ?.map((value: any) => `${item[value]?.toUpperCase()}`)
        ?.join(' ');
      const textData = text.toUpperCase();
      return itemData?.indexOf(textData) > -1;
    });
    return newData;
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    return list;
  }
};

export const getDatesInRange = (startDate: any, endDate: any) => {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

export const handleColdBoot = (data: ShortcutItem) => {
  const {userInfo} = data;
  Linking.openURL(userInfo?.url);
};

export const checkValidations = async (
  navigation: any,
  route: any,
  globalStates: any,
  apiCall?: any,
  data?: any,
) => {
  const Info = [...route?.params?.data];
  for (let i = 0; i < Info.length; i++) {
    if (
      Info[i].isRequired &&
      (Info[i].title == 'Please Select' || Info[i].title == '')
    ) {
      showMessage({
        message: 'Please fill required fields',
        type: 'warning',
        icon: 'auto',
        duration: alert_Dur,
      });
      return;
    }
  }

  try {
    const result = await apiCall(data)
    if(result?.status) {
      showMessage({
        message: 'Item added Successfully',
        type: 'success',
        icon: 'auto',
        duration: alert_Dur,
      });
      // console.log('Error Not Founded');
      navigation.goBack();
    }else {
      showMessage({
        message: result?.message?.toString(),
        type: 'danger',
        icon: 'auto',
        duration: alert_Dur,
      });
    }
  } catch (error) {
    
  }
};

export const selectStandardNote = (
  navigation: any,
  route: any,
  notesList: SelectFields[],
  selectedNote: object,
) => {
  navigation.navigate('Stack2', {
    screen: 'CstmItemSelector',
    params: {
      ...route?.params,
      from: 'ComposeNote',
      item: notesList[0].id,
      data: notesList,
      selected: selectedNote,
      stack: 'Stack2',
      headerTitle: 'Standard Notes',
    },
  });
};

export const SelectItems = (
  item: any,
  index: number,
  navigation: any,
  route: any,
  from: string,
  stack: string,
) => {
  if (item?.list) {
    navigation.navigate('Stack2', {
      screen: 'CstmItemSelector',
      params: {
        ...route?.params,
        from: from,
        item: index,
        data: item.list,
        selected: item.selectedItem,
        stack: stack,
        title: route?.params?.title,
        headerTitle: item.headerTitle,
        searchable: item.searchable,
      },
    });
  }
};

export const handleAddNote = (
  navigation: any,
  route: any,
  data: NoteTypes[],
  from: string,
  stack: string,
  flag?: boolean,
) => {
  navigation.navigate('Stack2', {
    screen: 'ComposeNote',
    params: {
      from: from,
      item: 'GoneTo',
      data: data,
      stack: stack,
      showFlag: flag,
      title: route?.params?.title, // used for Dynamic Headers Used
      headerTitle: 'Note Type',
      status: route?.params?.status,
    },
  });
};

export const encodedUserDataToken = (subDomain: string, apiKey: string) => {
  return Buffer.from(`${subDomain}:${apiKey}`, 'binary').toString('base64');
};

export const dataFormatter = (array: any = []) => {
  var dataObj: any = {};
  [...array]?.map(val => {
    dataObj[val?.subTitle?.replace(' ', '') ?? val?.title.replace(' ', '')] =
      !val?.subTitle
        ? val?.rightSwitchVal
        : val?.selectedItem
        ? val?.selectedItem
        : val?.title;
  });
  return dataObj;
};
