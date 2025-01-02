import LottieView from 'lottie-react-native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Lottie from 'theme/Lottie';

const ErrorScreen: React.FC = ({error, resetError}: any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <LottieView
        source={Lottie.errorAnimation}
        autoPlay
        loop
        style={{width: 200, height: 200, alignSelf: 'center'}}
      />
      <View>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: 'red',
          }}>
          Oops!
        </Text>
        <Text
          style={{
            fontSize: 24,
          }}>
          There is something wrong !!!
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#28C68B',
          padding: 10,
          borderRadius: 20,
          marginTop: 40,
        }}
        onPress={async () => {
          resetError();
        }}>
        <Text>Quay lại trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;
