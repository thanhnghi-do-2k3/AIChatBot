import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDimensions from 'hooks/useDimension';
interface ScreenProps {
  children: React.ReactNode;
  colorBg?: string;
}

const Screen = ({children, colorBg}: ScreenProps) => {
  const {height, width} = useDimensions('window');
  return (
    <SafeAreaView
      className="flex-1"
      style={[colorBg && {backgroundColor: colorBg}]}
      edges={height > width ? ['left', 'right'] : ['top']}>
      {children}
    </SafeAreaView>
  );
};

export default Screen;
