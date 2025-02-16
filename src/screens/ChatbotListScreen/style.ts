import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // padding: 16,
  },
  input: {
    width: '100%',
    borderColor: '#E8E8E8',
    borderRadius: 8,
    borderWidth: 1,
    // height: 40,
    paddingHorizontal: 8,
    // paddingVertical: 8,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 24,
    width: '100%',
    height: 50,
    backgroundColor: '#264FD3',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptText: {
    color: '#264FD3',
    fontSize: 16,
    fontWeight: '600',
  },
});
