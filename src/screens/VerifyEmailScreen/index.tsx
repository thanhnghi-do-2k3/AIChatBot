import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import AuthHeader from 'components/AuthHeader';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import {styles} from './style';

interface Props {
  // Define your component's props here
}

const _buttonHeight = 50;

const VerifyEmailScreen: React.FC<Props> = ({navigation}: any) => {
  const [gmail, setGmail] = useState('');

  return (
    <NAvoidKeyboardScreen>
      <AuthHeader
        title="Verify Email"
        titleStyle={{
          color: 'black',
        }}
      />
      <View className="flex-1 items-center p-4 justify-between">
        <View className="w-full flex-1 items-center justify-center">
          <TextInput
            style={styles.input}
            className="w-full h-12 border border-gray-300 rounded-lg mb-8 px-2 bg-gray-100 text-base"
            placeholder="Enter verify code sent to your Gmail"
            placeholderTextColor="#BDBDBD"
            value={gmail}
            onChangeText={setGmail}
          />
        </View>

        <View className="w-full mb-12">
          <TouchableOpacity
            className={`mt-6 w-full h-12 bg-primary rounded-full justify-center items-center h-[${_buttonHeight}px]`}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: ScreenName.Login}],
              });
            }}>
            <Text className="text-white text-lg font-semibold">Verify</Text>
          </TouchableOpacity>

          <View className="flex-row self-center mt-5">
            <Text className="text-primary text-medium font-semibold">
              Have not received code?{' '}
            </Text>
            <TouchableOpacity className="border-b border-primary">
              <Text className="text-primary text-medium font-semibold">
                Send again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default VerifyEmailScreen;
