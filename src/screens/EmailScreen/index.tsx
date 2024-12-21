import React, {useState} from 'react';
import {emailActions} from 'features/email/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

const EmailScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [emailContent, setEmailContent] = useState('');
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Formal');
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
  const [detailedReply, setDetailedReply] = useState('');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const dispatch = useAppDispatch();
  const listIdeas = useAppSelector(state => state.emailReducer.listIdeas);

  const generateSuggestions = () => {
    if (!emailContent) {
      Toast.show({
        type: 'error',
        text1: 'Please enter email content',
      });
      return;
    }
    const emailSuggestionPayload = {
      data: {
        action: 'Suggest 3 ideas for this email',
        email: emailContent,
        metadata: {
          context: [],
          subject: 'subject',
          sender: 'sender',
          receiver: 'receiver',
          language: language,
        },
      },
      action: {
        onSuccess: (data: any) => {
          //setSuggestions(data);
        },
        onFailure: (error: any) => {
          console.log('Error:', error);
        },
      },
    };
    dispatch(emailActions.getEmailSuggestion(emailSuggestionPayload));
  };

  const generateDetailedReply = (suggestion: string) => {
    setDetailedReply(`Detailed reply based on: "${suggestion}"`);
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">AI-Powered Email Reply</Text>

      {/* Email Content Input */}
      <Text className="text-lg font-medium mb-2">Enter Email Content:</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 bg-white mb-4"
        multiline
        placeholder="Type your email content here..."
        value={emailContent}
        onChangeText={setEmailContent}
      />

      {/* Language Selection and Change Style Button */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1 mr-2 flex-row align-middle items-center gap-4">
          <Text className="text-base font-medium mb-1">Select Language:</Text>
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
      <ScrollView className="mt-4">
        {listIdeas.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            className="p-4 bg-blue-100 rounded-lg mb-3"
            onPress={() => generateDetailedReply(suggestion)}>
            <Text className="text-blue-900">{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Detailed Reply */}
      {detailedReply ? (
        <View className="mt-6 p-4 bg-green-100 rounded-lg">
          <Text className="text-green-900 font-medium">{detailedReply}</Text>
        </View>
      ) : null}

      {/* Bottom Sheet */}
      <Modal
        visible={isBottomSheetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setBottomSheetVisible(false)}>
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-t-2xl">
            <Text className="text-lg font-bold mb-4">Change Style</Text>

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
    </View>
  );
};

export default EmailScreen;
