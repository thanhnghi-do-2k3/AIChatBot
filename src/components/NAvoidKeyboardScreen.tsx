import * as React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDimensions from 'hooks/useDimension';
import {Colors, Layout} from 'theme';
import {View} from 'react-native';

interface ScreenProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  colorBg?: string;
}

const NAvoidKeyboardScreen = ({
  children,
  scrollEnabled = true,
  containerStyle,
  colorBg,
}: ScreenProps) => {
  return (
    <SafeAreaView
      style={[Layout.fill, colorBg && {backgroundColor: colorBg}]}
      edges={['top']}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        style={[Layout.fill, colorBg && {backgroundColor: colorBg}]}
        contentContainerStyle={[
          {flexGrow: 1},
          styles.container,
          containerStyle,
        ]}>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default NAvoidKeyboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
});
