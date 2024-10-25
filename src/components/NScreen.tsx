import * as React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Layout} from 'theme';
import useDimensions from 'hooks/useDimension';
interface ScreenProps {
  children: React.ReactNode;
  colorBg?: string;
}

const Screen = ({children, colorBg}: ScreenProps) => {
  const {height, width} = useDimensions('window');
  return (
    <SafeAreaView
      style={[Layout.fill, colorBg && {backgroundColor: colorBg}]}
      edges={height > width ? ['left', 'right'] : ['top']}>
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
});
