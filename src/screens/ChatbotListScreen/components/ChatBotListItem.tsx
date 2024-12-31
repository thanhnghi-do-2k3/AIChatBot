import {useNavigation} from '@react-navigation/native';
import {GlobalConfirmModalController} from 'components/GlobalConfirmModal';
import ScreenName from 'constant/ScreenName';
import dayjs from 'dayjs';
import {chatbotActions} from 'features/chatbot/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface ChatBotListItemProps {
  item: any;
  index: number;
  triggerPublishBot: (toggle: boolean) => void;
  setBot: (bot: any) => void;
}

const ChatBotListItem: React.FC<ChatBotListItemProps> = ({
  item,
  index,
  triggerPublishBot,
  setBot,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const thisSwipeable = React.useRef(null);

  const onDelete = () => {
    // @ts-ignore
    thisSwipeable?.current?.close();
    GlobalConfirmModalController.show({
      header: 'Delete chatbot',
      message: 'Are you sure you want to delete this chatbot?',
      onConfirm: () => {
        dispatch(
          chatbotActions.deleteChatbot({
            data: {
              id: item.id,
            },
            action: {
              onSuccess: () => {
                Toast.show({
                  type: 'success',
                  text1: 'Delete chatbot successfully',
                });
                dispatch(chatbotActions.getChatbot({}));
                // @ts-ignore
              },
              onFailure: () => {
                Toast.show({
                  type: 'error',
                  text1: 'Delete chatbot failed',
                });
                // @ts-ignore
              },
            },
          }),
        );
      },
    });
  };

  const rightAction = useCallback((progress: any, dragX: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 5,
          marginRight: 20,
        }}>
        <TouchableOpacity
          onPress={() => onDelete()}
          style={{
            backgroundColor: 'red',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            width: 70,
            height: '100%',
          }}>
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate(ScreenName.UpdateBotTab, {
              chatbot: item,
            });
            // @ts-ignore
            thisSwipeable?.current?.close();
          }}
          style={{
            backgroundColor: 'green',
            padding: 10,
            justifyContent: 'center',
            borderRadius: 5,
            alignItems: 'center',
            width: 70,
            height: '100%',
          }}>
          <Icon name="pen" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }, []);

  const leftAction = useCallback((progress: any, dragX: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 5,
          marginLeft: 20,
        }}>
        <TouchableOpacity
          onPress={() => onDelete()}
          style={{
            backgroundColor: '#3337c4',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            width: 70,
            height: '100%',
          }}>
          <Icon name="share" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  }, []);

  const onSwipeableOpen = (direction: any) => {
    console.log('onSwipeableOpen', direction);
    if (direction === 'right') {
      triggerPublishBot(true);
      setBot(item);
      // @ts-ignore
      thisSwipeable?.current?.close();
    }
  };

  return (
    <ReanimatedSwipeable
      ref={thisSwipeable}
      renderRightActions={rightAction}
      renderLeftActions={leftAction}
      friction={2}
      rightThreshold={40}
      leftThreshold={10}
      onSwipeableOpen={onSwipeableOpen}
      containerStyle={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'transparent',
          width: '100%',
          marginVertical: 5,
          paddingHorizontal: 10,
          overflow: 'hidden',
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 15,
          paddingHorizontal: 20,
          height: 100,
          width: '100%',
          alignSelf: 'center',
          backgroundColor: '#f6f5fb',
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
          // elevation: 5,
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate(ScreenName.ChatbotDetailScreen, {
              chatbot: item,
            });
          }}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flex: 0.85,
            }}>
            <Icon
              name="robot"
              size={30}
              color={item.BotColor}
              style={{marginRight: 3}}
            />
            <View>
              <Text
                style={{
                  color: '#082745',
                  fontSize: 16,
                  fontWeight: '700',
                  marginLeft: 10,
                  marginBottom: 5,
                }}>
                {item.assistantName}
              </Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  color: '#2A4569',
                  fontSize: 14,
                  fontWeight: '600',
                  marginLeft: 10,
                }}>
                {item.description}
              </Text>
              <Text
                style={{
                  color: '#BDBDBD',
                  fontSize: 12,
                  fontWeight: '600',
                  marginLeft: 10,
                  marginTop: 5,
                }}>
                {dayjs(item.createdAt).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="chevron-right" size={20} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#ccc',
          alignSelf: 'flex-end',
        }}></View> */}
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: '#333',
  },
});

export default memo(ChatBotListItem);
