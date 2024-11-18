import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginTop: 50,
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    paddingHorizontal: 8,
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
  label: {
    marginLeft: 4,
    marginBottom: 4,
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#000000',
    opacity: 0.5,
  },
  error: {
    alignSelf: 'flex-start',
    color: 'red',
    fontSize: 12,
    marginLeft: 4,
    marginBottom: 4,
  },
});
