import React, {useEffect, useState} from 'react';
import {
  // ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import Modal from 'react-native-modal';
import Modal from 'components/Modal';
import {ScrollView} from 'react-native';

interface PromptUsingModalProps {
  visible: boolean;
  onClose: () => void;
  content: string; // Chuỗi đầu vào dạng: "Hello [param1], your code is [param2]"
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
    // Tìm tất cả các đoạn dạng [param]
    const matches = content.match(/\[(.*?)\]/g) || [];
    const extractedParams = matches.map(match => ({
      key: match.slice(1, -1), // Loại bỏ dấu [ và ]
      value: '', // Giá trị mặc định ban đầu rỗng
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
    //remove all \ or \\ slashes
    const finalResult = result.replace(/\\/g, '');

    // Gọi hàm onSubmitForm ở props
    onSendChat(finalResult); // Gọi hàm onSendChat ở props
    onClose(); // Đóng modal sau khi xử lý
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View className="bg-white rounded-lg p-5 w-11/12 self-center max-h-[500px]">
        <Text className="text-lg font-bold mb-4">Fill Parameters</Text>

        <ScrollView
          // style={{height: 500}}
          // style={{height: 900}}
          // contentContainerStyle={{}}>>
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          <Text className="text-gray-700 mb-4">{content}</Text>

          {params.map(param => (
            <View key={param.key} className="mb-4">
              <Text className="text-gray-500 mb-1">{param.key}</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-black"
                placeholder={param.key}
                value={param.value}
                onChangeText={text => handleInputChange(param.key, text)}
              />
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-500 py-3 mt-4 rounded-lg">
          <Text className="text-center text-white font-bold">Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} className="mt-4 self-center">
          <Text className="text-blue-500 font-bold text-base">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PromptUsingModal;
