import Header from 'components/Header';
import {chatbotActions} from 'features/chatbot/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface CreateChatBotModalProps {
  navigation: any;
}

const CreateChatBotModal: React.FC<CreateChatBotModalProps> = ({
  navigation,
}) => {
  const [botName, setBotName] = useState('');
  const [instruction, setInstruction] = useState('');
  const [description, setDescription] = useState('');

  const onClose = () => {
    navigation.goBack();
  };

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (!botName || !instruction || !description) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all required fields',
      });
      return;
    }

    const createChatbotPayload = {
      data: {
        assistantName: botName,
        instructions: instruction,
        description: description,
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
      },
    };
    dispatch(chatbotActions.createChatbot(createChatbotPayload));
  };

  return (
    <SafeAreaView style={styles.modalContainer}>
      <Header title="Create Chatbot" />
      <View
        style={{
          width: '95%',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            marginTop: 20,
          }}>
          <Text
            style={{
              marginLeft: 10,
              marginBottom: 10,
              fontSize: 16,
              fontWeight: '700',
            }}>
            Chatbot Name:<Text style={{color: 'red'}}>*</Text>
          </Text>
          <Input
            placeholder="Chatbot Name"
            placeholderTextColor={'#BDBDBD'}
            value={botName}
            onChangeText={setBotName}
            leftIcon={{
              type: 'font-awesome-5',
              name: 'robot',
              color: '#BDBDBD',
            }}
            leftIconContainerStyle={{
              alignItems: 'center',
            }}
            inputStyle={{
              marginLeft: 10,
            }}
            inputContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#F5F5F5',
              borderRadius: 10,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          />
          <Text
            style={{
              marginLeft: 10,
              marginBottom: 10,
              fontSize: 16,
              fontWeight: '700',
            }}>
            Chatbot Intruction:<Text style={{color: 'red'}}>*</Text>
          </Text>
          <Input
            numberOfLines={3}
            multiline={true}
            placeholder="Chatbot Instruction"
            placeholderTextColor={'#BDBDBD'}
            value={instruction}
            onChangeText={setInstruction}
            leftIcon={{
              type: 'font-awesome',
              name: 'sticky-note',
              color: '#BDBDBD',
            }}
            leftIconContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            inputStyle={{
              marginLeft: 10,
              height: 100,
            }}
            inputContainerStyle={{
              alignItems: 'flex-start',
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#F5F5F5',
              borderRadius: 10,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          />
          <Text
            style={{
              marginLeft: 10,
              marginBottom: 10,
              fontSize: 16,
              fontWeight: '700',
            }}>
            Chatbot Description:<Text style={{color: 'red'}}>*</Text>
          </Text>
          <Input
            numberOfLines={4}
            multiline={true}
            placeholder="Chatbot Description"
            placeholderTextColor={'#BDBDBD'}
            value={description}
            onChangeText={setDescription}
            leftIcon={{
              type: 'font-awesome',
              name: 'book',
              color: '#BDBDBD',
            }}
            inputStyle={{
              marginLeft: 10,
              height: 200,
            }}
            inputContainerStyle={{
              alignItems: 'flex-start',
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#F5F5F5',
              borderRadius: 10,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              flexDirection: 'row',
              gap: 10,
              borderRadius: 999,
              height: 50,
              width: 150,
              backgroundColor: '#ED5E68',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="chevron-left" size={20} color="white" />
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '500',
              }}>
              {' '}
              Cancel{' '}
            </Text>
          </TouchableOpacity>
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
      </View>
    </SafeAreaView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default CreateChatBotModal;
