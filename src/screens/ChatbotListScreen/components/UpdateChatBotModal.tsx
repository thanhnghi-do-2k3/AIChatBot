import Header from 'components/Header';
import ChatbotService from 'features/chatbot/api';
import {chatbotActions} from 'features/chatbot/reducer';
import KbService from 'features/KB/api';
import {useFormik} from 'formik';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';

interface UpdateChatBotModalProps {
  route: any;
  navigation: any;
}

const validationSchema = Yup.object().shape({
  botname: Yup.string().required('Please enter chatbot name'),
  instruction: Yup.string().required('Please enter chatbot instruction'),
  description: Yup.string().required('Please enter chatbot description'),
});

const UpdateChatBotModal: React.FC<UpdateChatBotModalProps> = ({
  navigation,
  route,
}) => {
  const onClose = () => {
    navigation.goBack();
  };

  const dispatch = useAppDispatch();

  const chatbot = route.params.chatbot;
  const [knowledge, setKnowledge] = React.useState<any>('');
  const [importedKB, setImportedKB] = React.useState<any[]>([]);
  const [unimportedKB, setUnimportedKB] = React.useState<any[]>([]);

  const [displayImportedKB, setDisplayImportedKB] = React.useState<any[]>([]);
  const [displayUnimportedKB, setDisplayUnimportedKB] = React.useState<any[]>(
    [],
  );

  const removeKB = async (kbId: string) => {
    try {
      await ChatbotService.removeKB(chatbot.id, kbId);
      Toast.show({
        type: 'success',
        text1: 'Remove knowledge base successfully',
      });
      setImportedKB(importedKB.filter(kb => kb.id !== kbId));
      setUnimportedKB([...unimportedKB, importedKB.find(kb => kb.id === kbId)]);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to remove knowledge base',
      });
    }
  };

  const addKB = async (kbId: string) => {
    try {
      await ChatbotService.importKB(chatbot.id, kbId);
      Toast.show({
        type: 'success',
        text1: 'Add knowledge base successfully',
      });
      setUnimportedKB(unimportedKB.filter(kb => kb.id !== kbId));
      setImportedKB([...importedKB, unimportedKB.find(kb => kb.id === kbId)]);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to add knowledge base',
      });
    }
  };

  const fetchData = async () => {
    try {
      const imported = await ChatbotService.getImportedKB(chatbot.id);
      setImportedKB(imported.data);

      const all = await KbService.getKb();

      setUnimportedKB(
        all.data.filter(
          kb => !imported.data.find(imported => imported.id === kb.id),
        ),
      );
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch knowledge base data',
      });
      navigation.goBack();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDisplayImportedKB(
      importedKB.filter(
        kb =>
          kb.knowledgeName.toLowerCase().indexOf(knowledge.toLowerCase()) !==
          -1,
      ),
    );
    setDisplayUnimportedKB(
      unimportedKB.filter(
        kb =>
          kb.knowledgeName.toLowerCase().indexOf(knowledge.toLowerCase()) !==
          -1,
      ),
    );
  }, [knowledge, importedKB, unimportedKB]);

  const formik = useFormik({
    initialValues: {
      botname: chatbot?.assistantName || '',
      instruction: chatbot?.instructions || '',
      description: chatbot?.description || '',
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

    const updateChatbotPayload = {
      id: chatbot.id,

      data: {
        assistantName: formik.values.botname,
        instructions: formik.values.instruction,
        description: formik.values.description,
      },

      action: {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Update chatbot successfully',
          });
          dispatch(chatbotActions.getChatbot({}));
        },
        onFailure: (error: any) => {
          Toast.show({
            type: 'error',
            text1: 'Update chatbot failed',
          });
        },
        onBegin: () => {},
      },
    };
    dispatch(chatbotActions.updateChatbot(updateChatbotPayload));
  };

  return (
    <SafeAreaView style={styles.modalContainer}>
      <Header title="Update Chatbot" allowGoBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        contentContainerStyle={{
          alignSelf: 'center',
          width: '95%',
          paddingBottom: 80,
          // height: '130%',
        }}>
        <View
          style={{
            marginTop: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
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
              color: '#BDBDBD',
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
              backgroundColor: '#F5F5F5',
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
              color: '#BDBDBD',
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
              // height: 100,
              borderWidth: 0.5,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#F5F5F5',
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
              color: '#BDBDBD',
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
              // height: 170,
              borderWidth: 0.5,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#F5F5F5',
              borderRadius: 20,
            }}
          />

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
                Update{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                flex: 1,
                borderBottomColor: '#BDBDBD',
              }}></View>
            <Text style={styles.title}>Chatbot Knowledge</Text>
            <View
              style={{
                borderBottomWidth: 1,
                flex: 1,
                borderBottomColor: '#BDBDBD',
              }}></View>
          </View>

          <Input
            errorStyle={{
              height: 0,
              margin: 0,
            }}
            containerStyle={{
              alignSelf: 'center',
              width: '70%',
              padding: 0,
              marginTop: 10,
            }}
            placeholder="Search knowledge"
            placeholderTextColor={'#BDBDBD'}
            value={knowledge}
            onChangeText={setKnowledge}
            leftIcon={{
              type: 'font-awesome',
              name: 'search',
              color: '#BDBDBD',
            }}
            inputStyle={{
              marginLeft: 10,
            }}
            inputContainerStyle={{
              borderColor: '#BDBDBDCC',
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#F5F5F5',
              borderRadius: 20,
            }}
          />

          <FlatList
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                  }}>
                  Imported Knowledge Base:
                </Text>
              </View>
            }
            data={displayImportedKB}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#BDBDBD',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    {item.knowledgeName}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      removeKB(item.id);
                    }}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <Icon name="minus" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <FlatList
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                  }}>
                  Knowledge Base:
                </Text>
              </View>
            }
            data={displayUnimportedKB}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#BDBDBD',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    {item.knowledgeName}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      addKB(item.id);
                    }}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <Icon name="plus" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  modalContent: {
    width: '95%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textTransform: 'uppercase',
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    // width: '100%',
  },
});

export default UpdateChatBotModal;
