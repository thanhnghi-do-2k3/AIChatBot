import BottomSheet from 'components/BottomSheet';
import {useFormik} from 'formik';
import React, {useCallback} from 'react';
import {KeyboardAvoidingView, Text, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {isIOS} from 'util/device';
import * as Yup from 'yup';

interface MessengerConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatbot: any;
}

const schema = Yup.object().shape({
  messengerBotToken: Yup.string().required('Messenger Bot Token is required'),
  messengerBotPageId: Yup.string().required(
    'Messenger Bot Page ID is required',
  ),
  messengerBotAppSecret: Yup.string().required(
    'Messenger Bot App Secret is required',
  ),
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
      onCancel();
    },
  });

  const onCancel = useCallback(() => {
    onClose();
    formik.resetForm();
  }, []);

  return (
    <BottomSheet
      isVisible={isOpen}
      onBackdropPress={onCancel}
      heightPercentage={60}>
      <KeyboardAvoidingView>
        <ScrollView
          style={{
            width: '100%',
            flex: 1,
            paddingVertical: 10,
            paddingBottom: isIOS() ? 64 : 0,
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            CallbackURL
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontStyle: 'italic',
              marginBottom: 20,
            }}>
            {`https://knowledge-api.jarvis.cx/kb-core/v1/hook/messenger/${
              chatbot?.id || ''
            }`}
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            Verify Token
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontStyle: 'italic',
              marginBottom: 20,
            }}>
            knowledge
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            Messenger Bot Token
          </Text>
          <Input
            errorStyle={{
              height: 0,
              margin: 0,
            }}
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
            errorStyle={{
              height: 0,
              margin: 0,
            }}
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
            errorStyle={{
              height: 0,
              margin: 0,
            }}
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
            onPress={() => formik.handleSubmit()}
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#264FD3',
              borderRadius: 999,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text style={{color: '#fff', fontSize: 16}}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

export default MessengerConfigurationModal;
