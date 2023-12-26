import React, {memo} from 'react';
import {ActivityIndicator, View, type ViewStyle} from 'react-native';
import FastImage, {type ResizeMode} from 'react-native-fast-image';
type ImageViewProps = {
  src?: any;
  uri?: any;
  alt?: string;
  style?: ViewStyle;
  className?: string;
  resizeMode?: ResizeMode;
  showloading?: boolean;
};

const ImageView = ({
  src,
  uri,
  alt,
  className,
  resizeMode = 'cover',
  style,
  showloading,
}: ImageViewProps) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <View
      className={className}
      style={[
        {
          // borderRadius: 999,
          width: 40,
          height: 40,
          overflow: 'hidden',
        },
        style,
      ]}>
      {loading && showloading && (
        <ActivityIndicator size="small" color="#999" />
      )}
      <FastImage
        source={src || {uri}}
        resizeMode={resizeMode}
        style={{width: '100%', height: '100%'}}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

export default memo(ImageView);
