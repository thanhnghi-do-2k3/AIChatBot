import {kbActions} from 'features/KB/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Modal from 'react-native-modal';
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

  const [botName, setBotName] = useState('');

  return (
    <Modal
      hideModalContentWhileAnimating
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp">
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
          <Button title="Cancel" onPress={onClose} />
          <Button title="Create" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CreateKnowledgeModal;
