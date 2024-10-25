import Colors from './Colors';
import {StyleSheet} from 'react-native';

export const FontSizeTemplate = {
  extraLarge: 24,
  large: 19,
  medium: 17,
  regular: 15,
  small: 13,
  extraSmall: 11,
  biggest: 34,
};

const FontSize = StyleSheet.create({
  textSemiBold: {
    fontWeight: '600',
  },
  textSmall: {
    fontSize: FontSizeTemplate.small,
  },
  textMedium: {
    fontSize: FontSizeTemplate.medium,
  },
  textRegular: {
    fontSize: FontSizeTemplate.regular,
  },
  textLarge: {
    fontSize: FontSizeTemplate.large,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  titleSmall: {
    fontSize: FontSizeTemplate.small * 1.5,
    fontWeight: 'bold',
  },
  titleRegular: {
    fontSize: FontSizeTemplate.regular * 2,
    fontWeight: 'bold',
  },
  titleLarge: {
    fontSize: FontSizeTemplate.large * 2,
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  textError: {
    color: Colors.error,
  },
  textSuccess: {
    color: Colors.success,
  },
  textLobster: {
    fontFamily: 'lobster',
    fontWeight: 'normal',
  },
  whiteText: {
    color: Colors.white,
  },
});

export default FontSize;
