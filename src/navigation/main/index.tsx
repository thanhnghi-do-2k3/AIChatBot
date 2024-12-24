import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppHeader from 'components/AppHeader';
import TabBar from 'components/TabBar';
import ScreenName from 'constant/ScreenName';
import React from 'react';
import ProfileScreen from 'screens/ProfileScreen';
import Image from 'theme/Image';
import ChatbotNavigation from './ChatbotNavigation';
import ChatNavigation from './ChatNavigation';
import EmailNavigation from './EmailNavigation';
import KnowledgeNavigation from './KnowledgeNavigation';
import PromptNavigation from './PromptNavigation';

const BottomTab = createBottomTabNavigator();

const MainNavigation: React.FC = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({navigation, route}) => {
        // Get the current state of the child navigator
        const state = navigation.getState();
        const currentScreen = state?.routes?.find(r => r.name === route.name)
          ?.state?.routes?.[state.index]?.name;

        // Determine if header should be shown
        const shouldHideHeader = currentScreen && currentScreen !== route.name;

        return {
          header: shouldHideHeader
            ? () => null
            : () => (
                <AppHeader
                  headerImageSrc={Image.appIconCrop}
                  hidenLeftHeader={true}
                  onPressLeftHeader={() => {}}
                />
              ),
        };
      }}
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
        name={ScreenName.PromptNavigator}
        component={PromptNavigation}
      />
      <BottomTab.Screen
        name={ScreenName.ProfileScreen}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
};

export default MainNavigation;
