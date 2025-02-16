import AuthHeader from 'components/AuthHeader';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './style';

interface Props {
  // Define your component's props here
}

const ChangePasswordScreen: React.FC<Props> = ({navigation}: any) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <NAvoidKeyboardScreen>
      <AuthHeader title="Change password" titleStyle={{color: 'black'}} />
      <View style={styles.container}>
        <View className="flex-1 items-center justify-center w-full">
          <TextInput
            style={styles.input}
            placeholder="Enter your new passwrod"
            placeholderTextColor={'#BDBDBD'}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            placeholderTextColor={'#BDBDBD'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <View className="w-full mb-12">
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: ScreenName.Login}],
              });
            }}>
            <Text className="text-white text-medium font-semibold">
              Reset password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default ChangePasswordScreen;
