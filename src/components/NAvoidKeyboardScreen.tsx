import * as React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDimensions from 'hooks/useDimension';
import {Colors, Layout} from 'theme';

interface ScreenProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  colorBg?: string;
}

const NAvoidKeyboardScreen = ({
  children,
  scrollEnabled = false,
  containerStyle,
  colorBg,
}: ScreenProps) => {
  return (
    <SafeAreaView
      style={[Layout.fill, colorBg && {backgroundColor: colorBg}]}
      edges={['top']}>
      <KeyboardAwareScrollView
        scrollEnabled={scrollEnabled}
        contentContainerStyle={[styles.container, Layout.fill, containerStyle]}>
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
