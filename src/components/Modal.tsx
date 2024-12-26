import React from 'react';
import {Pressable, type ViewStyle} from 'react-native';
import Animated, {BounceIn, BounceOut} from 'react-native-reanimated';

interface GlobalModalProps {
  containerStyle?: ViewStyle;
  children: React.ReactNode;
  isVisible: boolean;
  onBackdropPress?: () => void;
}

const GLOBAL_MODAL_Z_INDEX = 9996;

const Modal: React.FC<GlobalModalProps> = props => {
  return (
    props.isVisible && (
      <Pressable
        onPress={props.onBackdropPress}
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
          zIndex: GLOBAL_MODAL_Z_INDEX,
        }}>
        <Pressable
          onPress={() => {}}
          style={{
            margin: 0,
            padding: 0,
          }}>
          <Animated.View
            entering={BounceIn.duration(500)}
            exiting={BounceOut.duration(400)}
            style={[
              {
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingHorizontal: 20,
                // width: '60%',
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
                zIndex: GLOBAL_MODAL_Z_INDEX + 1,
              },
              props.containerStyle,
            ]}>
            {props.children}
          </Animated.View>
        </Pressable>
      </Pressable>
    )
  );
};

export default Modal;
