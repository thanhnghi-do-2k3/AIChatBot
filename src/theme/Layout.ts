import {StyleSheet} from 'react-native';

const Layout = StyleSheet.create({
  /* Column Layouts */
  col: {
    flexDirection: 'column',
  },
  colReverse: {
    flexDirection: 'column-reverse',
  },
  colCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colVCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  colHCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  /* Row Layouts */
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowVCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowHCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /* Default Layouts */
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignItemsStretch: {
    alignItems: 'stretch',
  },
  alignItemsEnd: {
    alignItems: 'flex-end',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentAround: {
    justifyContent: 'space-around',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  justifyContentEvenly: {
    justifyContent: 'space-evenly',
  },
  justifyContentEnd: {
    justifyContent: 'flex-end',
  },
  justifyContentStart: {
    justifyContent: 'flex-start',
  },
  scrollGrow: {
    flexGrow: 1,
  },
  scrollSpaceAround: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  selfStretch: {
    alignSelf: 'stretch',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  /* Sizes Layouts */
  fill: {
    flex: 1,
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  threeQuartersWidth: {
    width: '75%',
  },
  halfWidth: {
    width: '50%',
  },
  fullHeight: {
    height: '100%',
  },
  /* Operation Layout */
  mirror: {
    transform: [{scaleX: -1}],
  },
  rotate90: {
    transform: [{rotate: '90deg'}],
  },
  rotate90Inverse: {
    transform: [{rotate: '-90deg'}],
  },
  // Position
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
  },
  top0: {
    top: 0,
  },
  bottom0: {
    bottom: 0,
  },
  left0: {
    left: 0,
  },
  right0: {
    right: 0,
  },
});

export default Layout;