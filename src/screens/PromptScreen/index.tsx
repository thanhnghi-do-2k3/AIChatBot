import ScreenName from 'constant/ScreenName';
import {kbActions} from 'features/KB/reducer';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'theme';

interface Props {}

const PromptListScreen: React.FC<Props> = ({navigation}: any) => {
  return <>Hello</>;
};

export default PromptListScreen;
