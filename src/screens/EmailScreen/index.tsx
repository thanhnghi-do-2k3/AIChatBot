import React, {useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

const EmailScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [emailContent, setEmailContent] = useState('');
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Formal');
  const [length, setLength] = useState('Medium');
  const [formality, setFormality] = useState('Formal');
  const toneOptions = [
    {label: 'Friendly', emoji: '😊'},
    {label: 'Witty', emoji: '😄'},
    {label: 'Direct', emoji: '😎'},
    {label: 'Personable', emoji: '🤗'},
    {label: 'Informational', emoji: '📚'},
    {label: 'Confident', emoji: '😌'},
    {label: 'Sincere', emoji: '🤝'},
    {label: 'Enthusiastic', emoji: '😃'},
    {label: 'Optimistic', emoji: '☀️'},
    {label: 'Concerned', emoji: '😟'},
    {label: 'Empathetic', emoji: '😔'},
  ];
  const lengthOptions = ['Short', 'Medium', 'Long'];

  const formalityOptions = [
    {label: 'Formal', emoji: '👔'},
    {label: 'Informal', emoji: '👕'},
    {label: 'Casual', emoji: '👟'},
  ];

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [listIdeas, setListIdeas] = useState([]);
  const [emailResponse, setEmailResponse] = useState('');

  const generateSuggestions = () => {
    setListIdeas([
      'Thank you for reaching out to us. We appreciate your interest in our products.',
      'I understand your concern and will do my best to assist you.',
      'We apologize for the inconvenience. We will look into this matter and get back to you as soon as possible.',
    ]);
  };

  const generateDetailedReply = (suggestion: string) => {
    setEmailResponse(suggestion);
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      behavior="padding"
      keyboardVerticalOffset={100}
      enabled>
      <ScrollView>
        {/* <SelectDropdown
          data={[
            {label: 'All', value: 'all'},
            {label: 'Published', value: 'published'},
            {label: 'Unpublished', value: 'unpublished'},
          ]}
          onSelect={(value: string) => {
            console.log(value);
          }}
          renderItem={(item, index) => {
            return (
              <View className="flex-row items-center gap-4">
                <Text className="text-base font-medium">{item.label}</Text>
              </View>
            );
          }}
        /> */}

        <View className="flex-1 p-4">
          <Text className="text-2xl font-bold mb-4">
            AI-Powered Email Reply
          </Text>

          {/* Email Content Input */}
          <Text className="text-lg font-medium mb-2">Enter Email Content:</Text>
          <Input
            style={{height: 200}}
            className="border border-gray-300 rounded-lg p-3 bg-white mb-4"
            multiline
            placeholder="Type your email content here..."
            value={emailContent}
            onChangeText={setEmailContent}
          />

          {/* Language Selection and Change Style Button */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1 mr-2 flex-row align-middle items-center gap-4">
              <Text className="text-base font-medium mb-1">
                Select Language:
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2 bg-white"
                placeholder="Language"
                value={language}
                onChangeText={setLanguage}
              />
            </View>

            {/* Change Style Button */}
            <Pressable
              className="bg-blue-500 rounded-lg py-3 px-5"
              onPress={() => setBottomSheetVisible(true)}>
              <Text className="text-white text-center font-medium">
                Change Style
              </Text>
            </Pressable>
          </View>

          {/* Generate Suggestions Button */}
          <Button title="Generate Suggestions" onPress={generateSuggestions} />

          {/* Suggestions List */}
          <View className="mt-4">
            {listIdeas.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                className="p-4 bg-blue-100 rounded-lg mb-3"
                onPress={() => generateDetailedReply(suggestion)}>
                <Text className="text-blue-900">{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Detailed Reply */}
          {emailResponse ? (
            <View className="mt-6 p-4 bg-green-100 rounded-lg">
              <Text className="text-green-900 font-medium">
                {emailResponse}
              </Text>
            </View>
          ) : null}

          {/* Bottom Sheet */}
        </View>
      </ScrollView>

      <Modal
        isVisible={isBottomSheetVisible}
        animationIn="slideInUp"
        // transparent
        useNativeDriver
        onBackdropPress={() => setBottomSheetVisible(false)}>
        <View
          className="flex-1 justify-end bg-opacity-50 "
          style={{
            width: '100%',
          }}>
          <View className="bg-white p-6 rounded-t-2xl">
            <Text className="text-lg font-bold mb-4">Change Style</Text>

            {/* Length Selection */}
            <Text className="text-base font-medium mb-4">Select Length:</Text>
            <View className="flex-wrap flex-row gap-4">
              {lengthOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className={`flex-row items-center justify-center p-4 border rounded-lg mb-3 ${
                    length === option
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                  onPress={() => setLength(option)}>
                  <Text className="text-base">{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Formality Selection */}
            <Text className="text-base font-medium mb-4">
              Select a Formality:
            </Text>
            <View className="flex-wrap flex-row gap-4">
              {formalityOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className={`flex-row items-center justify-center p-4 border rounded-lg mb-3 ${
                    formality === option.label
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                  onPress={() => setFormality(option.label)}>
                  <Text className="text-lg mr-2">{option.emoji}</Text>
                  <Text className="text-base">{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Tone Selection */}
            <Text className="text-base font-medium mb-4">Select a Tone:</Text>
            <View className="flex-wrap flex-row gap-4">
              {toneOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className={`flex-row items-center justify-center p-4 border rounded-lg mb-3 ${
                    tone === option.label
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                  onPress={() => setTone(option.label)}>
                  <Text className="text-lg mr-2">{option.emoji}</Text>
                  <Text className="text-base">{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Close Button */}
            <Pressable
              className="bg-blue-500 rounded-lg py-3 px-5"
              onPress={() => setBottomSheetVisible(false)}>
              <Text className="text-white text-center font-medium">Apply</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default EmailScreen;
