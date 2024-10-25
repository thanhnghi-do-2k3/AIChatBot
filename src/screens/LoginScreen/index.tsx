import {AuthHeader} from 'components/index';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Image from 'theme/Image';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <NAvoidKeyboardScreen>
      <AuthHeader title="Login" titleStyle={{color: 'black'}} />
      <View style={styles.container}>
        <FastImage
          source={Image.jarvisIcon}
          style={{width: 194, height: 194, marginBottom: 50, marginTop: 50}}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={'#BDBDBD'}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'#BDBDBD'}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate(ScreenName.Register);
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </NAvoidKeyboardScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
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
});

export default LoginScreen;
