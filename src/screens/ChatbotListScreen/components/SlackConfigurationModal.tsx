import BottomSheet from 'components/BottomSheet';
import ChatbotIntegrationService from 'features/chatbotIntegration/api';
import {useFormik} from 'formik';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Clipboard,
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

interface SlackConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatbot: any;
}

const schema = Yup.object().shape({
  token: Yup.string().required('Token is required'),
  clientId: Yup.string().required('Client ID is required'),
  clientSecret: Yup.string().required('Client Secret is required'),
  signingSecret: Yup.string().required('Signing Secret is required'),
});

const SlackConfigurationModal: React.FC<SlackConfigurationModalProps> = ({
  isOpen,
  onClose,
  chatbot,
}) => {
  const formik = useFormik({
    initialValues: {
      token: '',
      clientId: '',
      clientSecret: '',
      signingSecret: '',
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

  const [loading, setLoading] = React.useState(false);
  const [isVerify, setIsVerify] = React.useState(false);

  const onCancel = useCallback(() => {
    onClose();
    formik.resetForm();
  }, []);

  const verifyConfigure = async () => {
    setLoading(true);
    ChatbotIntegrationService.slackIntegateVerification({
      token: formik.values.token,
      clientId: formik.values.clientId,
      clientSecret: formik.values.clientSecret,
      signingSecret: formik.values.signingSecret,
    })
      .then((res: any) => {
        setIsVerify(true);
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Verify success',
        });
      })
      .catch((error: any) => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Verify failed',
          text2: error?.data?.issue || 'Please check your configuration',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const publishBot = async () => {
    setLoading(true);
    ChatbotIntegrationService.slackPublishBot(
      {
        token: formik.values.token,
        clientId: formik.values.clientId,
        clientSecret: formik.values.clientSecret,
        signingSecret: formik.values.signingSecret,
      },
      chatbot.id,
    )
      .then((res: any) => {
        setIsVerify(false);
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Publish success',
        });
      })
      .catch((error: any) => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Publish failed',
          text2: error?.data?.issue || 'Please check your configuration',
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
      heightPercentage={80}>
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
            paddingBottom: 20,
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            OAuth2 Redirect URLs
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
              {`https://knowledge-api.jarvis.cx/kb-core/v1/bot-integration/slack/auth/${
                chatbot?.id || ''
              }`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(
                  `https://knowledge-api.jarvis.cx/kb-core/v1/bot-integration/slack/auth/${
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
            Event Request URL
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
                {`https://knowledge-api.jarvis.cx/kb-core/v1/hook/slack/${
                  chatbot?.id || ''
                }`}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(
                  `https://knowledge-api.jarvis.cx/kb-core/v1/hook/slack/${
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
              marginBottom: 10,
              // marginTop: 10,
            }}>
            Slash Request URL
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
                {`https://knowledge-api.jarvis.cx/kb-core/v1/hook/slack/slash/${
                  chatbot?.id || ''
                }`}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(
                  `https://knowledge-api.jarvis.cx/kb-core/v1/hook/slack/slash/${
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
            Token
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

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 20,
            }}>
            Client ID
          </Text>
          <Input
            errorMessage={formik.touched.clientId ? formik.errors.clientId : ''}
            containerStyle={{
              width: '100%',
              padding: 0,
              margin: 0,
              marginTop: 10,
            }}
            onBlur={formik.handleBlur('clientId')}
            value={formik.values.clientId}
            onChangeText={formik.handleChange('clientId')}
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
            Client Secret
          </Text>
          <Input
            errorMessage={
              formik.touched.clientSecret ? formik.errors.clientSecret : ''
            }
            containerStyle={{
              width: '100%',
              padding: 0,
              margin: 0,
              marginTop: 10,
            }}
            onBlur={formik.handleBlur('clientSecret')}
            value={formik.values.clientSecret}
            onChangeText={formik.handleChange('clientSecret')}
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
            Signing Secret
          </Text>
          <Input
            errorMessage={
              formik.touched.signingSecret ? formik.errors.signingSecret : ''
            }
            containerStyle={{
              width: '100%',
              padding: 0,
              margin: 0,
              marginTop: 10,
            }}
            onBlur={formik.handleBlur('signingSecret')}
            value={formik.values.signingSecret}
            onChangeText={formik.handleChange('signingSecret')}
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

export default SlackConfigurationModal;
