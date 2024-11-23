import {aiChatActions} from 'features/chat/reducer';
import React, {useEffect, useState} from 'react';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import {Picker} from '@react-native-picker/picker';

import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/store';
import Colors from 'theme/Colors';

import PromptLibraryModal from './components/PromptModal';


interface Props {}
interface Prompt {
  id: string;
  title: string;
  content: string;
}
interface Message {
  id: string;
  sender: 'User' | 'Assistant';
  content?: string;
  image?: string;
  time: string;
  isTyping?: boolean;
}

const ChatScreenWithAI: React.FC<Props> = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const listPrompts = useAppSelector(state => state.promptReducer.listPrompts);
  const aiChatState = useSelector((state: RootState) => state.chatReducer);

  const conversationId = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promptContent, setPromptContent] = useState('');

  const MODEL_OPTIONS = [
    'claude-3-haiku-2024307',
    'claude-3-sonnet-20240229',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
    'gpt-4o',
    'gpt-4o-mini',
  ];

  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');

  //handle when / in input
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);

  const isLoading = aiChatState.loading;
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    dispatch(aiChatActions.resetState());
    if (conversationId)
      dispatch(aiChatActions.getOldChatHistoryRequest(conversationId));
  }, []);

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

  // Hàm gửi tin nhắn thường
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
              name: 'GPT-4o mini',
            },
          },
        }),
      );
    }
  };

  // Hàm gửi prompt có sẵn
  const handleSendPrompt = (content: string) => {
    const userMessage: Message = {
      id: (messages.length + 1).toString(),
      sender: 'User',
      content,
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
          content: content,
          metadata: {
            conversation: {id: aiChatState.conversationId || ''},
          },
          assistant: {
            id: 'gpt-4o-mini',
            model: 'dify',
            name: 'GPT-4o mini',
          },
        },
      }),
    );
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

  // Hàm handleChangeText để kiểm tra khi người dùng nhập "/"
  const handleChangeText = (text: string) => {
    setInputMessage(text);

    // Nếu bắt đầu bằng "/", hiển thị danh sách gợi ý prompt
    if (text.startsWith('/')) {
      setShowPromptSuggestions(true);

      // Lấy từ khoá tìm kiếm (sau dấu "/"), ví dụ "/ab" => "ab"
      const searchKey = text.substring(1).toLowerCase();
      // Lọc listPrompts theo title
      const filtered = listPrompts.filter(prompt =>
        prompt.title.toLowerCase().includes(searchKey),
      );
      setFilteredPrompts(filtered);
    } else {
      setShowPromptSuggestions(false);
    }
  };

  // Khi user bấm chọn một prompt trong danh sách gợi ý
  const handleSelectPrompt = (prompt: Prompt) => {
    // Inject prompt.content vào ô chat
    setInputMessage(prompt.content);
    setShowPromptSuggestions(false);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#fff'}}
      behavior="padding"
      keyboardVerticalOffset={100}
      enabled>
      <View style={{marginHorizontal: 10, marginVertical: 25, width: 200}}>
        <Picker
          selectedValue={selectedModel}
          onValueChange={itemValue => {
            setSelectedModel(itemValue);
          }}
          style={{
            width: 200,
          }}>
          {MODEL_OPTIONS.map(model => (
            <Picker.Item key={model} label={model} value={model} />
          ))}
        </Picker>
      </View>
      {(aiChatState.history?.length ?? 0) === 0 && !conversationId && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          
          <Text style={{fontSize: 16, color: '#9CA3AF'}}>
            Type something to start a conversation
          </Text>
        </View>
      )}

      {/* Danh sách lịch sử chat */}
      <FlatList
        data={aiChatState.history}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 80,
        }}
      />

      {/* Vùng gợi ý prompt khi gõ "/" */}
      {showPromptSuggestions && filteredPrompts.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {/* Dùng ScrollView để cuộn */}
          <ScrollView style={{maxHeight: 200}}>
            {filteredPrompts.map(prompt => (
              <TouchableOpacity
                key={prompt.id}
                style={styles.suggestionItem}
                onPress={() => handleSelectPrompt(prompt)}>
                <Text style={styles.suggestionText}>{prompt.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Thanh nhập tin nhắn */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleChoosePhoto} style={{marginRight: 10}}>
          <Icon name="image" size={24} color={Colors.primary} />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
          value={inputMessage}
          onChangeText={handleChangeText} // thay vì setInputMessage
          multiline={true}
        />

        <TouchableOpacity onPress={handleSend}>
          <Icon name="paper-plane" size={24} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleModal} style={{marginLeft: 10}}>
          <Icon name="list" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <PromptLibraryModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        onSubmitForm={setPromptContent}
        onSendChat={handleSendPrompt}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatScreenWithAI;

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 32,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginHorizontal: 5,
    color: '#1F2937',
  },
  // Container cho danh sách gợi ý prompt
  suggestionsContainer: {
    position: 'absolute',
    // canh chỉnh để hiển thị ngay trên thanh input, tuỳ chỉnh theo UI
    bottom: 60,
    left: 10,
    right: 10,
    backgroundColor: '#FFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 10,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
    color: '#1F2937',
  },
});
