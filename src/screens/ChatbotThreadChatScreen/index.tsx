import AppHeader from 'components/AppHeader';
import ChatbotService from 'features/chatbot/api';
import useAppSelector from 'hooks/useAppSelector';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/store';
import Colors from 'theme/Colors';
import {isIOS} from 'util/device';

interface Props {
  navigation: any;
  route: any;
}

const ChatbotThreadChatScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const dispatch = useDispatch();
  const aiChatState = useSelector((state: RootState) => state.chatReducer);

  const threadMessages = useAppSelector(
    state => state.chatbotReducer.curThreadMessage,
  );

  const flatListRef = React.useRef<FlatList>(null);

  const thread = route.params.thread;

  const [messages, setMessages] = useState<any[]>(() => threadMessages);
  const [inputMessage, setInputMessage] = useState('');

  // useEffect(() => {
  //   flatListRef.current?.scrollToEnd();
  // }, [messages]);

  // useEffect(() => {
  //   if (aiChatState.message) {
  //     const newMessage: Message = {
  //       id: (messages.length + 1).toString(),
  //       sender: aiChatState.message.sender,
  //       content: aiChatState.message.content,
  //       time: new Date().toLocaleTimeString([], {
  //         hour: '2-digit',
  //         minute: '2-digit',
  //       }),
  //     };
  //     setMessages(prevMessages => [...prevMessages, newMessage]);
  //   }
  // }, [aiChatState.message]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      const payload = {
        message: inputMessage,
        openAiThreadId: thread.openAiThreadId,
        additionalInstruction: '',
      };

      const userMessage = {
        role: 'user',
        content: inputMessage,
      };

      setMessages(prevMessages => [userMessage, ...prevMessages]);

      setInputMessage('');

      ChatbotService.askAssistant(thread.assistantId, payload)
        .then(response => {
          const assistantMessage = {
            role: 'assistant',
            content: response,
          };
          setMessages(prevMessages => [assistantMessage, ...prevMessages]);
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Error responding from assistant',
          });
        });
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

  const renderItem = ({item}: {item: any}) => (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      style={{
        flexDirection: item.role === 'user' ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        marginVertical: 5,
      }}>
      <Image
        source={{
          uri:
            item.role === 'user'
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
          backgroundColor: item.role === 'user' ? Colors.primary : '#F3F4F6',
          paddingVertical: 10,
          paddingHorizontal: 15,
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
              color: item.role === 'user' ? 'white' : '#1F2937',
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
            textAlign: item.role === 'user' ? 'right' : 'left',
          }}>
          {item.createAt}
        </Text>
      </View>
    </Animatable.View>
  );

  return (
    <View style={{flex: 1}}>
      <AppHeader
        headerTitle="Chatbot Thread"
        onPressLeftHeader={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#fff'}}
        behavior="padding"
        enabled>
        <FlatList
          inverted
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          // style={{marginBottom: 80}}
          contentContainerStyle={{
            // padding: 10,
            // flex: 1,
            paddingTop: 10,
            marginTop: 80,
            // paddingBottom: 80,
          }}
        />
        <View
          style={{
            position: 'absolute',
            paddingBottom: isIOS() ? 32 : 0,
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
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={{marginRight: 10}}>
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
            <Icon name="paper-plane" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatbotThreadChatScreen;
