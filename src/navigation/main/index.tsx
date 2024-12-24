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

const BottomTab = createBottomTabNavigator();

const MainNavigation: React.FC = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({navigation, route}) => {
        // Get the current state of the child navigator
        const state = navigation.getState();

        // Find the child navigator's routes
        const childRoutes = state?.routes?.find(
          (r: any) => r.name === route.name,
        )?.state?.routes;

        // Get the initial route name of the child navigator
        const initialRouteName = childRoutes?.[0]?.name;

        // Get the currently active screen in the child navigator
        const currentScreen =
          childRoutes?.[
            state?.routes?.find((r: any) => r.name === route.name)?.state?.index
          ]?.name;

        // Determine if the header should be hidden
        const shouldHideHeader =
          currentScreen && currentScreen !== initialRouteName;

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
        name={ScreenName.ProfileScreen}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
};

export default MainNavigation;
