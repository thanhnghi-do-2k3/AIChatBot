import React, {useEffect, useRef} from 'react';
import {LogBox, Platform, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './auth';
import MainNavigation from './main';
import ScreenName from 'constant/ScreenName';

const Stack = createStackNavigator<any>();
export const AppNavigationRef = React.createRef() as any;

const ApplicationNavigator = () => {
  const routeNameRef = useRef() as any;
  return (
    <NavigationContainer
      ref={AppNavigationRef}
      onReady={() =>
        (routeNameRef.current = AppNavigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        const previousRouteName = routeNameRef?.current;
        const currentRouteName =
          AppNavigationRef?.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          console.log('currentScreen', currentRouteName);
        }

        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        initialRouteName={ScreenName.AuthNavigator}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={ScreenName.AuthNavigator}
          component={AuthNavigator}
        />
        <Stack.Screen
          name={ScreenName.MainNavigator}
          component={MainNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
