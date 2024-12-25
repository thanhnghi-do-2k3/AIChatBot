import React, {useState, useEffect} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import {promptActions} from 'features/prompt/reducer';
import PromptUsingModal from './PromptUsingModal';
interface PromptLibraryModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmitForm: (content: string) => void;
  onSendChat: (content: string) => void;
}

const PromptLibraryModal: React.FC<PromptLibraryModalProps> = ({
  visible,
  onClose,
  onSubmitForm,
  onSendChat,
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Public Prompts'); // Default to "Public Prompts"
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favoritePrompts, setFavoritePrompts] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();
  const listPrompts = useAppSelector(state => state.promptReducer.listPrompts);

  useEffect(() => {
    const isPublic = selectedTab === 'Public Prompts';
    const payload = {
      data: {
        isPublic: isPublic,
      },
      action: {
        onSuccess: (data: any) => {},
        onFailure: (error: any) => {},
      },
    };
    dispatch(promptActions.getPrompts(payload));
  }, [selectedTab]);
  const categories = ['All', 'Marketing', 'Business', 'SEO'];
  const prompts = [
    {
      id: '1',
      name: 'AI Poetry Generation',
      description:
        'This prompt generates a poem based on the user’s preferences.',
      category: 'SEO',
    },
    {
      id: '2',
      name: 'English Vocabulary Learning',
      description:
        'Learn new vocabulary with definitions, examples, and quizzes.',
      category: 'Marketing',
    },
    {
      id: '3',
      name: 'Grammar Corrector',
      description:
        'Improve grammar in your sentences with instant corrections.',
      category: 'Business',
    },
  ];

  const filteredPrompts = prompts.filter(
    item =>
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const toggleFavorite = (id: string) => {
    setFavoritePrompts(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id],
    );
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp">
      <View className="bg-white rounded-lg p-5 w-11/12 self-center max-h-[500px]">
        <Text className="text-lg font-bold mb-4">Prompt Library</Text>

        {/* Tabs My Prompts / Public Prompts */}
        <View className="flex-row justify-start mb-4 gap-2">
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${
              selectedTab === 'My Prompts' ? 'bg-blue-500' : 'bg-gray-200'
            }`}
            onPress={() => setSelectedTab('My Prompts')}>
            <Text
              className={`${
                selectedTab === 'My Prompts' ? 'text-white' : 'text-black'
              }`}>
              My Prompts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${
              selectedTab === 'Public Prompts' ? 'bg-blue-500' : 'bg-gray-200'
            }`}
            onPress={() => setSelectedTab('Public Prompts')}>
            <Text
              className={`${
                selectedTab === 'Public Prompts' ? 'text-white' : 'text-black'
              }`}>
              Public Prompts
            </Text>
          </TouchableOpacity>
        </View>

        {/* Thanh tìm kiếm */}
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4 text-black"
          placeholder="Search..."
          placeholderTextColor="#BDBDBD"
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Tabs bộ lọc danh mục */}
        <View className="flex-row justify-around mb-4">
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              className={`py-2 px-4 rounded-full ${
                selectedCategory === category ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              onPress={() => setSelectedCategory(category)}>
              <Text
                className={`${
                  selectedCategory === category ? 'text-white' : 'text-black'
                }`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Danh sách prompt */}
        <FlatList
          data={listPrompts}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View className="flex-row justify-between py-3 border-b border-gray-200">
              {/* Nội dung bên trái */}
              <TouchableOpacity
                onPress={() => {
                  setContent(item.content);
                  setIsModalVisible(true);
                }}>
                <View className="flex-1">
                  <Text className="text-black font-bold text-base">
                    {item.title}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Nội dung bên phải */}
              <View className="flex-row items-center space-x-3">
                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                  <Icon
                    name={favoritePrompts.includes(item.id) ? 'star' : 'star'}
                    size={20}
                    color={
                      favoritePrompts.includes(item.id) ? '#FFD700' : '#BDBDBD'
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          style={{maxHeight: 300}} // Giới hạn chiều cao danh sách cuộn
        />

        {/* Nút đóng */}
        <TouchableOpacity onPress={onClose} className="mt-5 self-center">
          <Text className="text-blue-500 font-bold text-base">Close</Text>
        </TouchableOpacity>
      </View>
      <PromptUsingModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          onClose();
        }}
        content={content}
        onSubmitForm={onSubmitForm}
        onSendChat={onSendChat}
      />
    </Modal>
  );
};

export default PromptLibraryModal;
