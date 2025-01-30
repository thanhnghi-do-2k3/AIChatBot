import AuthHeader from 'components/AuthHeader';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import {authActions} from 'features/auth/reducer';
import {useFormik} from 'formik';
import useAppDispatch from 'hooks/useAppDispatch';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

interface Props {
  // Define your component's props here
}

const _buttonHeight = 50;

const validationSchema = Yup.object({
  name: Yup.string().required('Vui lòng nhập tên'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 ký tự hoa')
    .matches(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Mật khẩu phải có ít nhất 1 ký tự đặc biệt',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
    .required('Vui lòng nhập lại mật khẩu'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterScreen: React.FC<Props> = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      const registerPayload: RegisterPayload = {
        data: {
          username: values.name,
          email: values.email,
          password: values.password,
        },
        action: {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: 'Register success',
              visibilityTime: 2000,
            } as any);

            navigation.reset({
              index: 0,
              routes: [{name: ScreenName.Login}],
            });
          },
          onFailure: (error: any) => {
            Toast.show({
              type: 'error',
              text1: 'Register failed! Please try again',
              text2: error?.data?.details?.[0]?.issue,
              autoHide: false,
            } as any);
          },
        },
      };

      dispatch(authActions.registerRequest(registerPayload));
    },
  });

  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(false);

  return (
    <NAvoidKeyboardScreen>
      <AuthHeader title="Sign Up" titleStyle={{color: 'black'}} />
      <View className="flex-1 items-center p-4 mt-12 justify-between">
        <View className="w-full items-center flex-1">
          <Input
            errorMessage={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ''
            }
            label="Name"
            labelStyle={{
              color: '#BDBDBD',
              fontSize: 16,
              marginLeft: 5,
              marginBottom: 5,
            }}
            placeholder="Enter your name"
            placeholderTextColor={'#BDBDBD'}
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
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
            secureTextEntry={!isPasswordVisible}
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
            errorMessage={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ''
            }
            label="Confirm Password"
            labelStyle={{
              color: '#BDBDBD',
              fontSize: 16,
              marginLeft: 5,
              marginBottom: 5,
            }}
            placeholder="Re-enter your password"
            placeholderTextColor={'#BDBDBD'}
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            leftIcon={{
              type: 'font-awesome',
              name: 'lock',
              color: '#BDBDBD',
            }}
            inputStyle={{
              marginLeft: 10,
            }}
            rightIcon={{
              type: 'font-awesome',
              name: isConfirmPasswordVisible ? 'eye-slash' : 'eye',
              color: '#BDBDBD',
              onPress: () =>
                setConfirmPasswordVisible(!isConfirmPasswordVisible),
            }}
            secureTextEntry={!isConfirmPasswordVisible}
            inputContainerStyle={{
              borderBottomWidth: 0,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#F5F5F5',
              borderRadius: 20,
            }}
          />
          <TouchableOpacity
            className={`mt-6 h-12 bg-primary rounded-full justify-center items-center h-[${_buttonHeight}px]`}
            style={{width: '50%'}}
            onPress={formik.submitForm}>
            <Text className="text-white text-lg font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-col items-center gap-8 mb-12">
          <View className="flex-row">
            <Text className="text-blue-700 text-medium font-semibold">
              Or continue with{' '}
            </Text>
            <TouchableOpacity
              className="border-b border-blue-700"
              onPress={() => {
                navigation.navigate(ScreenName.LoginWithGoogle);
              }}>
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
