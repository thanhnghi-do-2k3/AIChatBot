import * as React from 'react';
import {
  KeyboardAvoidingView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
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
  scrollEnabled = false,
  containerStyle,
  colorBg,
}: ScreenProps) => {
  return (
    <SafeAreaView
      style={[Layout.fill, colorBg && {backgroundColor: colorBg}]}
      edges={['top']}>
      {scrollEnabled ? (
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
          style={[colorBg && {backgroundColor: colorBg}]}
          contentContainerStyle={[
            {flexGrow: 1},
            styles.container,
            containerStyle,
          ]}>
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <KeyboardAvoidingView
          style={[{flex: 1}, colorBg && {backgroundColor: colorBg}]}
          contentContainerStyle={[
            {flexGrow: 1},
            styles.container,
            containerStyle,
          ]}>
          {children}
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default NAvoidKeyboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
});
