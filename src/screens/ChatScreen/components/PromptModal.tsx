import Modal from 'components/Modal';
import {promptActions} from 'features/prompt/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
// import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PromptUsingModal from './PromptUsingModal';
import CreatePromptModal from './CreatePromptModal';
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
  const [selectedCategory, setSelectedCategory] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreatePromptModalVisible, setIsCreatePromptModalVisible] =
    useState(false);

  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();
  const listPrompts = useAppSelector(state => state.promptReducer.listPrompts);

  const handleSearch = () => {
    const normalizedCategory = selectedCategory.toLowerCase();

    const payload = {
      data: {
        query: searchText,
        isPublic: selectedTab === 'Public Prompts',
        ...(selectedCategory && {category: normalizedCategory}),
      },
      action: {
        onSuccess: (data: any) => {},
        onFailure: (error: any) => {},
      },
    };
    dispatch(promptActions.getPrompts(payload));
  };

  useEffect(() => {
    console.log('selectedCategory', selectedCategory);
    const normalizedCategory = selectedCategory.toLowerCase();
    const isPublic = selectedTab === 'Public Prompts';
    const payload = {
      data: {
        isPublic: isPublic,
        query: searchText,
        ...(selectedCategory && {category: normalizedCategory}),
      },
      action: {
        onSuccess: (data: any) => {},
        onFailure: (error: any) => {},
      },
    };
    dispatch(promptActions.getPrompts(payload));
  }, [selectedTab, selectedCategory]);
  const categories = ['Education', 'Business', 'SEO', 'Marketing'];

  const toggleFavorite = (id: string) => {
    const payload = {
      data: {
        id: id,
      },
      action: {
        onSuccess: (data: any) => {},
        onFailure: (error: any) => {},
      },
    };
    dispatch(promptActions.makeFavoritePrompt(payload));
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View className="bg-white rounded-lg p-5 w-11/12 self-center max-h-[500px]">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold mb-4">Prompt Library</Text>
          <TouchableOpacity
            onPress={() => setIsCreatePromptModalVisible(true)}
            className=" mb-4 p-2 bg-blue-500 rounded-lg">
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

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
        <View className="flex-row justify-between mb-4 items-center">
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4 text-black flex-1 mr-2"
            placeholder="Search..."
            placeholderTextColor="#BDBDBD"
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
            }}
          />
          <TouchableOpacity
            onPress={handleSearch}
            className="bg-gray-200 rounded-full p-3 mb-4">
            <Icon name="search" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        {/* Tabs bộ lọc danh mục */}
        <View className="flex-row justify-around mb-4">
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              className={`py-2 px-4 rounded-full ${
                selectedCategory === category ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              onPress={() => {
                if (selectedCategory === category) {
                  setSelectedCategory('');
                } else {
                  setSelectedCategory(category);
                }
              }}>
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
            <View className="flex-row py-3 border-b border-gray-200">
              {/* Nội dung bên trái */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  // flexDirection: 'column',
                }}
                onPress={() => {
                  setContent(item.content);
                  setIsModalVisible(true);
                }}>
                <View>
                  <Text className="text-black font-bold text-base">
                    {item.title}
                  </Text>
                  <Text className="text-gray-500 text-sm" numberOfLines={3}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Nội dung bên phải */}
              <View
                style={{flex: 0.1, flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => toggleFavorite(item._id)}>
                  <Icon
                    name={item.isFavorite ? 'star' : 'star'}
                    size={20}
                    color={item.isFavorite ? '#FFD700' : '#BDBDBD'}
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
          //onClose();
        }}
        content={content}
        onSubmitForm={onSubmitForm}
        onSendChat={onSendChat}
      />

      <CreatePromptModal
        visible={isCreatePromptModalVisible}
        onClose={() => setIsCreatePromptModalVisible(false)}
      />
    </Modal>
  );
};

export default PromptLibraryModal;
