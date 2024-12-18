import dayjs from 'dayjs';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface ChatBotListItemProps {
  item: any;
  index: number;
}

const ChatBotListItem: React.FC<ChatBotListItemProps> = ({item, index}) => {
  const rightAction = useCallback((progress: any, dragX: any, item: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 5,
        }}>
        <TouchableOpacity
          onPress={() => {}}
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
          onPress={() => {}}
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

  return (
    <ReanimatedSwipeable
      renderRightActions={rightAction}
      containerStyle={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'transparent',
          width: '100%',
          marginVertical: 5,
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
          backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#fff',
        }}>
        <TouchableOpacity
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
            <Icon name="robot" size={30} color={item.BotColor} />
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 10,
                  marginBottom: 5,
                }}>
                {item.assistantName}
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

export default ChatBotListItem;
