import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import AuthHeader from 'components/AuthHeader';
import ScreenName from 'constant/ScreenName';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import {styles} from './style';

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
          <TextInput
            style={styles.input}
            className="w-full h-12 border border-gray-300 rounded-lg mb-7 px-2 bg-gray-100 text-base text-gray-700"
            placeholder="Enter your Gmail"
            placeholderTextColor="#BDBDBD"
            value={gmail}
            onChangeText={setGmail}
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
