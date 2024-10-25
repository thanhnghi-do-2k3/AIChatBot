import React from 'react';
import {View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import ScreenName from 'constant/ScreenName';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import {styles} from './style';
import {useState} from 'react';
import Header from 'components/Header';
import {AppNavigationRef} from 'navigation/index';

interface Props {
  // Define your component's props here
}

const ProfileScreen: React.FC<Props> = ({navigation}: any) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <NAvoidKeyboardScreen>
      <Header title="Profile" titleStyle={{color: 'black'}} />
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Not implemented yet</Text>
        </View>

        <View
          style={{
            marginBottom: 50,
            width: '100%',
          }}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              AppNavigationRef.current?.reset({
                index: 0,
                routes: [{name: 'Auth', screen: ScreenName.Login}],
              });
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
              }}>
              Go back to login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default ProfileScreen;
