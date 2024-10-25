import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScreenName from 'constant/ScreenName';
import ChatbotListScreen from 'screens/ChatbotListScreen';
import KnowledgeListScreen from 'screens/KnowledgeListScreen';
import ProfileScreen from 'screens/ProfileScreen';
import TabBar from 'components/TabBar';

const BottomTab = createBottomTabNavigator();

const MainNavigation: React.FC = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={ScreenName.ChatbotListScreen}
      screenOptions={{headerShown: false}}
      tabBar={props => <TabBar {...props} />}>
      <BottomTab.Screen
        name={ScreenName.ChatbotListScreen}
        component={ChatbotListScreen}
      />
      <BottomTab.Screen
        name={ScreenName.KnowlegdeListScreen}
        component={KnowledgeListScreen}
      />
      <BottomTab.Screen
        name={ScreenName.ProfileScreen}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
};

export default MainNavigation;
