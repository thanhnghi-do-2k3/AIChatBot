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

const RegisterScreen: React.FC<Props> = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <NAvoidKeyboardScreen>
      <AuthHeader title="Sign Up" titleStyle={{color: 'black'}} />
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={'#BDBDBD'}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
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
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor={'#BDBDBD'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 30,
            marginBottom: 50,
          }}>
          <View style={[Layout.row]}>
            <Text style={styles.promptText}>Or continue with </Text>
            <TouchableOpacity
              style={{borderBottomColor: '#264FD3', borderBottomWidth: 1}}>
              <Text style={[styles.promptText]}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default RegisterScreen;
