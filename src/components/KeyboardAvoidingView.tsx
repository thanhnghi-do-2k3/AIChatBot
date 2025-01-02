import React from 'react';
import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

interface Props {
  children: React.ReactNode;
}

const KeyboardAvoidingView: React.FC<Props> = ({children}) => {
  return (
    // <TouchableWithoutFeedback
    //   onPress={() => {
    //     Keyboard.dismiss();
    //   }}>
    <RNKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={styles.container}>
      {children}
    </RNKeyboardAvoidingView>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardAvoidingView;
