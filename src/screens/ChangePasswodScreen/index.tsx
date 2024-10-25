import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Image from 'theme/Image';
import Layout from 'theme/Layout';
import AuthHeader from 'components/AuthHeader';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import ScreenName from 'constant/ScreenName';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import {styles} from './style';
import {useState} from 'react';

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
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
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

        <View
          style={{
            marginBottom: 50,
            width: '100%',
          }}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: ScreenName.Login}],
              });
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
              }}>
              Reset password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default ChangePasswordScreen;
