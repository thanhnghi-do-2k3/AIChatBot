import ScreenName from 'constant/ScreenName';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const mockConversations = [
  {
    id: '1',
    title: 'Mock Conversation 1',
    avatar: 'https://via.placeholder.com/150',
    createdAt: dayjs().subtract(1, 'hour').unix(),
  },
  {
    id: '2',
    title: 'Mock Conversation 2',
    avatar: 'https://via.placeholder.com/150',
    createdAt: dayjs().subtract(2, 'hours').unix(),
  },
  {
    id: '3',
    title: 'Mock Conversation 3',
    avatar: 'https://via.placeholder.com/150',
    createdAt: dayjs().subtract(3, 'days').unix(),
  },
];

const ChatHistoryScreen: React.FC = ({navigation}: any) => {
  const navigateToChatDetail = (id: string) => {
    navigation.navigate(ScreenName.ChatScreen, {id});
  };

  const [localLoading, setLocalLoading] = useState(false);
  const [conversations, setConversations] = useState(mockConversations);
  const [loading, setLoading] = useState(false); // Mocking loading state
  const [error, setError] = useState(null); // Mocking error state

  useEffect(() => {
    // Simulate fetching mock data
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConversations(mockConversations); // Load mock data
    }, 1000);
  }, []);

  const renderChatItem = ({item}: {item: any}) => (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-2xl mb-4 p-4 shadow-lg hover:shadow-2xl transition duration-300"
      onPress={() => {
        navigateToChatDetail(item.id);
      }}>
      <View className="w-16 h-16 rounded-full bg-primary justify-center items-center shadow-md">
        <Image
          source={{
            uri:
              item.avatar ||
              'https://via.placeholder.com/150',
          }}
          className="w-14 h-14 rounded-full border-4 border-white"
        />
      </View>

      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold text-gray-800">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-500 mt-1" numberOfLines={1}>
          {item.title}
        </Text>
      </View>

      <Text className="text-xs text-gray-400">
        {dayjs.unix(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      behavior="padding"
      keyboardVerticalOffset={100}
      enabled>
      <View className="flex-1" style={{paddingTop: 16}}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#264fd3"
            style={{marginTop: 20}}
          />
        ) : error ? (
          <Text className="text-red-500 text-center mt-10">
            Failed to load conversations
          </Text>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setConversations(mockConversations); // Refresh mock data
                  }, 1000);
                }}
              />
            }
            data={conversations}
            keyExtractor={item => item.id}
            renderItem={renderChatItem}
            contentContainerStyle={{paddingHorizontal: 16, paddingTop: 12}}
          />
        )}

        {/* Nút Tạo Cuộc Trò Chuyện */}
        <TouchableOpacity
          style={{
            zIndex: 999,
          }}
          className="absolute bottom-8 right-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl"
          onPress={() => {
            navigation.navigate(ScreenName.ChatScreen);
          }}>
          <Icon name="chatbubble" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatHistoryScreen;
