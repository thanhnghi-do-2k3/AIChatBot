import Modal from 'components/Modal';
import {promptActions} from 'features/prompt/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';

interface CreatePromptModalProps {
  visible: boolean;
  onClose: () => void;
  handleSearch?: () => void;
}

const CreatePromptModal: React.FC<CreatePromptModalProps> = ({
  visible,
  onClose,
  handleSearch,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const createPromptPayload = {
      data: {
        title: title,
        content: content,
        description: description,
        category: category,
        isPublic: false,
        language: 'English',
      },
      action: {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Prompt created successfully',
          });
          handleSearch?.();
          onClose();
        },
        onFailure: (error: any) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to create prompt',
            text2: error?.data?.details?.[0]?.issue,
          });
        },
      },
    };
    dispatch(promptActions.createPrompt(createPromptPayload));
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      containerStyle={{
        width: '90%',
      }}>
      <View
        className="py-8"
        style={{
          width: '100%',
        }}>
        {/* <View> */}
        <Text style={styles.title}>Create Prompt</Text>
        <Input
          placeholder="Prompt Title"
          value={title}
          onChangeText={setTitle}
          inputContainerStyle={styles.inputContainer}
        />
        <Input
          placeholder="Prompt Content"
          value={content}
          multiline={true}
          numberOfLines={5}
          onChangeText={setContent}
          inputStyle={styles.textArea}
          inputContainerStyle={styles.inputContainer}
        />
        <Input
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          inputContainerStyle={styles.inputContainer}
        />
        <Input
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          inputContainerStyle={styles.inputContainer}
        />
        <Input
          placeholder="Language"
          value={language}
          onChangeText={setLanguage}
          inputContainerStyle={styles.inputContainer}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: '#F5F5F5',
              padding: 10,
              width: '45%',
              paddingVertical: 12,
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: '#000',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: '#28C68B',
              padding: 10,
              paddingVertical: 12,
              width: '45%',
              alignItems: 'center',

              borderRadius: 20,
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: '#fff',
              }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CreatePromptModal;
