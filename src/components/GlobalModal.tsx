import {hideGlobalError, showGlobalError} from 'features/other/reducer';
import useAppSelector from 'hooks/useAppSelector';
import React from 'react';
import {Text, Touchable, View} from 'react-native';
import Animated, {
  BounceIn,
  BounceOut,
  SlideOutDown,
} from 'react-native-reanimated';
import {dispatchReduxStore} from 'store/store';
import {TouchableOpacity} from 'react-native';

interface GlobalModalProps {
  // Define your component props here
}

const GLOBAL_ERROR_Z_INDEX = 9998;

const GlobalModal: React.FC<GlobalModalProps> = props => {
  const {isGlobalErrorShow, globalErrorHeader, globalErrorMessage} =
    useAppSelector(state => state.otherReducer);

  return (
    isGlobalErrorShow && (
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
          zIndex: GLOBAL_ERROR_Z_INDEX,
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
            }}>
            {globalErrorHeader}
          </Text>
          {/* Message */}
          <Text
            style={{
              marginVertical: 10,
              fontSize: 16,
              textAlign: 'center',
            }}>
            {globalErrorMessage}
          </Text>
          {/* Close button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#f0f0f0',
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={() => {
              GlobalModalController.hide();
            }}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  );
};

export const GlobalModalController = {
  show: ({header, message}: {header?: string; message?: string}) => {
    dispatchReduxStore(
      showGlobalError({
        header: header,
        message: message,
      }),
    );
  },
  hide: () => {
    dispatchReduxStore(hideGlobalError());
  },
};

export default GlobalModal;
