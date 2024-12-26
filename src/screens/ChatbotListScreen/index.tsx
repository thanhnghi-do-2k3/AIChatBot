import ScreenName from 'constant/ScreenName';
import {chatbotActions} from 'features/chatbot/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from 'theme/Colors';
import ChatBotListItem from './components/ChatBotListItem';
import {styles} from './style';

interface Props {}

const ChatbotListScreen: React.FC<Props> = ({navigation}: any) => {
  const [botName, setBotName] = useState<string>('');
  const dispatch = useAppDispatch();
  const listChatbot = useAppSelector(state => state.chatbotReducer.listChatbot);
  const displayChatbot = React.useMemo(
    () =>
      listChatbot.filter(
        item =>
          item.assistantName.toLowerCase().indexOf(botName.toLowerCase()) !==
          -1,
      ),
    [listChatbot, botName],
  );

  function fetchChatbotData() {
    const payload = {
      data: {},
      action: {
        onSuccess: (data: any) => {},
        onFailure: (error: any) => {
          Toast.show({
            type: 'error',
            text1: 'Get chatbot failed',
          });
        },
      },
    };

    dispatch(chatbotActions.getChatbot(payload));
  }

  useEffect(() => {
    fetchChatbotData();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          // paddingBottom: 80,
        }}
        behavior="padding"
        keyboardVerticalOffset={100}
        enabled>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              // marginTop: 20,
            }}>
            <Input
              errorStyle={{
                height: 0,
                margin: 0,
              }}
              containerStyle={{
                width: '100%',
                padding: 0,
                margin: 0,
                marginTop: 10,
              }}
              placeholder="Search chatbot"
              placeholderTextColor={'#BDBDBD'}
              value={botName}
              onChangeText={setBotName}
              leftIcon={{
                type: 'font-awesome',
                name: 'search',
                color: '#BDBDBD',
              }}
              inputStyle={{
                marginLeft: 10,
              }}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: '#c3c3c3',
                paddingHorizontal: 20,
                // paddingVertical: 5,
                backgroundColor: '#fff',
                borderRadius: 999,
              }}
            />
          </View>
          <FlatList
            style={{width: '100%', flex: 1, marginTop: 5}}
            contentContainerStyle={{
              paddingBottom: 20,
              alignItems: 'center',
            }}
            data={displayChatbot}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.chatbotName}
            renderItem={({item, index}) => (
              <ChatBotListItem item={item} index={index} />
            )}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={fetchChatbotData} />
            }
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenName.CreateBotTab);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.primary,
              // paddingVertical: 12,
              // paddingHorizontal: 20,
              position: 'absolute',
              bottom: 20,
              right: 20,
              height: 60,
              width: 60,
              borderRadius: 999,
            }}>
            {/* <Icon
              name="plus"
              size={20}
              color="#000000aa"
              style={{
                marginRight: 5,
              }}
            /> */}
            <Icon name="robot" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatbotListScreen;
