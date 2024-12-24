import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import useAppDispatch from 'hooks/useAppDispatch';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface ThreadChatListItemProps {
  item: any;
  index: number;
}

const ThreadChatListItem: React.FC<ThreadChatListItemProps> = ({
  item,
  index,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const thisSwipeable = React.useRef(null);

  return (
    <ReanimatedSwipeable
      ref={thisSwipeable}
      // renderRightActions={rightAction}
      // renderLeftActions={leftAction}
      // friction={2}
      // onSwipeableOpen={onSwipeableOpen}
      containerStyle={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'transparent',
          width: '100%',
          marginVertical: 5,
          marginHorizontal: 5,
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
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            // navigation.navigate(ScreenName.ChatbotDetailScreen, {
            //   chatbot: item,
            // });
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
              name="comments"
              size={30}
              color={item.BotColor}
              style={{marginRight: 3}}
            />
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 10,
                  marginBottom: 5,
                }}>
                {'Thread ' + (index + 1) + '_'}
                {(item.openAiThreadId as string).slice(6, 15)}
              </Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  color: '#BDBDBD',
                  fontSize: 14,
                  fontWeight: '600',
                  marginLeft: 10,
                }}>
                {item.openAiThreadId}
              </Text>
              <Text
                style={{
                  color: '#BDBDBD',
                  fontSize: 12,
                  fontWeight: '600',
                  marginLeft: 10,
                  marginTop: 5,
                }}>
                {dayjs(item.updateAt).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="chevron-right" size={20} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#ccc',
          alignSelf: 'flex-end',
        }}></View>
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

export default ThreadChatListItem;
