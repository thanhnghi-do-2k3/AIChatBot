import {GlobalModalController} from 'components/GlobalModal';
import Header from 'components/Header';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import ScreenName from 'constant/ScreenName';
import {authActions} from 'features/auth/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import {AppNavigationRef} from 'navigation/index';
import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';

interface Props {
  // Define your component's props here
}

const ProfileScreen: React.FC<Props> = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  return (
    <NAvoidKeyboardScreen>
      <Header
        title="Profile"
        titleStyle={{color: 'black'}}
        allowGoBack={false}
      />
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Not implemented yet</Text>
        </View>

        <View
          style={{
            marginBottom: 50,
            width: '100%',
          }}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              dispatch(
                authActions.logoutRequest({
                  action: {
                    onSuccess: () => {
                      AppNavigationRef.current?.reset({
                        index: 0,
                        routes: [
                          {
                            name: ScreenName.AuthNavigator,
                            screen: ScreenName.Login,
                          },
                        ],
                      });
                    },
                    onFailure: (error: any) => {
                      GlobalModalController.show({
                        header: 'Lỗi',
                        message: 'Lỗi không xác định',
                      });
                    },
                  },
                }),
              );
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
              }}>
              Go back to login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </NAvoidKeyboardScreen>
  );
};

export default ProfileScreen;
