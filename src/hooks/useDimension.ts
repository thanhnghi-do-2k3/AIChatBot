import {useEffect, useState} from 'react';
import {Dimensions, ScaledSize} from 'react-native';

const useDimensions = (type: 'window' | 'screen'): ScaledSize => {
  const [screenData, setScreenData] = useState<ScaledSize>(
    Dimensions.get(type),
  );

  useEffect(() => {
    const onChange = (result: {window: ScaledSize; screen: ScaledSize}) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);
  });

  return screenData;
};

export default useDimensions;
