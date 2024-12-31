import AppHeader from 'components/AppHeader';
import {chatbotActions} from 'features/chatbot/reducer';
import {useFormik} from 'formik';
import useAppDispatch from 'hooks/useAppDispatch';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';

interface CreateChatBotModalProps {
  navigation: any;
}

const validationSchema = Yup.object().shape({
  botname: Yup.string().required('Please enter chatbot name'),
  instruction: Yup.string().required('Please enter chatbot instruction'),
  description: Yup.string().required('Please enter chatbot description'),
});

const CreateChatBotModal: React.FC<CreateChatBotModalProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      botname: '',
      instruction: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {},
  });

  const handleSubmit = () => {
    if (
      !formik.values.botname ||
      !formik.values.instruction ||
      !formik.values.description
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all required fields',
      });
      return;
    }

    const createChatbotPayload = {
      data: {
        assistantName: formik.values.botname,
        instructions: formik.values.instruction,
        description: formik.values.description,
      },

      action: {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Create chatbot successfully',
          });
          dispatch(chatbotActions.getChatbot({}));
          navigation.goBack();
        },
        onFailure: (error: any) => {
          Toast.show({
            type: 'error',
            text1: 'Create chatbot failed',
            text2: error?.data?.details?.[0].issue,
          });
        },
        onBegin: () => {},
      },
    };
    dispatch(chatbotActions.createChatbot(createChatbotPayload));
  };

  return (
    <View style={styles.modalContainer}>
      <AppHeader
        headerTitle="Create Chatbot"
        onPressLeftHeader={() => {
          navigation.goBack();
        }}
        paddingTop={20}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          borderTopRightRadius: 32,
          borderTopLeftRadius: 32,
          backgroundColor: 'white',
          width: '100%',
          // flex: 1,
          paddingTop: 20,
        }}
        contentContainerStyle={{
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              flex: 1,
              borderBottomColor: '#BDBDBD',
            }}></View>
          <Text style={styles.title}>Chatbot Information</Text>
          <View
            style={{
              borderBottomWidth: 1,
              flex: 1,
              borderBottomColor: '#BDBDBD',
            }}></View>
        </View>
        <View
          style={{
            marginTop: 0,
          }}>
          <Input
            containerStyle={
              {
                // marginBottom: 10,
              }
            }
            errorMessage={
              formik.touched.botname &&
              typeof formik.errors.botname === 'string'
                ? formik.errors.botname
                : ''
            }
            label="Chatbot Name"
            labelStyle={{
              color: '#000',
              fontSize: 16,
              marginLeft: 5,
              marginBottom: 5,
            }}
            placeholder="Enter chatbot name"
            placeholderTextColor={'#BDBDBD'}
            value={formik.values.botname}
            onChangeText={formik.handleChange('botname')}
            onBlur={formik.handleBlur('botname')}
            leftIcon={<Icon name="robot" size={22} color="#BDBDBD" />}
            inputStyle={{
              marginLeft: 10,
            }}
            inputContainerStyle={{
              borderWidth: 0.5,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#fff',
              borderRadius: 20,
            }}
          />

          <Input
            containerStyle={{}}
            errorMessage={
              formik.touched.instruction &&
              typeof formik.errors.instruction === 'string'
                ? formik.errors.instruction
                : ''
            }
            label="Chatbot Instruction"
            labelStyle={{
              color: '#000',
              fontSize: 16,
              marginLeft: 5,
              marginBottom: 5,
            }}
            placeholder="Enter chatbot instruction"
            placeholderTextColor={'#BDBDBD'}
            value={formik.values.instruction}
            onChangeText={formik.handleChange('instruction')}
            onBlur={formik.handleBlur('instruction')}
            leftIcon={{
              type: 'font-awesome',
              name: 'pencil',
              color: '#BDBDBD',
              size: 22,
            }}
            inputStyle={{
              marginLeft: 10,
              marginTop: 5,
            }}
            multiline
            leftIconContainerStyle={{
              marginTop: 0,
              paddingTop: 0,
            }}
            inputContainerStyle={{
              alignItems: 'flex-start',
              height: 170,
              borderWidth: 0.5,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#fff',
              borderRadius: 20,
            }}
          />

          <Input
            errorMessage={
              formik.touched.description &&
              typeof formik.errors.description === 'string'
                ? formik.errors.description
                : ''
            }
            label="Chatbot Description"
            labelStyle={{
              color: '#000',
              fontSize: 16,
              marginLeft: 5,
              marginBottom: 5,
            }}
            placeholder="Enter chatbot description"
            placeholderTextColor={'#BDBDBD'}
            value={formik.values.description}
            onChangeText={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
            leftIcon={{
              type: 'font-awesome',
              name: 'book',
              color: '#BDBDBD',
              size: 22,
            }}
            inputStyle={{
              marginLeft: 10,
              marginTop: 5,
            }}
            multiline
            leftIconContainerStyle={{
              marginTop: 0,
              paddingTop: 0,
            }}
            inputContainerStyle={{
              alignItems: 'flex-start',
              height: 250,
              borderWidth: 0.5,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#fff',
              borderRadius: 20,
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              flexDirection: 'row',
              gap: 10,
              borderRadius: 999,
              height: 50,
              width: 150,
              backgroundColor: '#28C68B',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="check" size={20} color="white" />
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '500',
              }}>
              {' '}
              Create{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  modalContent: {
    width: '95%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default CreateChatBotModal;
