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

const VerifyEmailScreen: React.FC<Props> = ({navigation}: any) => {
  const [gmail, setGmail] = useState('');

  return (
    <NAvoidKeyboardScreen>
      <AuthHeader title="Verify Email" titleStyle={{color: 'black'}} />
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
            placeholder="Enter verify code sent to your Gmail"
            placeholderTextColor={'#BDBDBD'}
            value={gmail}
            onChangeText={setGmail}
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
              Verify
            </Text>
          </TouchableOpacity>

          <View style={[Layout.row, {alignSelf: 'center', marginTop: 20}]}>
            <Text style={styles.promptText}>Have not received code? </Text>
            <TouchableOpacity
              onPress={() => {}}
              style={{borderBottomColor: '#264FD3', borderBottomWidth: 1}}>
              <Text style={[styles.promptText]}>Send again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default VerifyEmailScreen;
