import {useNavigation} from '@react-navigation/native';
import {GlobalConfirmModalController} from 'components/GlobalConfirmModal';
import ScreenName from 'constant/ScreenName';
import dayjs from 'dayjs';
import {kbActions} from 'features/KB/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
interface KnowledgeListItemProps {
  item: any;
  index: number;
  toggleModal: (kb: any) => void;
}

const KnowledgeListItem: React.FC<KnowledgeListItemProps> = ({
  item,
  index,
  toggleModal,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const thisSwipeable = React.useRef(null);
  const onDelete = () => {
    // @ts-ignore
    thisSwipeable?.current?.close();
    GlobalConfirmModalController.show({
      header: 'Delete knowledge',
      message: 'Are you sure you want to delete this knowledge?',
      onConfirm: () => {
        const payload = {
          data: {
            id: item.id,
          },
          action: {
            onSuccess: (data: any) => {
              const payload = {
                data: {},
                action: {
                  onSuccess: (data: any) => {},
                  onFailure: (error: any) => {},
                },
              };

              dispatch(kbActions.getKb(payload));
            },
            onFailure: (error: any) => {},
          },
        };
        dispatch(kbActions.deleteKb(payload));
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
            toggleModal(item);
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
          marginVertical: 5,
          paddingHorizontal: 10,
          overflow: 'hidden',
        },
      ]}>
      <View
        style={[
          {
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
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate(ScreenName.KnowledgeDetailScreen, {
              item: item,
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
            <Icon name="table" size={30} color={'black'} />
            <View>
              <Text
                style={{
                  color: '#082745',
                  fontSize: 16,
                  fontWeight: '700',
                  marginLeft: 10,
                  marginBottom: 5,
                }}>
                {item.knowledgeName}
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
                  {dayjs(item.createdAt).format('DD/MM/YYYY')}
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
