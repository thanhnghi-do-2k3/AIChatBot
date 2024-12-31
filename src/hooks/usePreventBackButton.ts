// usePreventBackButton.js
import {useEffect} from 'react';
import {BackHandler} from 'react-native';

const usePreventBackButton = () => {
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
};

export default usePreventBackButton;
