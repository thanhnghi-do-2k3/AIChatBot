import React, {useState} from 'react';
import {Modal, View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

interface CreateKnowledgeModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateKnowledgeModal: React.FC<CreateKnowledgeModalProps> = ({
  visible,
  onClose,
}) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Add your logic to handle form submission here
    // For example, you can make an API call to create a new chatbot
    // and then close the modal
    onClose();
  };

  const [botName, setBotName] = useState('');

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create Chatbot</Text>
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
