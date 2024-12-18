import Header from 'components/Header';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import {chatbotActions} from 'features/chatbot/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'theme';
import ChatBotListItem from './components/ChatBotListItem';
import {styles} from './style';

interface Props {}

const ChatbotListScreen: React.FC<Props> = ({navigation}: any) => {
  const [botName, setBotName] = useState('');
  const dispatch = useAppDispatch();
  const listChatbot = useAppSelector(state => state.chatbotReducer.listChatbot);

  useEffect(() => {
    const payload = {
      data: {},
      action: {
        onSuccess: (data: any) => {},
        onFailure: (error: any) => {
          Toast.show({
            type: 'error',
            text1: 'Get chatbot failed',
          });
        },
      },
    };

    dispatch(chatbotActions.getChatbot(payload));
  }, []);

  return (
    <>
      <NAvoidKeyboardScreen>
        <Header
          title="Chatbots list"
          titleStyle={{color: 'black'}}
          allowGoBack={false}
        />
        <View style={styles.container}>
          <Input
            placeholder="Search chatbot"
            placeholderTextColor={'#BDBDBD'}
            value={botName}
            onChangeText={setBotName}
            leftIcon={{
              type: 'font-awesome',
              name: 'search',
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenName.CreateBotTab);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.primary,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 999,
            }}>
            <Icon name="robot" size={20} color="#fff" />
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',
                marginLeft: 10,
              }}>
              Create Chat Bot
            </Text>
          </TouchableOpacity>
          <FlatList
            style={{marginTop: 20, width: '100%', flex: 1}}
            data={listChatbot}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.chatbotName}
            renderItem={({item, index}) => (
              <ChatBotListItem item={item} index={index} />
            )}
          />
        </View>
      </NAvoidKeyboardScreen>
    </>
  );
};

export default ChatbotListScreen;
