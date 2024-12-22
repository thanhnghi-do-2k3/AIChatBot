import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {kbActions} from 'features/KB/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

interface CreateKnowledgeModalProps {
  visible: boolean;
  onClose: () => void;
  id: string;
}

const CreateKnowledgeModal: React.FC<CreateKnowledgeModalProps> = ({
  visible,
  onClose,
  id,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (selectedOption === 'url' && name && url) {
      const payload = {
        data: {
          id: id,
          unitName: name,
          webUrl: url,
        },
        action: {
          onSuccess: (data: any) => {
            const unitsPayload = {
              data: {
                id: id,
              },
              action: {
                onSuccess: (data: any) => {},
                onFailure: (error: any) => {},
              },
            };
            dispatch(kbActions.getUnitsKb(unitsPayload));
          },
          onFailure: (error: any) => {},
        },
      };
      dispatch(kbActions.addUrlToKb(payload));
    }
    handleClose();
  };
  const handleReset = () => {
    setSelectedOption(null);
    setName('');
    setUrl('');
  };

  const handleClose = () => {
    handleReset(); // Reset state khi đóng modal
    onClose();
  };
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add Knowledge</Text>
          {selectedOption !== 'url' ? (
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                onPress={() => setSelectedOption('file')}
                style={[
                  styles.optionButton,
                  selectedOption === 'file' && styles.selectedOption,
                ]}>
                <Icon name="file" size={20} color="#000" />
                <Text>From File</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedOption('url')}
                style={[
                  styles.optionButton,
                  selectedOption === 'url' && styles.selectedOption,
                ]}>
                <Icon name="link" size={20} color="#000" />
                <Text>From URL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedOption('github')}
                style={[
                  styles.optionButton,
                  selectedOption === 'github' && styles.selectedOption,
                ]}>
                <Icon name="github" size={20} color="#000" />
                <Text>From GitHub</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedOption('drive')}
                style={[
                  styles.optionButton,
                  selectedOption === 'drive' && styles.selectedOption,
                ]}>
                <Icon name="google-drive" size={20} color="#000" />
                <Text>From Drive</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter URL"
                value={url}
                onChangeText={setUrl}
              />
              <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
                <Button title="Cancel" onPress={handleClose} />
              </View>
            </View>
          )}
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
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 20,
  },
  selectedOption: {
    backgroundColor: '#D3D3D3',
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
    gap: 10,
  },
});

export default CreateKnowledgeModal;
