import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Modal from 'components/Modal';



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

  

  useEffect(() => {
    if (item) {
      setTitle(item.title ?? '');
      setContent(item.content ?? '');
      setDescription(item.description ?? '');
      setCategory(item.category ?? '');
      setLanguage(item.language ?? '');
    }
  }, [item]);

  const handleSubmit = () => {
    // Thay vì dispatch promptActions, ta chỉ console.log hoặc mô phỏng
    console.log('Mock updatePrompt, data: ', {
      id: item?._id,
      title,
      content,
      description,
      category,
      language,
    });

    
    setTimeout(() => {
      
      handleSearch?.(); 
      onClose();        
    }, 1000);

   
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Edit Prompt (Mock)</Text>

        <Input
          placeholder="Prompt Title"
          value={title}
          onChangeText={setTitle}
          inputContainerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Prompt Content"
          value={content}
          multiline
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

export default EditPromptModal;

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
