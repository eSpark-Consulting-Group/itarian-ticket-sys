import { Linking, Platform } from 'react-native';
// @ts-ignore
import { AppInstalledChecker, CheckPackageInstallation } from 'react-native-check-app-install';

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


export const redirectToMap = (lat: any = 12.123, lng: any= -12.12312, defaultNav: string) => {
    const scheme = defaultNav == "Waze" ? 
    Platform.select({ ios: 'maps:0,0?q=', android: 'waze://?ll=' }): 
    Platform.select({ ios: 'maps:0,0?q=', android: 'https://www.google.com/maps/search/?api=1&query=' }) 
    
    const latLng = `${lat},${lng}`
    const url: any = Platform.select({
      ios: `https://www.google.com/maps/search/?api=1&center=${lat},${lng}`,
      android: `${scheme}${latLng}`
    })
    console.log("url", url)
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          var browser_url: any = 'https://www.google.de/maps/@' + lat + ',' + lng
          return Linking.openURL(browser_url)
        } else {
          return Linking.openURL(url)
        }
      })
      .catch(err => console.log('error', err))
  }