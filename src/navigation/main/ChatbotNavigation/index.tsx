import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatbotListScreen from 'screens/ChatbotListScreen';
import ScreenName from 'constant/ScreenName';

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
    </Stack.Navigator>
  );
};

export default ChatbotNavigation;
