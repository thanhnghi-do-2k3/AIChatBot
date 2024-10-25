import {StyleSheet} from 'react-native';

const none = 0;
const tiny = 10;
const small = tiny * 2; // 20
const regular = tiny * 3; // 30
const large = regular * 2; // 60
const halfTiny = tiny / 2;

export const MetricsSizes = {
  none,
  tiny,
  small,
  regular,
  large,
  halfTiny,
};

const Gutter = StyleSheet.create(
  Object.entries(MetricsSizes).reduce(
    (acc, [key, value]) => ({
      ...acc,
      /* Margins */
      [`${key}Margin`]: {
        margin: value,
      },
      [`${key}BMargin`]: {
        marginBottom: value,
      },
      [`${key}TMargin`]: {
        marginTop: value,
      },
      [`${key}RMargin`]: {
        marginRight: value,
      },
      [`${key}LMargin`]: {
        marginLeft: value,
      },
      [`${key}VMargin`]: {
        marginVertical: value,
      },
      [`${key}HMargin`]: {
        marginHorizontal: value,
      },
      /* Paddings */
      [`${key}Padding`]: {
        padding: value,
      },
      [`${key}BPadding`]: {
        paddingBottom: value,
      },
      [`${key}TPadding`]: {
        paddingTop: value,
      },
      [`${key}RPadding`]: {
        paddingRight: value,
      },
      [`${key}LPadding`]: {
        paddingLeft: value,
      },
      [`${key}VPadding`]: {
        paddingVertical: value,
      },
      [`${key}HPadding`]: {
        paddingHorizontal: value,
      },
    }),
    {},
  ),
);

export default Gutter;
