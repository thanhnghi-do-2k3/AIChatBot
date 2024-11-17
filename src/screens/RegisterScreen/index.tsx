import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import AuthHeader from 'components/AuthHeader';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import {styles} from './style';
import useAppDispatch from 'hooks/useAppDispatch';
import {authActions} from 'features/auth/reducer';

interface Props {
  // Define your component's props here
}

const _buttonHeight = 50;

const RegisterScreen: React.FC<Props> = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useAppDispatch();

  return (
    <NAvoidKeyboardScreen>
      <AuthHeader title="Sign Up" titleStyle={{color: 'black'}} />
      <View className="flex-1 items-center p-4 mt-12 justify-between">
        <View className="w-full items-center flex-1">
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#BDBDBD"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#BDBDBD"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#BDBDBD"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#BDBDBD"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            className={`mt-6 w-full h-12 bg-primary rounded-full justify-center items-center h-[${_buttonHeight}px]`}
            onPress={() => {
              const registerPayload = {
                data: {
                  username: name,
                  email: email,
                  password: password,
                },
              };

              dispatch(authActions.registerRequest(registerPayload));

              navigation.reset({
                index: 0,
                routes: [{name: ScreenName.Login}],
              });
            }}>
            <Text className="text-white text-lg font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-col items-center gap-8 mb-12">
          <View className="flex-row">
            <Text className="text-blue-700 text-medium font-semibold">
              Or continue with{' '}
            </Text>
            <TouchableOpacity className="border-b border-blue-700">
              <Text className="text-blue-700 text-medium font-semibold">
                Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default RegisterScreen;
