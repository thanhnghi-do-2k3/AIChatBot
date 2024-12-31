import {kbActions} from 'features/KB/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from 'theme/Colors';
import CreateKnowledgeModal from './components/CreateKnowledgeModal';
import KnowledgeListItem from './components/KnowledgeListItem';
import {mockdata} from './mockdata';
import {styles} from './style';

interface Props {}

const KnowledgeListScreen: React.FC<Props> = ({navigation}: any) => {
  const [botName, setBotName] = useState('');
  const [data, setData] = useState(mockdata);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const listKb = useAppSelector(state => state.kbReducer.listKb);
  const isFetching = useAppSelector(state => state.kbReducer.isFetching);
  useEffect(() => {
    getKbData();
  }, []);

  function getKbData() {
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
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          // paddingBottom: 100,
        }}
        // behavior="padding"
        keyboardVerticalOffset={100}
        enabled>
        <View style={styles.container}>
          <Input
            placeholder="Search knowledge"
            placeholderTextColor={'#BDBDBD'}
            value={botName}
            onChangeText={setBotName}
            errorStyle={{
              height: 0,
              margin: 0,
            }}
            containerStyle={{
              width: '100%',
              padding: 0,
              marginTop: 10,
              // marginBottom: 20,
            }}
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
              // paddingVertical: 5,
              backgroundColor: '#fff',
              borderRadius: 999,
            }}
          />
          <FlatList
            style={{width: '100%', flex: 1, marginTop: 5}}
            data={listKb}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <KnowledgeListItem item={item} index={index} />
            )}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => {
                  getKbData();
                }}
              />
            }
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
              // paddingVertical: 12,
              // paddingHorizontal: 20,
              position: 'absolute',
              bottom: 20,
              right: 20,
              height: 60,
              width: 60,
              borderRadius: 999,
            }}>
            <Icon name="database" size={30} color="#fff" />
            {/* <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',
                marginLeft: 10,
              }}>
              Create Knowledge
            </Text> */}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

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
