import ImageView from 'components/ImageView';
import Modal from 'components/Modal';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Image from 'theme/Image';

interface PublishBotChooseModalProps {
  isVisible: boolean;
  onClose: () => void;
  onMessenger: () => void;
  onTelegram: () => void;
  onSlack: () => void;
}

const PublishBotChooseModal: React.FC<PublishBotChooseModalProps> = props => {
  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.onClose}>
      <View
        style={{
          padding: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
          Choose a publish option
        </Text>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            flexDirection: 'row',
          }}
          onPress={() => {
            props.onMessenger();
            props.onClose();
          }}>
          <ImageView
            src={Image.messengerIcon}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontSize: 16}}>Publish to Messenger</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            flexDirection: 'row',
          }}
          onPress={() => {
            props.onTelegram();
            props.onClose();
          }}>
          <ImageView
            src={Image.telegramIcon}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontSize: 16}}>Publish to Telegram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            flexDirection: 'row',
          }}
          onPress={() => {
            props.onSlack();
            props.onClose();
          }}>
          <ImageView
            src={Image.slackIcon}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontSize: 16}}>Publish to Slack</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PublishBotChooseModal;
