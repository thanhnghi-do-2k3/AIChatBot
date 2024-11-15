import * as React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'theme';

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
      className="flex-1"
      style={[styles.container, colorBg && {backgroundColor: colorBg}]}
      edges={['top']}>
      {scrollEnabled ? (
        <KeyboardAwareScrollView
          className="flex-1"
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
          className="flex-1"
          style={[colorBg && {backgroundColor: colorBg}]}
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
