import {AuthHeader, ImageView} from 'components';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import {authActions} from 'features/auth/reducer';
import {useFormik} from 'formik';
import useAppDispatch from 'hooks/useAppDispatch';
import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Image from 'theme/Image';
import * as Yup from 'yup';
import {styles} from './style';

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
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: validationSchema,
    onSubmit: async values => {
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
      <AuthHeader title="Login" titleStyle={{color: 'black'}} />
      <View className="flex-1 items-center p-4">
        <ImageView
          className="w-48 h-48 mb-14 mt-14"
          src={Image.jarvisIcon}
          resizeMode="contain"
        />

        <TextInput
          style={[
            styles.input,
            {
              borderColor:
                formik.touched.email && formik.errors.email ? 'red' : 'gray',
              marginBottom:
                formik.touched.email && formik.errors.email ? 0 : 16,
            },
          ]}
          className={`w-full h-12 border rounded-lg px-2 text-lg h-[${_buttonHeight}px]`}
          placeholder="Username"
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
        />

        {formik.touched.email && formik.errors.email ? (
          <Text style={styles.error}>{formik.errors.email}</Text>
        ) : null}

        <TextInput
          style={[
            styles.input,
            {
              borderColor:
                formik.touched.email && formik.errors.email ? 'red' : 'gray',
              marginBottom:
                formik.touched.email && formik.errors.email ? 0 : 16,
            },
          ]}
          className={`w-full h-12 border border-gray-300 rounded-lg bg-gray-100 px-2 text-lg h-[${_buttonHeight}px]`}
          placeholder="Password"
          placeholderTextColor={'#BDBDBD'}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
        />

        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.error}>{formik.errors.password}</Text>
        ) : null}

        <TouchableOpacity
          className={`mt-6 w-full h-12 bg-primary rounded-full justify-center items-center h-[${_buttonHeight}px]`}
          onPress={formik.submitForm}>
          <Text className="text-white text-lg font-semibold">Login</Text>
        </TouchableOpacity>

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
