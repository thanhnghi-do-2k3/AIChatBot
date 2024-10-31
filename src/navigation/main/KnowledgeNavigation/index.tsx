import {createStackNavigator} from '@react-navigation/stack';
import ScreenName from 'constant/ScreenName';
import KnowledgeDetailScreen from 'screens/KnowledgeDetailScreen';
import KnowledgeListScreen from 'screens/KnowledgeListScreen';

const Stack = createStackNavigator<any>();

const KnowledgeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.KnowlegdeListScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenName.KnowlegdeListScreen}
        component={KnowledgeListScreen}
      />
      <Stack.Screen
        name={ScreenName.KnowledgeDetailScreen}
        component={KnowledgeDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default KnowledgeNavigation;
