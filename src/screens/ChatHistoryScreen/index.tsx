import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/store';
import {conversationActions} from 'features/conversation/reducer';

import dayjs from 'dayjs';
import ScreenName from 'constant/ScreenName';

const ChatHistoryScreen: React.FC = ({navigation}: any) => {
  const dispatch = useDispatch();

  const navigateToChatDetail = () => {
    navigation.navigate(ScreenName.MainNavigator, {
      screen: ScreenName.ChatScreen,
    });
  };

  const {conversations, loading, error} = useSelector(
    (state: RootState) => state.conversationReducer,
  );

  useEffect(() => {
    dispatch(conversationActions.fetchConversationsRequest());
  }, [dispatch]);

  const renderChatItem = ({item}: {item: any}) => (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-2xl mb-4 p-4 shadow-lg hover:shadow-2xl transition duration-300"
      onPress={() => {
        navigateToChatDetail();
      }}>
      <View className="w-16 h-16 rounded-full bg-primary justify-center items-center shadow-md">
        <Image
          source={{
            uri:
              item.avatar ||
              'https://www.shutterstock.com/shutterstock/photos/2464455965/display_1500/stock-vector-happy-robot-d-ai-character-chat-bot-mascot-isolated-on-white-background-gpt-chatbot-icon-2464455965.jpg',
          }}
          className="w-14 h-14 rounded-full border-4 border-white"
        />
      </View>

      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold text-gray-800">
          Conversation
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
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={['#020024', '#264fd3', '#00d4ff']}
        locations={[0.05, 0.69, 1]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
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
          data={conversations}
          keyExtractor={item => item.id}
          renderItem={renderChatItem}
          contentContainerStyle={{paddingHorizontal: 16, paddingTop: 12}}
        />
      )}

      {/* Nút Tạo Cuộc Trò Chuyện */}
      <TouchableOpacity className="absolute bottom-8 right-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl">
        <Icon name="chatbubble" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHistoryScreen;
