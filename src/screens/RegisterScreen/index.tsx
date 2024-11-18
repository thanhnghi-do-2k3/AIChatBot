import AuthHeader from 'components/AuthHeader';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import {authActions} from 'features/auth/reducer';
import {useFormik} from 'formik';
import useAppDispatch from 'hooks/useAppDispatch';
import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import {styles} from './style';

interface Props {
  // Define your component's props here
}

const _buttonHeight = 50;

const validationSchema = Yup.object({
  name: Yup.string().required('Vui lòng nhập tên'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
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

  return (
    <NAvoidKeyboardScreen>
      <AuthHeader title="Sign Up" titleStyle={{color: 'black'}} />
      <View className="flex-1 items-center p-4 mt-12 justify-between">
        <View className="w-full items-center flex-1">
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#BDBDBD"
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <Text style={styles.error}>{formik.errors.name}</Text>
          ) : null}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#BDBDBD"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text style={styles.error}>{formik.errors.email}</Text>
          ) : null}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#BDBDBD"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <Text style={styles.error}>{formik.errors.password}</Text>
          ) : null}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#BDBDBD"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
          ) : null}
          <TouchableOpacity
            className={`mt-6 w-full h-12 bg-primary rounded-full justify-center items-center h-[${_buttonHeight}px]`}
            onPress={formik.submitForm}>
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
