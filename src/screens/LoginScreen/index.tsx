import {GradientBorderView} from '@good-react-native/gradient-border';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import {authActions} from 'features/auth/reducer';
import {useFormik} from 'formik';
import useAppDispatch from 'hooks/useAppDispatch';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Lottie from 'theme/Lottie';
import * as Yup from 'yup';

const _buttonHeight = 50;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: Yup.string()
    .min(6, 'Mật khẩu có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
});

const LoginScreen = ({navigation}: any) => {
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
  const [isLoginPressed, setIsLoginPressed] = React.useState(false);
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: validationSchema,
    onSubmit: async values => {
      console.log('on submit');
      const LoginPayload: LoginPayload = {
        data: {
          email: values.email,
          password: values.password,
        },
        action: {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: 'Login successfully',
              visibilityTime: 1000,
            });
            navigation.navigate(ScreenName.MainNavigator, {
              screen: ScreenName.Home,
            });
          },
          onFailure: (error: any) => {
            Toast.show({
              type: 'error',
              text1: 'Login failed',
              text2: error?.data?.details?.[0].issue,
              visibilityTime: 1000,
            });
          },
        },
      };
      dispatch(authActions.loginRequest(LoginPayload));
    },
  });

  const dispatch = useAppDispatch();

  return (
    <NAvoidKeyboardScreen scrollEnabled={true}>
      {/* <AuthHeader title="Login" titleStyle={{color: 'black'}} /> */}
      <View
        className="flex-1 items-center justify-between w-full"
        style={{
          paddingHorizontal: 20,
          paddingVertical: 40,
        }}>
        {/* <ImageView
          className="w-48 h-48 mb-14 mt-14"
          src={Image.jarvisIcon}
          resizeMode="contain"
        /> */}
        <LottieView
          source={Lottie.loggingAnimation}
          autoPlay
          loop
          style={{width: 350, height: 240}}
        />

        {/* <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 32,
            marginTop: 16,
          }}>
          LOGIN
        </Text> */}

        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <Input
            errorMessage={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ''
            }
            label="Email"
            labelStyle={{
              color: '#BDBDBD',
              fontSize: 16,
              marginLeft: 5,
              marginBottom: 5,
            }}
            placeholder="Enter your email"
            placeholderTextColor={'#BDBDBD'}
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
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

          <Input
            containerStyle={{marginTop: 20, marginBottom: 20}}
            errorMessage={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ''
            }
            label="Password"
            labelStyle={{
              color: '#BDBDBD',
              fontSize: 16,
              marginLeft: 5,
              marginBottom: 5,
            }}
            placeholder="Enter your password"
            placeholderTextColor={'#BDBDBD'}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry={!isPasswordVisible}
            leftIcon={{
              type: 'font-awesome',
              name: 'lock',
              color: '#BDBDBD',
            }}
            rightIcon={{
              type: 'font-awesome',
              name: isPasswordVisible ? 'eye-slash' : 'eye',
              color: '#BDBDBD',
              onPress: () => setPasswordVisible(!isPasswordVisible),
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

          {/* <GradientBorderView
            gradientProps={{
              colors: isLoginPressed
                ? ['transparent']
                : ['#4c669f', '#3b5998', '#192f6a'],
            }}
            style={{
              width: '50%',
              height: _buttonHeight,
              borderRadius: 999,
              borderWidth: 1,
              overflow: 'hidden',
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPressIn={() => setIsLoginPressed(true)}
              onPressOut={() => setIsLoginPressed(false)}
              onPress={() => {
                formik.submitForm();
              }}>
              <Text
                className="text-blue text-lg font-semibold"
                style={{
                  color: '#4c669f',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </GradientBorderView> */}

          <TouchableOpacity
            onPress={formik.submitForm}
            className="border-b border-blue-700">
            <Text className="text-blue-700 text-lg font-semibold">Google</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-col items-center gap-8 mt-28">
          <View className="flex-row">
            <Text className="text-blue-700 text-lg font-semibold">
              Or continue with{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.LoginWithGoogle);
              }}
              className="border-b border-blue-700">
              <Text className="text-blue-700 text-lg font-semibold">
                Google
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <Text className="text-blue-700 text-lg font-semibold">
              You do not have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.Register);
              }}
              className="border-b border-blue-700">
              <Text className="text-blue-700 text-lg font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.ChangePasswordScreen);
              }}
              className="border-b border-blue-700">
              <Text className="text-blue-700 text-lg font-semibold">
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default LoginScreen;
