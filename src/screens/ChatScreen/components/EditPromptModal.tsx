import {promptActions} from 'features/prompt/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Modal from 'components/Modal';
import Toast from 'react-native-toast-message';

interface EditPromptModalProps {
  visible: boolean;
  onClose: () => void;
  item?: any;
  handleSearch?: () => void;
}

const EditPromptModal: React.FC<EditPromptModalProps> = ({
  visible,
  onClose,
  item,
  handleSearch,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setContent(item.content);
      setDescription(item.description);
      setCategory(item.category);
      setLanguage(item.language);
    }
  }, [item]);

  const handleSubmit = () => {
    const editPromptPayload = {
      data: {
        id: item?._id,
        title: title,
        content: content,
        description: description,
        category: category,
        isPublic: item?.isPublic,
        language: language,
      },
      action: {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Prompt edited successfully',
          });
          handleSearch?.();
          onClose();
        },
        onFailure: (error: any) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to edit prompt',
            text2: error?.data?.details?.[0]?.issue,
          });
        },
      },
    };
    dispatch(promptActions.updatePrompt(editPromptPayload));
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View className="py-16">
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
          <Button title="Cancel" onPress={onClose} />
          <Button title="Submit" onPress={handleSubmit} />
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

export default EditPromptModal;
