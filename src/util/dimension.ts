import {Dimensions, PixelRatio} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const getFontScaledSize = (size: any) =>
  size / PixelRatio.getFontScale();

// dp(123) converts 123px (px as in your mockup design) to dp.
export const dp = (px: number) => px / PixelRatio.get();
