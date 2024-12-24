import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import ScreenName from 'constant/ScreenName';
import React from 'react';
import ChatbotDetailScreen from 'screens/ChatbotDetailScreen';
import ChatbotListScreen from 'screens/ChatbotListScreen';
import CreateChatBotModal from 'screens/ChatbotListScreen/components/CreateChatBotModal';
import UpdateChatBotModal from 'screens/ChatbotListScreen/components/UpdateChatBotModal';
import ChatbotThreadChatScreen from 'screens/ChatbotThreadChatScreen';

const Stack = createStackNavigator();

const ChatbotNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.ChatbotListScreen}
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: {
            animation: 'timing',
            config: {
              duration: 150,
            },
          },
        },
      }}>
      <Stack.Screen
        name={ScreenName.ChatbotListScreen}
        component={ChatbotListScreen}
      />
      <Stack.Screen
        name={ScreenName.ChatbotDetailScreen}
        component={ChatbotDetailScreen}
      />
      <Stack.Screen
        name={ScreenName.ChatbotThreadChatScreen}
        component={ChatbotThreadChatScreen}
      />
      <Stack.Screen
        name={ScreenName.CreateBotTab}
        component={CreateChatBotModal}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name={ScreenName.UpdateBotTab}
        component={UpdateChatBotModal}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default ChatbotNavigation;
