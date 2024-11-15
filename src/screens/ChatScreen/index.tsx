import React, {useState} from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import Colors from 'theme/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';

interface Message {
  id: string;
  sender: 'User' | 'AI';
  content?: string;
  image?: string;
  file?: {
    uri: string;
    name: string;
    type: string;
  };
  time: string;
  isTyping?: boolean;
}

const ChatScreenWithAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'AI',
      content: 'Hello! How can I assist you today?',
      time: '10:00 AM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        sender: 'User',
        content: inputMessage,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage('');

      // Simulate AI response with typing animation
      const typingMessage: Message = {
        id: (messages.length + 2).toString(),
        sender: 'AI',
        isTyping: true,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages(prevMessages => [...prevMessages, typingMessage]);

      setTimeout(() => {
        setMessages(prevMessages => prevMessages.filter(msg => !msg.isTyping));

        const aiResponse: Message = {
          id: (messages.length + 3).toString(),
          sender: 'AI',
          content: `You said: "${inputMessage}"`,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 2000);
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

        // Simulate AI response with typing animation
        const typingMessage: Message = {
          id: (messages.length + 2).toString(),
          sender: 'AI',
          isTyping: true,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages(prevMessages => [...prevMessages, typingMessage]);

        setTimeout(() => {
          setMessages(prevMessages =>
            prevMessages.filter(msg => !msg.isTyping),
          ); // Remove the typing message

          const aiResponse: Message = {
            id: (messages.length + 3).toString(),
            sender: 'AI',
            content: 'Nice photo!',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          setMessages(prevMessages => [...prevMessages, aiResponse]);
        }, 2000);
      }
    });
  };

  const handleChooseFile = () => {
    launchImageLibrary({mediaType: 'mixed'}, response => {
      if (response.assets && response.assets.length > 0) {
        const fileAsset = response.assets[0];
        const newMessage: Message = {
          id: (messages.length + 1).toString(),
          sender: 'User',
          file: {
            uri: fileAsset.uri ?? '',
            name: fileAsset.fileName || 'File',
            type: fileAsset.type || 'application/octet-stream',
          },
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        // Simulate AI response with typing animation
        const typingMessage: Message = {
          id: (messages.length + 2).toString(),
          sender: 'AI',
          isTyping: true,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages(prevMessages => [...prevMessages, typingMessage]);

        setTimeout(() => {
          setMessages(prevMessages =>
            prevMessages.filter(msg => !msg.isTyping),
          ); // Remove the typing message

          const aiResponse: Message = {
            id: (messages.length + 3).toString(),
            sender: 'AI',
            content: 'Thanks for the file!',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          setMessages(prevMessages => [...prevMessages, aiResponse]);
        }, 2000);
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
      {/* Avatar */}
      <Image
        source={{
          uri:
            item.sender === 'User'
              ? 'https://randomuser.me/api/portraits/men/1.jpg'
              : 'https://i.pravatar.cc/150?img=AI',
        }}
        style={{width: 40, height: 40, borderRadius: 20}}
      />
      {/* Message Bubble */}
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
        {item.image ? (
          <Image
            source={{uri: item.image}}
            style={{width: 200, height: 200, marginTop: 5}}
            resizeMode="contain"
          />
        ) : null}
        {item.file ? (
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                color: item.sender === 'User' ? 'white' : 'black',
                fontSize: 14,
                textDecorationLine: 'underline',
              }}>
              {item.file.name}
            </Text>
          </TouchableOpacity>
        ) : null}
        <Text style={{fontSize: 10, color: '#808080', marginTop: 5}}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <NAvoidKeyboardScreen>
      {/* Header */}
      <View
        style={{
          height: 70,
          backgroundColor: Colors.primary,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        }}>
        {/* Back Button */}
        <TouchableOpacity style={{marginRight: 10}}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        {/* Center Title */}
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Chat with AI
          </Text>
        </View>
        <Icon name="robot" size={24} color="white" style={{marginRight: 10}} />
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: 10}}
      />

      {/* Input Area */}
      <View
        style={{
          flexDirection: 'column',
          padding: 10,
        }}>
        {/* Upload Icons */}
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,

            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* Image Upload Button */}
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,

              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={handleChoosePhoto}
              style={{marginHorizontal: 10}}>
              <Icon name="image" size={20} color={Colors.primary} />
            </TouchableOpacity>

            {/* File Upload Button */}
            <TouchableOpacity
              onPress={handleChooseFile}
              style={{marginHorizontal: 10}}>
              <Icon name="file" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Styled Dropdown */}
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={{
              width: 100, // Adjust width as needed
              borderRadius: 20, // Rounded edges
            }}
            style={{
              borderColor: 'transparent',
              borderRadius: 20, // Rounded edges for the pill shape
              paddingHorizontal: 10,
              height: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}
            dropDownContainerStyle={{
              borderColor: '#E0E0E0',

              // Adjust height as needed
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 20,
              backgroundColor: '#F5F5F5',
            }}>
            <TextInput
              style={{
                flex: 1,
                padding: 20,
              }}
              placeholder="Type a message"
              value={inputMessage}
              onChangeText={setInputMessage}
            />
            <TouchableOpacity onPress={handleSend} style={{marginRight: 10}}>
              <Icon name="paper-plane" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default ChatScreenWithAI;
