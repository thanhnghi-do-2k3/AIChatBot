import {hideGlobalConfirm, showGlobalConfirm} from 'features/other/reducer';
import useAppSelector from 'hooks/useAppSelector';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated, {BounceIn, BounceOut} from 'react-native-reanimated';
import {dispatchReduxStore} from 'store/store';

interface GlobalModalProps {}

const GLOBAL_CONFIRM_Z_INDEX = 9997;

const GlobalConfirmModal: React.FC<GlobalModalProps> = props => {
  const {
    isGlobalConfirmShow,
    globalConfirmMessage,
    globalConfirmHeader,
    onGlobalConfirmOk,
  } = useAppSelector(state => state.otherReducer);

  return (
    isGlobalConfirmShow && (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.1)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: GLOBAL_CONFIRM_Z_INDEX,
        }}>
        <Animated.View
          entering={BounceIn.duration(500)}
          exiting={BounceOut.duration(400)}
          style={{
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: '60%',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* Header */}
          <Text
            style={{
              fontWeight: 'bold',
              marginVertical: 10,
              fontSize: 20,
              textAlign: 'center',
            }}>
            {globalConfirmHeader}
          </Text>
          {/* Message */}
          <Text
            style={{
              marginVertical: 10,
              fontSize: 16,
              textAlign: 'center',
            }}>
            {globalConfirmMessage}
          </Text>
          {/* Close button */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '70%',
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                width: 60,
                backgroundColor: '#ED5E68',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={() => {
                GlobalConfirmModalController.hide();
              }}>
              <Text className="text-white font-bold">Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                width: 60,
                backgroundColor: '#28C68B',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={() => {
                GlobalConfirmModalController.hide();
                onGlobalConfirmOk();
              }}>
              <Text className="text-white font-bold">Yes</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    )
  );
};

export const GlobalConfirmModalController = {
  show: ({
    header,
    message,
    onConfirm,
  }: {
    header?: string;
    message?: string;
    onConfirm: any;
  }) => {
    dispatchReduxStore(
      showGlobalConfirm({
        header: header,
        message: message,
        onConfirm: onConfirm,
      }),
    );
  },
  hide: () => {
    dispatchReduxStore(hideGlobalConfirm());
  },
};

export default GlobalConfirmModal;
