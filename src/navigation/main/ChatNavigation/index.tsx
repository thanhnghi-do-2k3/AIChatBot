import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatbotListScreen from 'screens/ChatHistoryScreen';
import ScreenName from 'constant/ScreenName';
import ChatHisToryScreen from 'screens/ChatHistoryScreen';

const Stack = createStackNavigator();

const ChatNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.ChatHisToryScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenName.ChatHisToryScreen}
        component={ChatHisToryScreen}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
