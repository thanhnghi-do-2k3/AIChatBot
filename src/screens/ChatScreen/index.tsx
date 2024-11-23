import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import Colors from 'theme/Colors';
import {launchImageLibrary} from 'react-native-image-picker';
import {aiChatActions} from 'features/chat/reducer';
import {RootState} from 'store/store';

const ChatScreenWithAI: React.FC = () => {
  const dispatch = useDispatch();
  const aiChatState = useSelector((state: RootState) => state.chatReducer);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');


  useEffect(() => {
    dispatch(
      aiChatActions.getOldChatHistoryRequest(
        '54ee2bbf-a37b-4b70-9b5b-85e5cb8aac46',
      ),
    );
  }, [dispatch]);

  
  useEffect(() => {
    if (aiChatState.history && aiChatState.history.length > 0) {
      const historyMessages = aiChatState.history.map((message, index) => ({
        id: index.toString(),
        sender: message.sender,
        content: message.content,
        time: new Date(Number(message.time) * 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));
      setMessages(historyMessages);
    }
  }, [aiChatState.history]);

  
  useEffect(() => {
    if (aiChatState.message) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        sender: aiChatState.message.sender,
        content: aiChatState.message.content,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }
  }, [aiChatState.message]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: (messages.length + 1).toString(),
        sender: 'User',
        content: inputMessage,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputMessage('');

      
      dispatch(
        aiChatActions.sendMessageRequest({
          data: {
            content: inputMessage,
            metadata: {
              conversation: {id: aiChatState.conversationId || ''},
            },
            assistant: {
              id: 'claude-3-haiku-20240307',
              model: 'dify',
              name: 'Claude 3 Haiku',
            },
          },
        }),
      );
    }
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const imageAsset = response.assets[0];
        const newMessage: Message = {
          id: (messages.length + 1).toString(),
          sender: 'User',
          image: imageAsset.uri,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
    });
  };

  const renderItem = ({item}: {item: Message}) => (
    <View
      style={{
        flexDirection: item.sender === 'User' ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        marginVertical: 5,
      }}>
      <Image
        source={{
          uri:
            item.sender === 'User'
              ? 'https://randomuser.me/api/portraits/men/1.jpg'
              : 'https://i.pravatar.cc/150?img=AI',
        }}
        style={{width: 40, height: 40, borderRadius: 20}}
      />
      <View
        style={{
          backgroundColor: item.sender === 'User' ? Colors.primary : '#E0E0E0',
          padding: 10,
          borderRadius: 15,
          marginHorizontal: 10,
          maxWidth: '70%',
          borderBottomRightRadius: item.sender === 'User' ? 0 : 15,
          borderBottomLeftRadius: item.sender === 'AI' ? 0 : 15,
        }}>
        {item.isTyping ? (
          <Animatable.Text
            animation="pulse"
            iterationCount={5}
            style={{color: '#808080', fontSize: 14}}>
            ...
          </Animatable.Text>
        ) : item.content ? (
          <Text
            style={{
              color: item.sender === 'User' ? 'white' : 'black',
              fontSize: 14,
            }}>
            {item.content}
          </Text>
        ) : null}
        {item.image && (
          <Image
            source={{uri: item.image}}
            style={{width: 200, height: 200, marginTop: 5}}
            resizeMode="contain"
          />
        )}
        <Text style={{fontSize: 10, color: '#808080', marginTop: 5}}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <NAvoidKeyboardScreen>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: 10}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#E0E0E0',
          borderRadius: 20,
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 10,
          margin: 10,
        }}>
        <TextInput
          style={{flex: 1, paddingVertical: 10}}
          placeholder="Type a message"
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={handleSend}>
          <Icon name="paper-plane" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default ChatScreenWithAI;
