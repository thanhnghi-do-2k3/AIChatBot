import {GlobalConfirmModalController} from 'components/GlobalConfirmModal';
import {GlobalLoadingController} from 'components/GlobalLoading';
import ImageView from 'components/ImageView';
import Modal from 'components/Modal';
import ChatbotIntegrationService from 'features/chatbotIntegration/api';
import React, {useEffect} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Image from 'theme/Image';

interface PublishBotChooseModalProps {
  isVisible: boolean;
  onClose: () => void;
  onMessenger: () => void;
  onTelegram: () => void;
  onSlack: () => void;
  chatbot: any;
}

const PublishBotChooseModal: React.FC<PublishBotChooseModalProps> = props => {
  const [loading, setLoading] = React.useState(false);
  // const [configuration, setConfiguration] = React.useState([]);
  const [messagerConfiguration, setMessagerConfiguration] = React.useState([]);
  const [telegramConfiguration, setTelegramConfiguration] = React.useState([]);
  const [slackConfiguration, setSlackConfiguration] = React.useState([]);

  useEffect(() => {
    if (!props.chatbot) {
      return;
    }
    getConfiguration();
  }, [props.chatbot, props.isVisible]);

  const getConfiguration = () => {
    ChatbotIntegrationService.getConfigurations(props.chatbot?.id ?? '')
      .then((res: any) => {
        if (res) {
          // setConfiguration(res);
          setMessagerConfiguration(
            res.filter((item: any) => item.type === 'messenger'),
          );
          setTelegramConfiguration(
            res.filter((item: any) => item.type === 'telegram'),
          );
          setSlackConfiguration(
            res.filter((item: any) => item.type === 'slack'),
          );
        }
      })
      .catch((error: any) => {
        console.log('error', error);
        Toast.show({
          type: 'error',
          text1: 'Get configuration failed',
        });
        props.onClose();
      });
  };

  const deleteConfiguration = (id: 'messenger' | 'slack' | 'telegram') => {
    GlobalLoadingController.show();
    ChatbotIntegrationService.disableConfiguration(props.chatbot?.id ?? '', id)
      .then((res: any) => {
        Toast.show({
          type: 'success',
          text1: 'Delete configuration successfully',
        });
        getConfiguration();
      })
      .catch((error: any) => {
        console.log('error', error);
        Toast.show({
          type: 'error',
          text1: 'Delete configuration failed',
        });
      });
    GlobalLoadingController.hide();
  };

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onClose}
      containerStyle={{width: '90%'}}
      style={{width: '100%', alignItems: 'center'}}>
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
            justifyContent: 'space-between',
          }}
          onPress={() => {
            props.onMessenger();
            props.onClose();
          }}
          onLongPress={() => {
            if (messagerConfiguration.length === 0) {
              return;
            }
            GlobalConfirmModalController.show({
              header: 'Delete configuration',
              message: 'Are you sure you want to delete this configuration?',
              onConfirm: () => {
                deleteConfiguration('messenger');
              },
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <ImageView
              src={Image.messengerIcon}
              style={{width: 20, height: 20, marginRight: 10}}
            />
            <Text style={{fontSize: 16}}>Publish to Messenger</Text>
          </View>

          {messagerConfiguration.length > 0 && (
            <Text style={{fontSize: 16, color: 'green', marginLeft: 10}}>
              Configured
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            props.onTelegram();
            props.onClose();
          }}
          onLongPress={() => {
            if (telegramConfiguration.length === 0) {
              return;
            }
            GlobalConfirmModalController.show({
              header: 'Delete configuration',
              message: 'Are you sure you want to delete this configuration?',
              onConfirm: () => {
                deleteConfiguration('telegram');
              },
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <ImageView
              src={Image.telegramIcon}
              style={{width: 20, height: 20, marginRight: 10}}
            />
            <Text style={{fontSize: 16}}>Publish to Telegram</Text>
          </View>

          {telegramConfiguration.length > 0 && (
            <Text style={{fontSize: 16, color: 'green', marginLeft: 10}}>
              Configured
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            props.onSlack();
            props.onClose();
          }}
          onLongPress={() => {
            if (slackConfiguration.length === 0) {
              return;
            }
            GlobalConfirmModalController.show({
              header: 'Delete configuration',
              message: 'Are you sure you want to delete this configuration?',
              onConfirm: () => {
                deleteConfiguration('slack');
              },
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <ImageView
              src={Image.slackIcon}
              style={{width: 20, height: 20, marginRight: 10}}
            />
            <Text style={{fontSize: 16}}>Publish to Slack</Text>
          </View>

          {slackConfiguration.length > 0 && (
            <Text style={{fontSize: 16, color: 'green', marginLeft: 10}}>
              Configured
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            Linking.openURL(
              'https://jarvis.cx/help/knowledge-base/publish-bot/',
            );
          }}>
          <Text style={{fontSize: 16}}>Dont know how to publish?</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PublishBotChooseModal;
