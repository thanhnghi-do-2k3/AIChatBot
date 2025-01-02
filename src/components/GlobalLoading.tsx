import {BlurView} from '@react-native-community/blur';
import {hideGlobalLoading, showGlobalLoading} from 'features/other/reducer';
import useAppSelector from 'hooks/useAppSelector';
import LottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';
import {dispatchReduxStore} from 'store/store';
import Lottie from 'theme/Lottie';

interface GlobalLoadingProps {
  // Add any props you need here
}

const GLOBAL_LOADING_Z_INDEX = 9999;

const GlobalLoading: React.FC<GlobalLoadingProps> = () => {
  const {isGlobalLoadingShow} = useAppSelector(state => state.otherReducer);

  return (
    isGlobalLoadingShow && (
      <View
        // reducedTransparencyFallbackColor="rgba(0,0,0,0.6)"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'rgba(0,0,0,0.6)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: GLOBAL_LOADING_Z_INDEX,
        }}>
        <BlurView
          blurType="light"
          blurAmount={5}
          // reducedTransparencyFallbackColor="white"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <LottieView
          source={Lottie.loadingAnimation}
          autoPlay
          loop
          style={{
            width: 200,
            height: 200,
            zIndex: GLOBAL_LOADING_Z_INDEX + 1,
            position: 'absolute',
          }}
        />
      </View>
    )
  );
};

export const GlobalLoadingController = {
  show: () => {
    dispatchReduxStore(showGlobalLoading());
  },
  hide: () => {
    dispatchReduxStore(hideGlobalLoading());
  },
};

export default GlobalLoading;
