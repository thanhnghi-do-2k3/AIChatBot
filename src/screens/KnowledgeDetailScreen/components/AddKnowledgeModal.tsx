import {kbActions} from 'features/KB/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker, {types} from 'react-native-document-picker';

interface CreateKnowledgeModalProps {
  visible: boolean;
  onClose: () => void;
  id: string;
}

const CreateKnowledgeModal: React.FC<CreateKnowledgeModalProps> = ({
  visible,
  onClose,
  id,
}) => {
  const dispatch = useAppDispatch();

  // Option người dùng chọn (file | url | slack | confluence | ...)
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // --- State chung cho "From URL" / Slack / Confluence (đều cần 'unitName')
  const [name, setName] = useState('');

  // --- State riêng cho URL
  const [url, setUrl] = useState('');

  // --- State riêng cho File
  const [selectedFile, setSelectedFile] = useState<any>(null);

  // --- State riêng cho Slack
  const [slackWorkspace, setSlackWorkspace] = useState('');
  const [slackBotToken, setSlackBotToken] = useState('');

  // --- State riêng cho Confluence
  const [wikiPageUrl, setWikiPageUrl] = useState('');
  const [confluenceUsername, setConfluenceUsername] = useState('');
  const [confluenceAccessToken, setConfluenceAccessToken] = useState('');

  const handleReset = () => {
    setSelectedOption(null);
    setName('');
    setUrl('');
    setSelectedFile(null);
    setSlackWorkspace('');
    setSlackBotToken('');
    // Reset Confluence
    setWikiPageUrl('');
    setConfluenceUsername('');
    setConfluenceAccessToken('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handlePickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [types.allFiles],
      });
      setSelectedFile(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // user cancelled
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
  };

  const handleSubmit = () => {
    // 1) Tạo knowledge bằng URL
    if (selectedOption === 'url' && name && url) {
      const payload = {
        data: {
          id,
          unitName: name,
          webUrl: url,
        },
        action: {
          onSuccess: () => {
            dispatch(
              kbActions.getUnitsKb({
                data: {id},
                action: {
                  onSuccess: () => {},
                  onFailure: () => {},
                },
              }),
            );
          },
          onFailure: (error: any) => {
            console.log(error);
          },
        },
      };
      dispatch(kbActions.addUrlToKb(payload));
    }

    // 2) Tạo knowledge bằng File
    if (selectedOption === 'file' && selectedFile) {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      });

      const payload = {
        data: {
          id,
          file: formData,
        },
        action: {
          onSuccess: () => {
            dispatch(
              kbActions.getUnitsKb({
                data: {id},
                action: {
                  onSuccess: () => {},
                  onFailure: () => {},
                },
              }),
            );
          },
          onFailure: (error: any) => {
            console.log(error);
          },
        },
      };
      dispatch(kbActions.addLocalFileToKb(payload));
    }

    // 3) Tạo knowledge bằng Slack
    if (selectedOption === 'slack' && name && slackWorkspace && slackBotToken) {
      const payload = {
        data: {
          id,
          unitName: name,
          slackWorkspace,
          slackBotToken,
        },
        action: {
          onSuccess: () => {
            dispatch(
              kbActions.getUnitsKb({
                data: {id},
                action: {
                  onSuccess: () => {},
                  onFailure: () => {},
                },
              }),
            );
          },
          onFailure: (error: any) => {
            console.log(error);
          },
        },
      };
      dispatch(kbActions.addSlackToKb(payload));
    }

    // 4) Tạo knowledge bằng Confluence
    if (
      selectedOption === 'confluence' &&
      name &&
      wikiPageUrl &&
      confluenceUsername &&
      confluenceAccessToken
    ) {
      const payload = {
        data: {
          id,
          unitName: name,
          wikiPageUrl,
          confluenceUsername,
          confluenceAccessToken,
        },
        action: {
          onSuccess: () => {
            dispatch(
              kbActions.getUnitsKb({
                data: {id},
                action: {
                  onSuccess: () => {},
                  onFailure: () => {},
                },
              }),
            );
          },
          onFailure: (error: any) => {
            console.log(error);
          },
        },
      };
      // TODO: Tạo action tương ứng trong kbActions (ví dụ addConfluenceToKb)
      dispatch(kbActions.addConfluenceToKb(payload));
    }

    handleClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleClose}
      style={{margin: 0}}
      backdropOpacity={0.5}
      animationIn="fadeIn">
      <View style={styles.modalContent}>
        <Text style={styles.title}>Add Knowledge</Text>

        {/**
         * Chỉ hiển thị các lựa chọn này khi chưa chọn option nào
         * (hoặc bạn có thể sửa logic theo ý muốn)
         */}
        {!['url', 'file', 'slack', 'confluence'].includes(
          selectedOption ?? '',
        ) && (
          <View style={styles.optionsContainer}>
            {/* From File */}
            <TouchableOpacity
              onPress={() => setSelectedOption('file')}
              style={[
                styles.optionButton,
                selectedOption === 'file' && styles.selectedOption,
              ]}>
              <Icon name="file" size={20} color="#000" />
              <Text>From File</Text>
            </TouchableOpacity>

            {/* From URL */}
            <TouchableOpacity
              onPress={() => setSelectedOption('url')}
              style={[
                styles.optionButton,
                selectedOption === 'url' && styles.selectedOption,
              ]}>
              <Icon name="link" size={20} color="#000" />
              <Text>From URL</Text>
            </TouchableOpacity>

            {/* From Slack */}
            <TouchableOpacity
              onPress={() => setSelectedOption('slack')}
              style={[
                styles.optionButton,
                selectedOption === 'slack' && styles.selectedOption,
              ]}>
              <Icon name="slack" size={20} color="#000" />
              <Text>From Slack</Text>
            </TouchableOpacity>

            {/* From Confluence */}
            <TouchableOpacity
              onPress={() => setSelectedOption('confluence')}
              style={[
                styles.optionButton,
                selectedOption === 'confluence' && styles.selectedOption,
              ]}>
              <Icon name="book" size={20} color="#000" />
              <Text>From Confluence</Text>
            </TouchableOpacity>
          </View>
        )}

        {/**
         * 1) Form URL
         */}
        {selectedOption === 'url' && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter URL"
              value={url}
              onChangeText={setUrl}
            />
            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Cancel" onPress={handleClose} />
            </View>
          </View>
        )}

        {/**
         * 2) Chọn File
         */}
        {selectedOption === 'file' && (
          <View>
            <TouchableOpacity
              style={styles.filePickerButton}
              onPress={handlePickFile}>
              <Text>Chọn file</Text>
            </TouchableOpacity>

            {selectedFile && (
              <Text style={{marginVertical: 10}}>
                Đã chọn: {selectedFile.name}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Button title="Upload" onPress={handleSubmit} />
              <Button title="Cancel" onPress={handleClose} />
            </View>
          </View>
        )}

        {/**
         * 3) Form Slack
         */}
        {selectedOption === 'slack' && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter Unit Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Slack Workspace"
              value={slackWorkspace}
              onChangeText={setSlackWorkspace}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Slack Bot Token"
              value={slackBotToken}
              onChangeText={setSlackBotToken}
            />
            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Cancel" onPress={handleClose} />
            </View>
          </View>
        )}

        {/**
         * 4) Form Confluence
         */}
        {selectedOption === 'confluence' && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter Unit Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Confluence Page URL"
              value={wikiPageUrl}
              onChangeText={setWikiPageUrl}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Confluence Username"
              value={confluenceUsername}
              onChangeText={setConfluenceUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Confluence Access Token"
              value={confluenceAccessToken}
              onChangeText={setConfluenceAccessToken}
            />
            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Cancel" onPress={handleClose} />
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    alignSelf: 'center',
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 20,
  },
  selectedOption: {
    backgroundColor: '#D3D3D3',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  filePickerButton: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
});

export default CreateKnowledgeModal;
