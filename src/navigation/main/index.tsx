import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScreenName from 'constant/ScreenName';
import ChatbotListScreen from 'screens/ChatbotListScreen';
import KnowledgeListScreen from 'screens/KnowledgeListScreen';
import ProfileScreen from 'screens/ProfileScreen';
import TabBar from 'components/TabBar';
import KnowledgeNavigation from './KnowledgeNavigation';
import ChatbotNavigation from './ChatbotNavigation';
import ChatNavigation from './ChatNavigation';
import EmailNavigation from './EmailNavigation';

const BottomTab = createBottomTabNavigator();

const MainNavigation: React.FC = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={ScreenName.ChatbotListScreen}
      screenOptions={{headerShown: false}}
      tabBar={props => <TabBar {...props} />}>
      <BottomTab.Screen
        name={ScreenName.ChatNavigator}
        component={ChatNavigation}
      />
      <BottomTab.Screen
        name={ScreenName.ChatbotNavigator}
        component={ChatbotNavigation}
      />
      <BottomTab.Screen
        name={ScreenName.KnowledgeNavigator}
        component={KnowledgeNavigation}
      />
      <BottomTab.Screen
        name={ScreenName.EmailNavigator}
        component={EmailNavigation}
      />
      <BottomTab.Screen
        name={ScreenName.ProfileScreen}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
};

export default MainNavigation;
