import ScreenName from 'constant/ScreenName';
import {chatbotActions} from 'features/chatbot/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
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

  useEffect(() => {
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
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
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
              marginTop: 20,
            }}>
            <Input
              errorStyle={{
                height: 0,
                margin: 0,
              }}
              containerStyle={{
                width: '70%',
                padding: 0,
                margin: 0,
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
                paddingVertical: 5,
                backgroundColor: '#E5E5E5',
                borderRadius: 20,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.CreateBotTab);
              }}
              style={{
                flexDirection: 'row',
                backgroundColor: '#73b9eecc',
                paddingVertical: 17,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}>
              <Icon
                name="plus"
                size={20}
                color="#000000aa"
                style={{
                  marginRight: 5,
                }}
              />
              <Icon name="robot" size={20} color="#000000aa" />
            </TouchableOpacity>
          </View>
          <FlatList
            style={{width: '100%', flex: 1, marginTop: 20}}
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
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatbotListScreen;
