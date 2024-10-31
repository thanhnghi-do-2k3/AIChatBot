import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Colors, FontSize, Layout, Gutter} from 'theme';
import {FontSizeTemplate} from 'theme/FontSize';
import {Text} from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';

interface HeaderProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  leftComponent?: React.ReactNode;
  leftArrowColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  onBackPress?: () => void;
  allowGoBack?: boolean;
}

const Header = ({
  title,
  style,
  leftComponent,
  leftArrowColor,
  titleStyle,
  onBackPress,
  allowGoBack,
}: HeaderProps) => {
  const {canGoBack, goBack} = useNavigation();

  const handleGoBack = () => {
    goBack();
    onBackPress && onBackPress();
  };

  const renderBackBtn = () =>
    canGoBack() && allowGoBack ? (
      <TouchableOpacity
        onPress={handleGoBack}
        style={{marginLeft: 20, alignItems: 'center', justifyContent: 'center'}}
        hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}>
        {/* <Text style={{color: leftArrowColor ?? '#BDBDBD', fontSize: 30}}>
          x
        </Text> */}
        <Icon name="angle-left" size={30} color={leftArrowColor ?? '#BDBDBD'} />
      </TouchableOpacity>
    ) : null;

  return (
    <View
      style={[
        // Gutter.smallHPadding,
        Layout.center,
        Layout.row,
        style,
        styles.container,
      ]}>
      <View style={[Layout.alignItemsStart, styles.sideItem]}>
        {renderBackBtn()}
      </View>
      <View style={[styles.headerTitle, Layout.alignItemsCenter]}>
        <Text style={[styles.defaultTitle, titleStyle]}>{title}</Text>
      </View>
      <View style={[Layout.alignItemsEnd, styles.sideItem]}>
        {leftComponent}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  defaultTitle: {
    fontWeight: '600',
    fontSize: FontSizeTemplate.biggest,
    color: Colors.black,
  },
  sideItem: {flex: 1},
  headerTitle: {flex: 8},
});
