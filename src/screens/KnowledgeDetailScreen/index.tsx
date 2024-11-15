import React, {useState} from 'react';
import {View, Animated, FlatList, PanResponder} from 'react-native';
import {
  GestureHandlerRootView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import ScreenName from 'constant/ScreenName';
import NAvoidKeyboardScreen from 'components/NAvoidKeyboardScreen';
import Header from 'components/Header';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'theme';
import {styles} from './style';
import {mockData} from './mockdata';
import {useCallback, useRef} from 'react';
import AddKnowledgeModal from './components/AddKnowledgeModal';

interface Props {}

const KnowledgeDetailScreen: React.FC<Props> = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
                  {item.source}
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
          title="Knowledge Detail"
          titleStyle={{color: 'black'}}
          allowGoBack={true}
        />
        <View style={styles.container}>
          <FlatList
            style={{marginTop: 20, width: '100%', flex: 1}}
            data={mockData}
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
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
      />
    </>
  );
};

export default KnowledgeDetailScreen;
