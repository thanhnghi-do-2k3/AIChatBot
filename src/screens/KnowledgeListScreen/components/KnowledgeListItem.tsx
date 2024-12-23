import {useNavigation} from '@react-navigation/native';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface KnowledgeListItemProps {
  item: any;
  index: number;
}

const KnowledgeListItem: React.FC<KnowledgeListItemProps> = ({item, index}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const thisSwipeable = React.useRef(null);

  const rightAction = useCallback((progress: any, dragX: any) => {
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
          onPress={() => onDelete()}
          style={{
            backgroundColor: 'red',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            width: 70,
            height: '50%',
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
            height: '50%',
          }}>
          <Icon name="pen" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <ReanimatedSwipeable
      ref={thisSwipeable}
      renderRightActions={rightAction}
      containerStyle={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'transparent',
          width: '100%',
          // paddingVertical: 15,
          // paddingHorizontal: 20,
        },
      ]}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 20,
            marginVertical: 5,
            width: '100%',
            alignSelf: 'center',
            backgroundColor: '#fff',
          },
        ]}>
        <TouchableOpacity
          onPress={() => {}}
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
            <Icon name="table" size={30} color={'black'} />
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 10,
                }}>
                {item.knowledgeName}
              </Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  color: 'gray',
                  fontSize: 14,
                  fontWeight: '600',
                  marginLeft: 10,
                }}>
                {item.description}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#BDBDBD',
                    fontSize: 12,
                    fontWeight: '600',
                    marginLeft: 10,
                    marginTop: 5,
                  }}>
                  {item.createdAt}
                </Text>
                <Text
                  style={{
                    color: '#BDBDBD',
                    fontSize: 12,
                    fontWeight: '600',
                    marginLeft: 10,
                    marginTop: 5,
                  }}>
                  {item.size}
                </Text>
              </View>
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

export default KnowledgeListItem;
