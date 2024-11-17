import {AuthHeader, ImageView} from 'components';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';
import Image from 'theme/Image';
import {styles} from './style';
import {GlobalLoadingController} from 'components/GlobalLoading';
import {delay} from 'redux-saga/effects';
import GlobalModal, {GlobalModalController} from 'components/GlobalModal';

const _buttonHeight = 50;

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <NAvoidKeyboardScreen scrollEnabled={true}>
      <AuthHeader title="Login" titleStyle={{color: 'black'}} />
      <View className="flex-1 items-center p-4">
        <ImageView
          className="w-48 h-48 mb-14 mt-14"
          src={Image.jarvisIcon}
          resizeMode="contain"
        />

        <TextInput
          style={styles.input}
          className={`w-full h-12 border rounded-lg px-2 mb-6 text-lg h-[${_buttonHeight}px]`}
          placeholder="Username"
          placeholderTextColor={'#BDBDBD'}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          className={`w-full h-12 border border-gray-300 rounded-lg bg-gray-100 px-2 mb-5 text-lg h-[${_buttonHeight}px]`}
          placeholder="Password"
          placeholderTextColor={'#BDBDBD'}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          className={`mt-6 w-full h-12 bg-primary rounded-full justify-center items-center h-[${_buttonHeight}px]`}
          onPress={async () => {
            GlobalModalController.show({
              header: 'Login',
              message: 'Login successfully',
            });
            navigation.reset({
              index: 0,
              routes: [{name: ScreenName.MainNavigator}],
            });
          }}>
          <Text className="text-white text-lg font-semibold">Login</Text>
        </TouchableOpacity>

        <View className="flex-col items-center gap-8 mt-28">
          <View className="flex-row">
            <Text className="text-blue-700 text-lg font-semibold">
              Or continue with{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.LoginWithGoogle);
              }}
              className="border-b border-blue-700">
              <Text className="text-blue-700 text-lg font-semibold">
                Google
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <Text className="text-blue-700 text-lg font-semibold">
              You do not have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.Register);
              }}
              className="border-b border-blue-700">
              <Text className="text-blue-700 text-lg font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.ChangePasswordScreen);
              }}
              className="border-b border-blue-700">
              <Text className="text-blue-700 text-lg font-semibold">
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default LoginScreen;
