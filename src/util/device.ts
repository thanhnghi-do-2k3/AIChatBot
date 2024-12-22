import {Platform} from 'react-native';
import {deviceWidth} from './dimension';

export const isIOS = () => Platform.OS === 'ios';
export const isTablet = () => deviceWidth >= 768;
