import {StyleSheet} from 'react-native';

const _textInputBackground = '#F6F6F6';
const _textInputBorderColor = '#E8E8E8';
const _primaryColor = '#264FD3';

export const styles = StyleSheet.create({
  input: {
    borderColor: _textInputBorderColor,
    backgroundColor: _textInputBackground,
    // fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 5,
  },
});
