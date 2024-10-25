import {AuthHeader} from 'components/index';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import Image from 'theme/Image';
import Layout from 'theme/Layout';
import {styles} from './style';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 30,
            marginTop: 50,
          }}>
          <View style={[Layout.row]}>
            <Text style={styles.promptText}>Or continue with </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.LoginWithGoogle);
              }}
              style={{borderBottomColor: '#264FD3', borderBottomWidth: 1}}>
              <Text style={[styles.promptText]}>Google</Text>
            </TouchableOpacity>
          </View>
          <View style={[Layout.row]}>
            <Text style={styles.promptText}>You do not have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.Register);
              }}
              style={{borderBottomColor: '#264FD3', borderBottomWidth: 1}}>
              <Text style={[styles.promptText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={[Layout.row]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.ChangePasswordScreen);
              }}
              style={{borderBottomColor: '#264FD3', borderBottomWidth: 1}}>
              <Text style={[styles.promptText]}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default LoginScreen;
