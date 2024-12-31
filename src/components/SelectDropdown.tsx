import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import {SlideInDown} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from './BottomSheet';

interface DataSchema {
  label: string;
  value: any;
}

interface SelectDropDownProps {
  data: DataSchema[];
  onSelect: (value: any) => void;
  heightPercent?: 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
  style?: ViewStyle;
  renderItem: (
    item?: DataSchema,
    index?: number,
    isSelect?: boolean,
  ) => React.ReactElement;
  labelStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const SelectDropdown: React.FC<SelectDropDownProps> = props => {
  const [isDropdownActive, setIsDropdownActive] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<any>();

  return (
    <>
      <TouchableOpacity
        style={[styles.container, props.style]}
        onPress={() => setIsDropdownActive(true)}>
        <View style={[styles.container, props.contentContainerStyle]}>
          <Text
            style={[
              {
                color: '#000',
                fontSize: 16,
                fontWeight: 'bold',
              },
              props.labelStyle,
            ]}>
            {selectedValue.label}
          </Text>
          {!isDropdownActive ? (
            <Icon name="chevron-down" />
          ) : (
            <Icon name="chevron-up" />
          )}
        </View>
      </TouchableOpacity>

      {isDropdownActive && (
        <BottomSheet
          entering={SlideInDown}
          onBackdropPress={() => {
            setIsDropdownActive(false);
          }}
          heightPercentage={props.heightPercent ?? 50}
          isVisible={isDropdownActive}>
          <View>
            {props.data.map((item, index) => {
              const isSelect = selectedValue === item.value;
              return (
                <TouchableOpacity
                  onPress={() => {
                    setIsDropdownActive(false);
                    setSelectedValue(item);
                    props.onSelect(item.value);
                  }}>
                  {props.renderItem(item, index, isSelect)}
                </TouchableOpacity>
              );
            })}
          </View>
        </BottomSheet>
      )}
    </>
  );
};

export default SelectDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f8f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
});
