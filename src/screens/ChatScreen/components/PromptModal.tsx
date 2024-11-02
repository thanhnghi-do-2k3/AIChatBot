import Modal from 'components/Modal';

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import PromptUsingModal from './PromptUsingModal';
import CreatePromptModal from './CreatePromptModal';
import EditPromptModal from './EditPromptModal';

interface PromptItem {
  _id: string;
  title: string;
  content: string;
  description?: string;
  category?: string;
  isFavorite?: boolean;
  isPublic?: boolean;
}

interface PromptLibraryModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmitForm: (content: string) => void;
  onSendChat: (content: string) => void;
}


const mockPrompts: PromptItem[] = [
  {
    _id: '1',
    title: 'Mock Prompt 1',
    content: 'Lorem ipsum dolor sit amet',
    description: 'This is a mock description #1',
    category: 'Business',
    isFavorite: false,
    isPublic: true,
  },
  {
    _id: '2',
    title: 'Mock Prompt 2',
    content: 'Lorem ipsum 2',
    description: 'This is a mock description #2',
    category: 'Education',
    isFavorite: true,
    isPublic: false,
  },
  {
    _id: '3',
    title: 'Mock Prompt 3',
    content: 'Lorem ipsum 3',
    description: 'This is a mock description #3',
    category: 'SEO',
    isFavorite: false,
    isPublic: true,
  },
  {
    _id: '4',
    title: 'Mock Prompt 4',
    content: 'Lorem ipsum 4',
    description: 'This is a mock description #4',
    category: 'Marketing',
    isFavorite: false,
    isPublic: false,
  },
];

