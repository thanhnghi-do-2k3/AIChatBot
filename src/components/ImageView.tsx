import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import FastImage, {type ResizeMode} from 'react-native-fast-image';
import {memo} from 'react';
type ImageViewProps = {
  src: any;
  uri?: any;
  alt?: string;
  className: string;
  resizeMode: ResizeMode;
};

const ImageView = ({
  src,
  uri,
  alt,
  className,
  resizeMode = 'cover',
}: ImageViewProps) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <View className={className}>
      {loading && <ActivityIndicator size="small" color="#999" />}
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
