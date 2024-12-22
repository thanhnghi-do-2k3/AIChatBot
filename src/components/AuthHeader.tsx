import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome5';

interface DefaultContentProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  leftComponent?: React.ReactNode;
  leftArrowColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  onBackPress?: () => void;
}

const DefaultContent = ({
  title,
  style,
  leftComponent,
  leftArrowColor,
  titleStyle,
  onBackPress,
}: DefaultContentProps) => {
  const {canGoBack, goBack} = useNavigation();

  const handleGoBack = () => {
    goBack();
    onBackPress && onBackPress();
  };

  const renderBackBtn = () =>
    canGoBack() ? (
      <TouchableOpacity
        onPress={handleGoBack}
        style={{marginLeft: 20, alignItems: 'center', justifyContent: 'center'}}
        hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}>
        {/* <Text style={{color: leftArrowColor ?? '#BDBDBD', fontSize: 30}}>
          x
        </Text> */}
        <Icon name="times" size={25} color={leftArrowColor ?? '#BDBDBD'} />
      </TouchableOpacity>
    ) : null;

  return (
    <View
      className="flex-row items-center justify-center"
      style={[style, styles.container]}>
      <View className="row items-start" style={styles.sideItem}>
        {renderBackBtn()}
      </View>
      <View
        className="row items-center justify-center"
        style={[styles.headerTitle]}>
        <Text
          className="font-semibold text-headerTittle text-black"
          style={titleStyle}>
          {title}
        </Text>
      </View>
      <View className="row items-end" style={styles.sideItem}>
        {leftComponent}
      </View>
    </View>
  );
};

export default DefaultContent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  sideItem: {flex: 1},
  headerTitle: {flex: 8},
});
