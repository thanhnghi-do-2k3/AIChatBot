import BottomSheet from 'components/BottomSheet';
import ChatbotIntegrationService from 'features/chatbotIntegration/api';
import {useFormik} from 'formik';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Clipboard,
  InteractionManager,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isIOS} from 'util/device';
import * as Yup from 'yup';

interface MessengerConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatbot: any;
}

const schema = Yup.object().shape({
  messengerBotToken: Yup.string().required('Messenger Bot Token is required'),
  messengerBotPageId: Yup.string()
    .required('Messenger Bot Page ID is required')
    .min(10, 'Messenger Bot Page ID must be at least 10 characters')
    .max(20, 'Messenger Bot Page ID must be at most 20 characters'),
  messengerBotAppSecret: Yup.string()
    .required('Messenger Bot App Secret is required')
    .min(20, 'Messenger Bot App Secret must be at least 20 characters')
    .max(40, 'Messenger Bot App Secret must be at most 40 characters'),
});

const MessengerConfigurationModal: React.FC<
  MessengerConfigurationModalProps
> = ({isOpen, onClose, chatbot}) => {
  const formik = useFormik({
    initialValues: {
      messengerBotToken: '',
      messengerBotPageId: '',
      messengerBotAppSecret: '',
    },
    validationSchema: schema,
    onSubmit: async values => {
      if (!isVerify) {
        await verifyConfigure();
        return;
      }
      await pulbishChatbot();
    },
  });

  const [loading, setLoading] = React.useState(false);
  const [isVerify, setIsVerify] = React.useState(false);

  const verifyConfigure = async () => {
    setLoading(true);
    ChatbotIntegrationService.messengerIntegateVerification({
      botToken: formik.values.messengerBotToken,
      pageId: formik.values.messengerBotPageId,
      appSecret: formik.values.messengerBotAppSecret,
    })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Messenger Configuration is valid',
          position: 'top',
        });
        InteractionManager.runAfterInteractions(() => {
          setIsVerify(true);
        });
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Messenger Configuration is invalid',
          text2: err?.data?.issue || 'Please check your configuration',
          position: 'top',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const pulbishChatbot = async () => {
    setLoading(true);
    ChatbotIntegrationService.messengerPublishBot(
      {
        botToken: formik.values.messengerBotToken,
        pageId: formik.values.messengerBotPageId,
        appSecret: formik.values.messengerBotAppSecret,
      },
      chatbot.id,
    )
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Messenger Bot is published',
          position: 'top',
        });
        InteractionManager.runAfterInteractions(() => {
          onCancel();
        });
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Messenger Bot publish failed',
          text2: err?.data?.issue || 'Please check your configuration',
          position: 'top',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCancel = useCallback(() => {
    onClose();
    formik.resetForm();
    setIsVerify(false);
  }, []);

  return (
    <BottomSheet
      isVisible={isOpen}
      onBackdropPress={onCancel}
      heightPercentage={80}>
      <KeyboardAvoidingView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
            flex: 1,
            paddingVertical: 10,
            paddingBottom: isIOS() ? 64 : 0,
            backgroundColor: 'red',
          }}
          contentContainerStyle={{
            paddingBottom: 20,
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            CallbackURL
          </Text>
          <View
            className="flex-row align-center justify-between"
            style={{
              backgroundColor: '#f5f5f5',
              padding: 10,
              borderRadius: 20,
              width: '100%',
              marginBottom: 20,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                fontStyle: 'italic',
                // marginBottom: 20,
              }}>
              {`https://knowledge-api.jarvis.cx/kb-core/v1/hook/messenger/${
                chatbot?.id || ''
              }`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(
                  `https://knowledge-api.jarvis.cx/kb-core/v1/hook/messenger/${
                    chatbot?.id || ''
                  }`,
                );
                Toast.show({
                  type: 'success',
                  text1: 'Copied',
                  position: 'top',
                });
              }}
              style={{
                // marginLeft: 10,
                flex: 0.07,
                // padding: 5,
                width: 20,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#ae9645',
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                // backgroundColor: 'red',
              }}>
              <Icon name="copy" size={20} color="#264FD3" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
              // marginTop: 10,
            }}>
            Verify Token
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              padding: 10,
              borderRadius: 20,
              marginBottom: 20,
            }}>
            <View
              style={{
                // backgroundColor: 'red',s
                // alignContent: 'center',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  // backgroundColor: 'red',
                  // height: '100%',
                  fontSize: 14,
                  fontStyle: 'italic',
                  marginBottom: 20,
                }}>
                knowledge
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(`knowledge`);
                Toast.show({
                  type: 'success',
                  text1: 'Copied',
                  position: 'top',
                });
              }}
              style={{
                flex: 0.07,
                width: 20,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#ae9645',
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
              }}>
              <Icon name="copy" size={20} color="#264FD3" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            Messenger Bot Token
          </Text>
          <Input
            errorMessage={
              formik.touched.messengerBotToken
                ? formik.errors.messengerBotToken
                : ''
            }
            containerStyle={{
              width: '100%',
              padding: 0,
              margin: 0,
              marginTop: 10,
            }}
            onBlur={formik.handleBlur('messengerBotToken')}
            value={formik.values.messengerBotToken}
            onChangeText={formik.handleChange('messengerBotToken')}
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

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 20,
            }}>
            Messenger Bot Page ID
          </Text>
          <Input
            errorMessage={
              formik.touched.messengerBotPageId
                ? formik.errors.messengerBotPageId
                : ''
            }
            containerStyle={{
              width: '100%',
              padding: 0,
              margin: 0,
              marginTop: 10,
            }}
            onBlur={formik.handleBlur('messengerBotPageId')}
            value={formik.values.messengerBotPageId}
            onChangeText={formik.handleChange('messengerBotPageId')}
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

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 20,
            }}>
            Messenger Bot App Secret
          </Text>
          <Input
            errorMessage={
              formik.touched.messengerBotAppSecret
                ? formik.errors.messengerBotAppSecret
                : ''
            }
            containerStyle={{
              width: '100%',
              padding: 0,
              margin: 0,
              marginTop: 10,
            }}
            onBlur={formik.handleBlur('messengerBotAppSecret')}
            value={formik.values.messengerBotAppSecret}
            onChangeText={formik.handleChange('messengerBotAppSecret')}
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
              width: '100%',
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

export default MessengerConfigurationModal;
