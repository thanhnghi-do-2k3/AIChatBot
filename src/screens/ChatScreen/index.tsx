import React, {useEffect, useState} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome5';

import PromptLibraryModal from './components/PromptModal';
const Colors = {
  primary: '#2563EB',
};


const listPrompts = [
  {
    id: 'prompt-1',
    title: 'Xin chào',
    content: 'Nội dung prompt: Xin chào!',
  },
  {
    id: 'prompt-2',
    title: 'Help',
    content: 'Nội dung prompt: Giúp tôi...',
  },
  {
    id: 'prompt-3',
    title: 'Weather',
    content: 'Nội dung prompt: Hôm nay thời tiết thế nào?',
  },
];


const mockHistory = [
  {
    id: 'msg-1',
    sender: 'User',
    content: 'Hello AI!',
    time: '10:00 AM',
  },
  {
    id: 'msg-2',
    sender: 'Assistant',
    content: 'Chào bạn, mình có thể giúp gì?',
    time: '10:01 AM',
  },
  {
    id: 'msg-3',
    sender: 'User',
    content: 'Cho mình biết thời tiết hôm nay!',
    time: '10:02 AM',
  },
  {
    id: 'msg-4',
    sender: 'Assistant',
    content: 'Thời tiết hôm nay rất đẹp, nhiệt độ 28°C',
    time: '10:03 AM',
  },
];



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

interface Props {}



const ChatScreenWithAI: React.FC<Props> = () => {
 
  const conversationId = 'mockConversationId';


  const [messages, setMessages] = useState<Message[]>(mockHistory);

  
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


  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'User',
      content: inputMessage,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
    };
    
    setMessages(prev => [...prev, newMessage]);
   
    setInputMessage('');

   
    setTimeout(() => {
      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'Assistant',
        content: 'Mình là mock AI, đây là câu trả lời mẫu!',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 1000);
  };

  const handleSendPrompt = (content: string) => {
   
    if (!content.trim()) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'User',
      content,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
    };
    setMessages(prev => [...prev, newMessage]);

    
    setTimeout(() => {
      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'Assistant',
        content: 'Đây là câu trả lời mẫu cho prompt!',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 1000);
  };

  const handleChoosePhoto = () => {
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'User',
      image: 'https://picsum.photos/200/300',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
      {/* Giao diện mock, thay aiChatState.history bằng messages */}
      <View style={{marginHorizontal: 10, marginVertical: 25, width: 200}}>
        <Text>
          Đây là mock conversationId: {conversationId}
        </Text>
      </View>

      {messages.length === 0 && !conversationId && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: '#9CA3AF'}}>
            Type something to start a conversation
          </Text>
        </View>
      )}

      {/* Danh sách lịch sử chat (mockHistory) */}
      <FlatList
        data={messages}
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
          onChangeText={handleChangeText}
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
  suggestionsContainer: {
    position: 'absolute',
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
