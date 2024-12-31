import AuthHeader from 'components/AuthHeader';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';

interface Props {
  // Define your component's props here
}

const LoginWithGoogleScreen: React.FC<Props> = ({navigation}: any) => {
  const [gmail, setGmail] = useState('');

  return (
    <NAvoidKeyboardScreen>
      <AuthHeader title="Login with Google" titleStyle={{color: 'black'}} />
      <View className="flex-1 items-center px-4 justify-between">
        <View className="w-full flex-1 items-center justify-center">
          <Input
            label="Email"
            labelStyle={{
              color: '#BDBDBD',
              fontSize: 16,
              marginLeft: 5,
              marginBottom: 5,
            }}
            placeholder="Enter your email"
            placeholderTextColor={'#BDBDBD'}
            value={gmail}
            onChangeText={setGmail}
            leftIcon={{
              type: 'font-awesome',
              name: 'inbox',
              color: '#BDBDBD',
            }}
            inputStyle={{
              marginLeft: 10,
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#F5F5F5',
              borderRadius: 20,
            }}
          />
        </View>

        <View className="w-full mb-12">
          <TouchableOpacity
            className={`mt-6 w-full h-12 bg-primary rounded-full justify-center items-center h-[50px]`}
            onPress={() => {
              navigation.navigate(ScreenName.VerifyEmailScreen);
            }}>
            <Text className="text-white text-lg font-semibold">
              Send verify code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default LoginWithGoogleScreen;
