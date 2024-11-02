import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Modal from 'components/Modal'; 




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

 

  const handleSubmit = () => {
 
    const createPromptPayload = {
      data: {
        title,
        content,
        description,
        category,
        isPublic: false,
        language: 'English',
      },
    };

    console.log('Mock createPromptPayload:', createPromptPayload);

    // Giả lập "gọi API" thành công
    setTimeout(() => {
      

      // Gọi hàm tìm kiếm nếu cần (để refresh list hay gì đó)
      handleSearch?.();

      // Đóng modal
      onClose();
    }, 1000);

   
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Create Prompt (Mock)</Text>
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
          <Button title="Create" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default CreatePromptModal;

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
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
