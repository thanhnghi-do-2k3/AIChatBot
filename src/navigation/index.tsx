import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenName from 'constant/ScreenName';
import {authActions} from 'features/auth/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import React, {useEffect, useRef} from 'react';
import AuthNavigator from './auth';
import MainNavigation from './main';

const Stack = createStackNavigator<any>();
export const AppNavigationRef = React.createRef() as any;

const ApplicationNavigator = () => {
  const routeNameRef = useRef() as any;
  const isLogged = useAppSelector(state => state.authReducer.isLogged);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogged) {
      dispatch(authActions.getCurrentUser({}));
    }
  }, []);

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
        initialRouteName={
          !isLogged ? ScreenName.AuthNavigator : ScreenName.MainNavigator
        }
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
