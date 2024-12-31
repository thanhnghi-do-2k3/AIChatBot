import Modal from 'components/Modal';
import {kbActions} from 'features/KB/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';

interface CreateKnowledgeModalProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
}

const CreateKnowledgeModal: React.FC<CreateKnowledgeModalProps> = ({
  visible,
  onClose,
  navigation,
}) => {
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    console.log('handleSubmit');
    const createKbPayload = {
      data: {
        knowledgeName: botName,
        description: description,
      },

      action: {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Create KB successfully',
          });
          dispatch(kbActions.getKb({}));
          onReset();
          onClose();
        },
        onFailure: (error: any) => {
          Toast.show({
            type: 'error',
            text1: 'Create KB failed',
            text2: error?.data?.details?.[0].issue,
          });
        },
      },
    };
    //console.log('createKbPayload', createKbPayload);
    dispatch(kbActions.createKb(createKbPayload));
    //onClose();
  };

  const onReset = () => {
    setBotName('');
    setDescription('');
  };

  const [botName, setBotName] = useState('');

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      containerStyle={styles.modalContainer}
      style={{
        width: '96%',
      }}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Create Knowledge</Text>
        <Input
          placeholder="Knowledge Name"
          placeholderTextColor={'#BDBDBD'}
          value={botName}
          onChangeText={setBotName}
          leftIcon={{
            type: 'font-awesome-5',
            name: 'robot',
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
        <Input
          numberOfLines={3}
          multiline={true}
          placeholder="Knowledge Description"
          placeholderTextColor={'#BDBDBD'}
          value={description}
          onChangeText={setDescription}
          leftIcon={{
            type: 'font-awesome',
            name: 'book',
            color: '#BDBDBD',
          }}
          inputStyle={{
            marginLeft: 10,
            height: 100,
          }}
          inputContainerStyle={{
            alignItems: 'flex-start',
            borderBottomWidth: 0,
            paddingHorizontal: 20,
            paddingVertical: 5,
            backgroundColor: '#F5F5F5',
            borderRadius: 20,
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              // height: 40,
              backgroundColor: '#E0E0E0',
              borderRadius: 999,
              justifyContent: 'center',
              alignItems: 'center',
              width: '45%',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              // height: 40,
              backgroundColor: '#264FD3',
              borderRadius: 999,
              justifyContent: 'center',
              alignItems: 'center',
              width: '45%',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Text style={{color: 'white'}}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalContent: {
    alignSelf: 'center',
    width: '95%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CreateKnowledgeModal;
