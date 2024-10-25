import React, {useEffect, useRef} from 'react';
import {Platform, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './auth';

const Stack = createStackNavigator<any>();
const AppNavigationRef = React.createRef() as any;

const ApplicationNavigator = () => {
  const routeNameRef = useRef() as any;
  console.log('ApplicationNavigator loaded');
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
        initialRouteName="Auth"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
