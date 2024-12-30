import {StyleSheet} from 'nativewind';
import React from 'react';
import {Pressable, type ViewStyle} from 'react-native';
import {Portal} from 'react-native-paper';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';

interface GlobalModalProps {
  containerStyle?: ViewStyle;
  children: React.ReactNode;
  isVisible: boolean;
  onBackdropPress: () => void;
  heightPercentage?: 50 | 60 | 70 | 80 | 90 | 100;
}

const GLOBAL_MODAL_Z_INDEX = 9993;

const BottomSheet: React.FC<GlobalModalProps> = ({
  heightPercentage = 50,
  isVisible,
  onBackdropPress,
  containerStyle,
  children,
}) => {
  return (
    isVisible && (
      <Portal>
        <Pressable
          onPress={onBackdropPress}
          style={{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            justifyContent: 'flex-end',
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
              width: '100%',
              height: `${heightPercentage}%`,
            }}>
            <Animated.View
              entering={FadeInDown.duration(500)}
              exiting={FadeOutDown.duration(400)}
              style={[
                {
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 30,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: GLOBAL_MODAL_Z_INDEX + 1,
                },
                containerStyle,
              ]}>
              {children}
            </Animated.View>
          </Pressable>
        </Pressable>
      </Portal>
    )
  );
};

export default BottomSheet;
