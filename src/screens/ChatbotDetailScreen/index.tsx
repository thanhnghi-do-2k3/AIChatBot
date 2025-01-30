import AppHeader from 'components/AppHeader';
import {GlobalConfirmModalController} from 'components/GlobalConfirmModal';
import {chatbotActions} from 'features/chatbot/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import usePreventBackButton from 'hooks/usePreventBackButton';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import ThreadChatListItem from './components/ThreadChatListItem';

interface Props {
  route: any;
  navigation: any;
}

const ChatbotDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const [chatName, setChatName] = useState<string>('');
  const [firstMessage, setFirstMessage] = useState<string>('');
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const curThreadChat = useAppSelector(
    state => state.chatbotReducer.curThreadChat,
  );
  const [displayThreadChat, setDisplayThreadChat] = useState<any>([]);

  usePreventBackButton();

  const onSendButtonPress = () => {
    setIsInputVisible(false);
    const payload = {
      data: {
        assistantId: route.params.chatbot.id,
        firstMessage: firstMessage,
      },
      action: {
        onSuccess: (data: any) => {
          Toast.show({
            type: 'success',
            text1: 'Create chat thread successfully',
          });
          setFirstMessage('');
          fetchData();
        },
        onFailure: (error: any) => {
          Toast.show({
            type: 'error',
            text1: 'Create chat thread failed',
          });
        },
      },
    };

    dispatch(chatbotActions.createNewThread(payload));
  };

  const fetchData = () => {
    const payload = {
      data: {
        id: route.params.chatbot.id,
      },
      action: {
        onSuccess: (data: any) => {},
        onFailure: (error: any) => {},
      },
    };

    dispatch(chatbotActions.getThreadChat(payload));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDisplayThreadChat(
      curThreadChat.filter(
        item =>
          item.threadName.toLowerCase().indexOf(chatName.toLowerCase()) !== -1,
      ),
    );
  }, [chatName, curThreadChat]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <AppHeader
        headerTitle="Chatbot Detail"
        onPressLeftHeader={() => {
          navigation.goBack();
          dispatch(chatbotActions.getThreadChatFailure({}));
        }}
        onPressRightHeader={() => {
          GlobalConfirmModalController.show({
            header: 'New Chat Thread',
            message: 'Do you want to create a new chat thread?',
            onConfirm: () => {
              onSendButtonPress();
            },
          });
        }}
        headerRightHeaderIcon={false}
        hideRightHeader={false}
      />
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
            placeholder="Search chat thread"
            placeholderTextColor={'#BDBDBD'}
            value={chatName}
            onChangeText={setChatName}
            leftIcon={{
              type: 'font-awesome',
              name: 'comment',
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
              backgroundColor: '#fff',
              borderRadius: 20,
            }}
          />
        </View>
        <FlatList
          style={{
            width: '100%',
            // flex: 1,
            marginTop: 20,
          }}
          contentContainerStyle={{
            paddingBottom: 20,
            alignItems: 'center',
          }}
          data={displayThreadChat}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item.openAiThreadId}
          renderItem={({item, index}: any) => (
            <ThreadChatListItem item={item} index={index} />
          )}
        />
      </View>
      {/* <Modal
        isVisible={isInputVisible}
        onBackdropPress={() => setIsInputVisible(false)}>
        <Input
          errorStyle={{
            height: 0,
            margin: 0,
          }}
          containerStyle={{
            width: '100%',
            padding: 0,
            margin: 0,
          }}
          multiline
          placeholder="Enter your first message"
          placeholderTextColor={'#BDBDBD'}
          value={firstMessage}
          onChangeText={setFirstMessage}
          leftIcon={{
            type: 'font-awesome',
            name: 'comments',
            color: '#BDBDBD',
          }}
          rightIcon={{
            type: 'font-awesome',
            name: 'send',
            color: '#BDBDBD',
            onPress: onSendButtonPress,
          }}
          inputStyle={{
            marginLeft: 10,
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: '#c3c3c3',
            paddingHorizontal: 20,
            paddingVertical: 5,
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
        />
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // padding: 16,
  },
  input: {
    width: '100%',
    borderColor: '#E8E8E8',
    borderRadius: 8,
    borderWidth: 1,
    // height: 40,
    paddingHorizontal: 8,
    // paddingVertical: 8,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 24,
    width: '100%',
    height: 50,
    backgroundColor: '#264FD3',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptText: {
    color: '#264FD3',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChatbotDetailScreen;
