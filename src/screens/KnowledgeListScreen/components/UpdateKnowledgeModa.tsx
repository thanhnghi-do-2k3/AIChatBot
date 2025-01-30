import {GlobalLoadingController} from 'components/GlobalLoading';
import Modal from 'components/Modal';
import KbService from 'features/KB/api';
import {kbActions} from 'features/KB/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';

interface UpdateKnowledgeModalProps {
  visible: boolean;
  onClose: () => void;
  kb: any;
}

const UpdateKnowledgeModal: React.FC<UpdateKnowledgeModalProps> = ({
  visible,
  onClose,
  kb,
}) => {
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    GlobalLoadingController.show();
    KbService.updateKb(
      {
        knowledgeName: botName,
        description: description,
      },
      kb.id,
    )
      .then((res: any) => {
        Toast.show({
          type: 'success',
          text1: 'Update knowledge successfully',
        });
      })
      .catch((error: any) => {
        console.log('error', error);
        Toast.show({
          type: 'error',
          text1: 'Update knowledge failed',
          text2: error?.message || '',
        });
      })
      .finally(() => {
        GlobalLoadingController.hide();
        onClose();
        dispatch(kbActions.getKb({}));
      });
  };

  const onReset = () => {
    setBotName('');
    setDescription('');
    onClose();
  };

  const [botName, setBotName] = useState('');

  useEffect(() => {
    console.log('kb', kb);
    if (kb) {
      setBotName(kb.knowledgeName);
      setDescription(kb.description);
    }
  }, [kb, visible]);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      containerStyle={styles.modalContainer}
      style={{
        width: '96%',
      }}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Update Knowledge</Text>
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
            onPress={onReset}
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
            <Text style={{color: 'white'}}>Update</Text>
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

export default UpdateKnowledgeModal;
