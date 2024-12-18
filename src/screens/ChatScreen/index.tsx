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

  // useEffect(() => {
  //   dispatch(
  //     aiChatActions.getOldChatHistoryRequest(
  //       '54ee2bbf-a37b-4b70-9b5b-85e5cb8aac46',
  //     ),
  //   );
  // }, [dispatch]);

  // useEffect(() => {
  //   if (aiChatState.history && aiChatState.history.length > 0) {
  //     const historyMessages = aiChatState.history.map((message, index) => ({
  //       id: index.toString(),
  //       sender: message.sender,
  //       content: message.content,
  //       time: new Date(Number(message.time) * 1000).toLocaleTimeString([], {
  //         hour: '2-digit',
  //         minute: '2-digit',
  //       }),
  //     }));
  //     setMessages(historyMessages);
  //   }
  // }, [aiChatState.history]);

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
              id: 'gpt-4o-mini',
              model: 'dify',
              name:'GPT-4o mini'
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
  <Animatable.View
    animation="fadeInUp"
    duration={500}
    style={{
      flexDirection: item.sender === 'User' ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      marginVertical: 5,
    }}>
    <Image
      source={{
        uri:
          item.sender === 'User'
            ? 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
            : 'https://www.shutterstock.com/shutterstock/photos/2464455965/display_1500/stock-vector-happy-robot-d-ai-character-chat-bot-mascot-isolated-on-white-background-gpt-chatbot-icon-2464455965.jpg',
      }}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.primary,
      }}
    />
    <View
      style={{
        backgroundColor: item.sender === 'User' ? Colors.primary : '#F3F4F6',
        padding: 12,
        borderRadius: 18,
        marginHorizontal: 10,
        maxWidth: '75%',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}>
      {item.isTyping ? (
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          style={{color: '#6B7280', fontSize: 14}}>
          ...
        </Animatable.Text>
      ) : item.content ? (
        <Text
          style={{
            color: item.sender === 'User' ? 'white' : '#1F2937',
            fontSize: 16,
          }}>
          {item.content}
        </Text>
      ) : null}
      {item.image && (
        <Image
          source={{uri: item.image}}
          style={{width: 200, height: 200, marginTop: 10, borderRadius: 10}}
          resizeMode="cover"
        />
      )}
      <Text
        style={{
          fontSize: 12,
          color: '#9CA3AF',
          marginTop: 5,
          textAlign: item.sender === 'User' ? 'right' : 'left',
        }}>
        {item.time}
      </Text>
    </View>
  </Animatable.View>
);


  return (
    <NAvoidKeyboardScreen>
      <View style={{flex: 1, backgroundColor: '#F9FAFB'}}>
  <FlatList
    data={messages}
    keyExtractor={item => item.id}
    renderItem={renderItem}
    contentContainerStyle={{
      padding: 10,
      paddingBottom: 80, 
    }}
  />
  <View
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
    }}>
    <TouchableOpacity onPress={handleChoosePhoto} style={{marginRight: 10}}>
      <Icon name="image" size={24} color={Colors.primary} />
    </TouchableOpacity>
    <TextInput
      style={{
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginHorizontal: 5,
        color: '#1F2937',
      }}
      placeholder="Type a message..."
      placeholderTextColor="#9CA3AF"
      value={inputMessage}
      onChangeText={setInputMessage}
    />
    <TouchableOpacity onPress={handleSend}>
      <Icon
        name="paper-plane"
        size={24}
        color={Colors.primary}
        
      />
    </TouchableOpacity>
  </View>
</View>

    </NAvoidKeyboardScreen>
  );
};

export default ChatScreenWithAI;
