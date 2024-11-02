import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Modal from 'components/Modal';

interface PromptUsingModalProps {
  visible: boolean;
  onClose: () => void;
  content: string;
  onSubmitForm: (content: string) => void;
  onSendChat: (content: string) => void;
}

const PromptUsingModal: React.FC<PromptUsingModalProps> = ({
  visible,
  onClose,
  content,
  onSubmitForm,
  onSendChat,
}) => {
  const [params, setParams] = useState<{key: string; value: string}[]>([]);

  useEffect(() => {
    
    const matches = content.match(/\[(.*?)\]/g) || [];
    const extractedParams = matches.map(match => ({
      key: match.slice(1, -1), 
      value: '', 
    }));
    setParams(extractedParams);
  }, [content]);

  const handleInputChange = (key: string, value: string) => {
    setParams(prev =>
      prev.map(param => (param.key === key ? {...param, value} : param)),
    );
  };

  const handleSubmit = () => {
   
    const result = params.reduce(
      (acc, param) =>
        acc.replace(`[${param.key}]`, param.value || `[${param.key}]`),
      content,
    );
    
    const finalResult = result.replace(/\\/g, '');

    
    onSendChat(finalResult);

   
    onClose();
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 16, width: '90%', alignSelf: 'center', maxHeight: 500 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>Fill Parameters (Mock)</Text>

        <ScrollView>
          <Text style={{ color: '#333', marginBottom: 16 }}>{content}</Text>

          {params.map((param) => (
            <View key={param.key} style={{ marginBottom: 16 }}>
              <Text style={{ color: '#555', marginBottom: 4 }}>{param.key}</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  padding: 8,
                  color: '#000',
                }}
                placeholder={param.key}
                value={param.value}
                onChangeText={text => handleInputChange(param.key, text)}
              />
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{ backgroundColor: '#2563EB', padding: 12, borderRadius: 8, marginTop: 12 }}
        >
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} style={{ marginTop: 16, alignSelf: 'center' }}>
          <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PromptUsingModal;
