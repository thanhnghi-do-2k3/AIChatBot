import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';

interface Props {
  title: string;
  detail?: string;
  iconLeft?: React.ReactElement;
  onPress?: () => void;
  badge?: {
    text: string;
    textColor: string;
    backgroundColor: string;
  };
}

const LayoutProfileItem: React.FC<Props> = props => {
  const RenderDetail = () => {
    if (props.badge) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Text
              style={{
                color: props.badge.textColor,
                backgroundColor: props.badge.backgroundColor,
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 16,
              }}>
              {props.badge.text}
            </Text>
          </View>
        </View>
      );
    }
    return props.detail ? (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.detail}>{props.detail}</Text>
      </View>
    ) : (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          {props.iconLeft}
          <Text style={styles.logout}>{props.title}</Text>
        </View>
        <Icon
          name="chevron-right"
          type="font-awesome"
          color="#9FA1A4"
          size={16}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <RenderDetail />
      </View>
    </TouchableOpacity>
  );
};

export default LayoutProfileItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 16,
    backgroundColor: '#f5f6f7',
  },
  title: {
    fontWeight: 500,
    fontFamily: 'SFProRegular',
    fontSize: 16,
    lineHeight: 24,
    color: '#2C2C2C',
  },
  detail: {
    fontFamily: 'SFProRegular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
    color: '#9FA1A4',
  },
  logout: {
    fontFamily: 'SFProRegular',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.5,
    color: '#E93544',
  },
});
