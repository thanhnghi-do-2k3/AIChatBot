import BottomSheet from 'components/BottomSheet';
import ChatbotIntegrationService from 'features/chatbotIntegration/api';
import {useFormik} from 'formik';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {isIOS} from 'util/device';
import * as Yup from 'yup';

interface TelegramConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatbot: any;
}

const schema = Yup.object().shape({
  token: Yup.string().required('Token is required'),
});

const TelegramConfigurationModal: React.FC<TelegramConfigurationModalProps> = ({
  isOpen,
  onClose,
  chatbot,
}) => {
  const formik = useFormik({
    initialValues: {
      token: '',
    },
    validationSchema: schema,
    onSubmit: async values => {
      if (!isVerify) {
        verifyConfigure();
      } else {
        publishBot();
      }
    },
  });

  const onCancel = useCallback(() => {
    onClose();
    formik.resetForm();
  }, []);

  const [loading, setLoading] = React.useState(false);
  const [isVerify, setIsVerify] = React.useState(false);

  const verifyConfigure = async () => {
    setLoading(true);
    ChatbotIntegrationService.telegramIntegateVerification({
      token: formik.values.token,
    })
      .then((res: any) => {
        setIsVerify(true);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Your token is verified',
        });
      })
      .catch((err: any) => {
        setIsVerify(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Your token is invalid',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const publishBot = async () => {
    setLoading(true);
    ChatbotIntegrationService.telegramPublishBot(
      {
        token: formik.values.token,
      },
      chatbot.id,
    )
      .then((res: any) => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Your bot is published',
        });
        onCancel();
      })
      .catch((err: any) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Your bot is not published',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <BottomSheet
      isVisible={isOpen}
      onBackdropPress={onCancel}
      heightPercentage={30}>
      <KeyboardAvoidingView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
            flex: 1,
            paddingVertical: 10,
            paddingBottom: isIOS() ? 64 : 0,
            // backgroundColor: 'red',
          }}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 20,
            width: '100%',
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            Telegram bot Token
          </Text>
          <Input
            errorMessage={formik.touched.token ? formik.errors.token : ''}
            containerStyle={{
              width: '100%',
              padding: 0,
              margin: 0,
              marginTop: 10,
            }}
            onBlur={formik.handleBlur('token')}
            value={formik.values.token}
            onChangeText={formik.handleChange('token')}
            inputContainerStyle={{
              width: '100%',
              borderWidth: 1,
              borderColor: '#c3c3c3',
              paddingHorizontal: 20,
              // margin: 0,
              backgroundColor: '#fff',
              borderRadius: 0,
            }}
          />

          <TouchableOpacity
            disabled={loading}
            onPress={() => formik.handleSubmit()}
            style={{
              // width: '100%',
              height: 50,
              backgroundColor: loading ? 'gray' : '#264FD3',
              borderRadius: 999,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{color: '#fff', fontSize: 16}}>
                {isVerify ? 'Publish' : 'Verify'}
              </Text>
            )}
            {/* <Text style={{color: '#fff', fontSize: 16}}>Save</Text> */}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

export default TelegramConfigurationModal;
