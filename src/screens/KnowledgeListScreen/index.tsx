import React, {useRef, useState, useEffect} from 'react';
import {View, Animated, FlatList, PanResponder} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import ScreenName from 'constant/ScreenName';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import {styles} from './style';
import Header from 'components/Header';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'theme';
import {mockdata} from './mockdata';
import CreateKnowledgeModal from './components/CreateKnowledgeModal';
import Toast from 'react-native-toast-message';
import {kbActions} from 'features/KB/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

interface Props {}

const KnowledgeListScreen: React.FC<Props> = ({navigation}: any) => {
  const [botName, setBotName] = useState('');
  const [data, setData] = useState(mockdata);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const listChatbot = useAppSelector(state => state.kbReducer.listKb);
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

    dispatch(kbActions.getKb(payload));
  }, []);

  const handleDeleteItem = (id: string) => {
    setData(prevData => prevData.filter(item => item.name !== id));
  };

  const [swiping, setSwiping] = useState(false);

  const renderItem = ({item, index}) => {
    // Initialize animated values
    const translateX = new Animated.Value(0);
    const opacity = new Animated.Value(1);
    const getRandomColor = () => {
      // Generates a random color in hexadecimal format
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };
    // Create panResponder with animated translation
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
        setSwiping(prev => true);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 200 && gestureState.dy < 10) {
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: 500,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            handleDeleteItem(item.name);
            setSwiping(prev => false);
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start(() => {
            setSwiping(prev => false);
          });
        }
      },
    });

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            transform: [{translateX}],
            opacity,
          },
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 20,
            marginVertical: 10,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#fff',
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            if (!swiping)
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
            <Icon name="table" size={30} color={getRandomColor()} />
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
      </Animated.View>
    );
  };

  return (
    <>
      <NAvoidKeyboardScreen>
        <Header
          title="Knowledge"
          titleStyle={{color: 'black'}}
          allowGoBack={false}
        />
        <View style={styles.container}>
          <Input
            placeholder="Search knowledge"
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
              borderBottomWidth: 0,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: '#F5F5F5',
              borderRadius: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.primary,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 20,
            }}>
            <Icon name="database" size={30} color="#fff" />
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',
                marginLeft: 10,
              }}>
              Create Knowledge
            </Text>
          </TouchableOpacity>
          <FlatList
            scrollEnabled={!swiping}
            style={{marginTop: 20, width: '100%', flex: 1}}
            data={listChatbot}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.name}
            renderItem={renderItem}
          />
        </View>
      </NAvoidKeyboardScreen>
      <CreateKnowledgeModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        navigation={undefined}
      />
    </>
  );
};

export default KnowledgeListScreen;