const PromptLibraryModal: React.FC<PromptLibraryModalProps> = ({
  visible,
  onClose,
  onSubmitForm,
  onSendChat,
}) => {
  // ===== 2. Định nghĩa state cục bộ =====
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState<'My Prompts' | 'Public Prompts'>('Public Prompts');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreatePromptModalVisible, setIsCreatePromptModalVisible] = useState(false);
  const [isEditPromptModalVisible, setIsEditPromptModalVisible] = useState(false);

  const [content, setContent] = useState('');


  const [prompts, setPrompts] = useState<PromptItem[]>(mockPrompts);

  
  const [loading, setLoading] = useState(false);

  const [editItem, setEditItem] = useState<PromptItem | null>(null);

  
  const categories = ['Education', 'Business', 'SEO', 'Marketing'];

  // ===== 4. mock handleSearch =====
  const handleSearch = () => {
    setLoading(true);
    
    setTimeout(() => {
     
      const isPublic = selectedTab === 'Public Prompts';

     
      let filtered = [...mockPrompts];
      filtered = filtered.filter((item) => {
        
        if (isPublic && item.isPublic !== true) return false;
        if (!isPublic && item.isPublic === true) return false;

        
        if (isFavorite && !item.isFavorite) return false;

      
        if (selectedCategory && item.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        
        if (searchText) {
          const lowerSearch = searchText.toLowerCase();
          const matchesTitle = item.title.toLowerCase().includes(lowerSearch);
          const matchesDesc = item.description?.toLowerCase().includes(lowerSearch);
          if (!matchesTitle && !matchesDesc) {
            return false;
          }
        }
        return true;
      });
      setPrompts(filtered);
      setLoading(false);
    }, 500);
  };

  // ===== 5. mock xóa prompt =====
  const onDelete = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      setPrompts(prev => prev.filter(item => item._id !== id));
      setLoading(false);
    }, 300);
  };

  // ===== 6. Mỗi khi thay đổi tab/category/isFavorite => handleSearch
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, selectedCategory, isFavorite]);

  // ===== 7. mock toggle favorite =====
  const toggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((item) =>
        item._id === id ? {...item, isFavorite: !item.isFavorite} : item
      )
    );
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      {loading ? (
        <View style={{ minHeight: 400, minWidth: 300, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#264fd3" style={{ marginTop: 20 }} />
        </View>
      ) : (
        <>
          <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 16, width: '90%', alignSelf: 'center', maxHeight: 500 }}>
            {/* Header + nút tạo prompt */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Prompt Library (Mock)</Text>
              <TouchableOpacity
                onPress={() => setIsCreatePromptModalVisible(true)}
                style={{ padding: 8, backgroundColor: '#2563EB', borderRadius: 8 }}
              >
                <Icon name="plus" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Tabs My Prompts / Public Prompts */}
            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 20,
                  backgroundColor: selectedTab === 'My Prompts' ? '#2563EB' : '#E5E7EB',
                  marginRight: 8,
                }}
                onPress={() => setSelectedTab('My Prompts')}
              >
                <Text style={{ color: selectedTab === 'My Prompts' ? '#FFF' : '#000' }}>
                  My Prompts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 20,
                  backgroundColor: selectedTab === 'Public Prompts' ? '#2563EB' : '#E5E7EB',
                }}
                onPress={() => setSelectedTab('Public Prompts')}
              >
                <Text style={{ color: selectedTab === 'Public Prompts' ? '#FFF' : '#000' }}>
                  Public Prompts
                </Text>
              </TouchableOpacity>

              
              <TouchableOpacity
                onPress={() => setIsFavorite(!isFavorite)}
                style={{ marginLeft: 16, justifyContent: 'center' }}
              >
                <Icon
                  name="star"
                  size={20}
                  color={isFavorite ? '#FFD700' : '#BDBDBD'}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  color: '#000',
                }}
                placeholder="Search..."
                placeholderTextColor="#BDBDBD"
                value={searchText}
                onChangeText={setSearchText}
              />
              <TouchableOpacity
                onPress={handleSearch}
                style={{ marginLeft: 8, backgroundColor: '#E5E7EB', borderRadius: 50, padding: 8 }}
              >
                <Icon name="search" size={20} color="#BDBDBD" />
              </TouchableOpacity>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 }}>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 20,
                      backgroundColor: isSelected ? '#2563EB' : '#E5E7EB',
                    }}
                    onPress={() => {
                      if (isSelected) {
                        setSelectedCategory('');
                      } else {
                        setSelectedCategory(cat);
                      }
                    }}
                  >
                    <Text style={{ color: isSelected ? '#FFF' : '#000' }}>{cat}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

      
            <FlatList
              data={prompts}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
           
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                      setContent(item.content);
                      setIsModalVisible(true);
                    }}
                  >
                    <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>{item.title}</Text>
                        {selectedTab === 'My Prompts' && (
                          <>
                            <TouchableOpacity
                              style={{ marginLeft: 16 }}
                              onPress={() => {
                                setEditItem(item);
                                setIsEditPromptModalVisible(true);
                              }}
                            >
                              <Icon name="edit" size={14} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ marginLeft: 16 }}
                              onPress={() => onDelete(item._id)}
                            >
                              <Icon name="trash" size={14} color="#000" />
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                      <Text style={{ color: '#6B7280' }} numberOfLines={3}>
                        {item.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* Nút "favorite" bên phải */}
                  <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => toggleFavorite(item._id)}>
                      <Icon
                        name="star"
                        size={20}
                        color={item.isFavorite ? '#FFD700' : '#BDBDBD'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 300 }}
            />

          
            <TouchableOpacity onPress={onClose} style={{ marginTop: 16, alignSelf: 'center' }}>
              <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>

          
          <PromptUsingModal
            visible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
            }}
            content={content}
            onSubmitForm={onSubmitForm}
            onSendChat={onSendChat}
          />

          {/* Modal tạo Prompt (mock) */}
          <CreatePromptModal
            visible={isCreatePromptModalVisible}
            onClose={() => setIsCreatePromptModalVisible(false)}
            handleSearch={handleSearch}
          />

          {/* Modal sửa Prompt (mock) */}
          <EditPromptModal
            visible={isEditPromptModalVisible}
            onClose={() => setIsEditPromptModalVisible(false)}
            item={editItem}
            handleSearch={handleSearch}
          />
        </>
      )}
    </Modal>
  );
};

export default PromptLibraryModal;
