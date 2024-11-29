import {hideGlobalLoading, showGlobalLoading} from 'features/other/reducer';
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {dispatchReduxStore} from 'store/store';
import useAppSelector from 'hooks/useAppSelector';
import * as Progress from 'react-native-progress';

interface GlobalLoadingProps {
  // Add any props you need here
}

const GLOBAL_LOADING_Z_INDEX = 9999;

const GlobalLoading: React.FC<GlobalLoadingProps> = () => {
  const {isGlobalLoadingShow} = useAppSelector(state => state.otherReducer);

  return (
    isGlobalLoadingShow && (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: GLOBAL_LOADING_Z_INDEX,
        }}>
        <Progress.CircleSnail color={['blue']} size={50} spinDuration={1000} />
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
