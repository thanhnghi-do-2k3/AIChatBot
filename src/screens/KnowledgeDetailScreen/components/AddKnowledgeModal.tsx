import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Touchable,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
          <Text style={styles.title}>Add Knowledge</Text>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 20,
              gap: 20,
            }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F5F5F5',
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 20,
                gap: 20,
              }}>
              <Icon name="file" size={20} color="#000" />
              <Text>From File</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F5F5F5',
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 20,
                gap: 20,
              }}>
              <Icon name="link" size={20} color="#000" />
              <Text>From URL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F5F5F5',
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 20,
                gap: 20,
              }}>
              <Icon name="github" size={20} color="#000" />
              <Text>From Github</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F5F5F5',
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 20,
                gap: 20,
              }}>
              <Icon name="google-drive" size={20} color="#000" />
              <Text>From Drive</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} />
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
    alignSelf: 'center',
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
    justifyContent: 'flex-end',
  },
});

export default CreateKnowledgeModal;
