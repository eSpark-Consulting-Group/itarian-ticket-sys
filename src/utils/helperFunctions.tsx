import {Linking, Platform} from 'react-native';
import {
  AppInstalledChecker,
  // @ts-ignore
} from 'react-native-check-app-install';
import * as ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker, {types} from 'react-native-document-picker';

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

export const documentPicker = async ({}) => {
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
  text = '',
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
      const textData = text?.toUpperCase();
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
