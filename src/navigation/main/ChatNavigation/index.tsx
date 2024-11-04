import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import ScreenName from 'constant/ScreenName';

import ChatScreen from 'screens/ChatScreen';
import ChatHistoryScreen from 'screens/ChatHistoryScreen';

const Stack = createStackNavigator();

const ChatNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.ChatHistoryScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenName.ChatHistoryScreen}
        component={ChatHistoryScreen}
      />

      <Stack.Screen name={ScreenName.ChatScreen} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigation;