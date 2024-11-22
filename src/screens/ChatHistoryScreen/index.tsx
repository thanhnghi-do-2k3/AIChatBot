import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

type ChatItem = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
};

const ChatHistoryScreen: React.FC = () => {
  const chatHistory: ChatItem[] = [
    {
      id: '1',
      name: 'Rose Carr',
      avatar: 'https://via.placeholder.com/50',
      lastMessage: 'Project Dev mobile finished ...?',
      timestamp: '06:32',
    },
    {
      id: '2',
      name: 'Etta McDaniel',
      avatar: 'https://via.placeholder.com/50',
      lastMessage: 'I don’t think I can join later in...',
      timestamp: '07:00',
    },
    {
      id: '3',
      name: 'Loretta Russell',
      avatar: 'https://via.placeholder.com/50',
      lastMessage: 'Bro, will you be busy tonight?',
      timestamp: '08:00',
    },
    {
      id: '4',
      name: 'Ahmad Syarif',
      avatar: 'https://via.placeholder.com/50',
      lastMessage: 'Wow, I don’t know, sir, yesterday...',
      timestamp: 'Yesterday',
    },
    {
      id: '5',
      name: 'Betty Pearson',
      avatar: 'https://via.placeholder.com/50',
      lastMessage: 'Sir, I want a leave of absence next...',
      timestamp: '12 Jun',
    },
  ];

  const renderChatItem = ({item}: {item: ChatItem}) => (
    <TouchableOpacity className="flex-row items-center bg-white rounded-2xl mb-4 p-4 shadow-lg hover:shadow-2xl transition duration-300">
      <View className="w-16 h-16 rounded-full bg-primary justify-center items-center shadow-md">
        <Image
          source={{uri: item.avatar}}
          className="w-14 h-14 rounded-full border-4 border-white"
        />
      </View>

      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
        <Text className="text-sm text-gray-500 mt-1" numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      <Text className="text-xs text-gray-400">{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with gradient background */}
      <LinearGradient
        colors={['#020024', '#264fd3', '#00d4ff']} // Colors from the image
        locations={[0.05, 0.69, 1]} // Stops: 14%, 69%, 100%
        start={{x: 0, y: 0}} // Start from top-left
        end={{x: 1, y: 0}} // End at top-right
        className="py-6 px-6 rounded-b-3xl shadow-xl flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-white text-shadow-lg">
          Chatting Room
        </Text>
        <View className="flex-row space-x-5">
          <TouchableOpacity>
            <Icon name="search" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="notifications" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="settings" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <FlatList
        data={chatHistory}
        keyExtractor={item => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 12}}
      />

      {/* Bottom action button */}
      <TouchableOpacity className="absolute bottom-8 right-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl">
        <Icon name="chatbubble" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHistoryScreen;
