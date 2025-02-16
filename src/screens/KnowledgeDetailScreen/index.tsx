import AppHeader from 'components/AppHeader';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import {kbActions} from 'features/KB/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {Animated, FlatList, PanResponder, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddKnowledgeModal from './components/AddKnowledgeModal';
import {styles} from './style';

interface Props {}

const KnowledgeDetailScreen: React.FC<Props> = ({navigation, route}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const item = route.params;
  const dispatch = useAppDispatch();
  const listUnits = useAppSelector(state => state.kbReducer.currentKbUnits);
  useEffect(() => {
    console.log('item', item);
    const payload = {
      data: {
        id: item.item.id,
      },
      action: {
        onSuccess: (data: any) => {},
        onFailure: (error: any) => {},
      },
    };

    dispatch(kbActions.getUnitsKb(payload));
  }, []);

  const renderItem = ({item, index}) => {
    // Initialize animated values
    const translateX = new Animated.Value(0);
    const opacity = new Animated.Value(1);

    // Create panResponder with animated translation
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 200) {
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
          ]).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start(() => {});
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
            <Icon name="table" size={30} color={item.PrimaryColor} />
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 10,
                }}>
                {item.name}
              </Text>
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
        <AppHeader
          headerTitle="Knowledge Detail"
          onPressLeftHeader={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.container}>
          <FlatList
            style={{marginTop: 20, width: '100%', flex: 1}}
            data={listUnits}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.name}
            renderItem={renderItem}
          />

          <View
            style={{
              marginBottom: 50,
              width: '100%',
            }}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                setIsModalVisible(true);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Add new knowledge
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </NAvoidKeyboardScreen>
      <AddKnowledgeModal
        id={item.item.id}
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
      />
    </>
  );
};

export default KnowledgeDetailScreen;
