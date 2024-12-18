import {createStackNavigator} from '@react-navigation/stack';
import ScreenName from 'constant/ScreenName';
import React from 'react';
import ChatbotListScreen from 'screens/ChatbotListScreen';
import CreateChatBotModal from 'screens/ChatbotListScreen/components/CreateChatBotModal';

const Stack = createStackNavigator();

const ChatbotNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.ChatbotListScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenName.ChatbotListScreen}
        component={ChatbotListScreen}
      />
      <Stack.Screen
        name={ScreenName.CreateBotTab}
        component={CreateChatBotModal}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default ChatbotNavigation;
