import ScreenName from 'constant/ScreenName';
import React, {useLayoutEffect, useMemo, useRef} from 'react';
import {Animated} from 'react-native';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'theme';

const TabBar = ({state, navigation}: any) => {
  const insets = useSafeAreaInsets();

  const hideTabBar = state.routes[state.index].state?.index > 0;

  const selectedTextAnim = useRef(new Animated.Value(0)).current;

  const animationText = () => {
    selectedTextAnim.setValue(0);
    Animated.timing(selectedTextAnim, {
      toValue: 8,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useLayoutEffect(() => {
    animationText();
  }, [state.index]);

  if (hideTabBar) {
    return null;
  }

  const renderIcon = (route: any, isFocused: boolean) => {
    switch (route.name) {
      case ScreenName.EmailNavigator:
        return (
          <Icon
            name="envelope"
            size={24}
            color={isFocused ? Colors.primary : Colors.black}
          />
        );
      case ScreenName.ChatNavigator:
        return (
          <Icon
            name="comment-alt"
            size={24}
            color={isFocused ? Colors.primary : Colors.black}
          />
        );
      case ScreenName.ChatbotNavigator:
        return (
          <Icon
            name="robot"
            size={24}
            color={isFocused ? Colors.primary : Colors.black}
          />
        );
      case ScreenName.KnowledgeNavigator:
        return isFocused ? (
          <Icon name="book-open" size={24} color={Colors.primary} />
        ) : (
          <Icon name="book" size={24} color={Colors.black} />
        );
      case ScreenName.ProfileScreen:
        return (
          <Icon
            name="user-circle"
            size={24}
            color={isFocused ? Colors.primary : Colors.black}
          />
        );
    }
  };

  const getLabel = (name: string) => {
    switch (name) {
      case ScreenName.ChatNavigator:
        return 'Chat';
      case ScreenName.ChatbotNavigator:
        return 'Chatbots';
      case ScreenName.KnowledgeNavigator:
        return 'Knowledge';
      case ScreenName.ProfileScreen:
        return 'Profile';
      case ScreenName.EmailNavigator:
        return 'Email';
    }
  };

  const getTabTitle = (route: {name: string}, isFocused: boolean) => {
    if (!isFocused) {
      return null;
    }

    return (
      <Animated.View
        style={[styles.tabTitleContainer, {marginTop: selectedTextAnim}]}>
        <Text style={[styles.tabTitle, {color: Colors.primary}]}>
          {getLabel(route.name)}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.tabView}>
      <View style={[styles.container, {marginBottom: insets.bottom}]}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}>
              {renderIcon(route, isFocused)}
              {getTabTitle(route, isFocused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    // borderTopColor: Colors.orange,
    // borderTopWidth: 1,
  },
  container: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingVertical: 5,
  },
  tabTitleContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabTitle: {
    fontWeight: '500',
  },
  viewTitle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedState: {
    height: 4,
    // width: 24,
    borderRadius: 2,
    alignSelf: 'center',
  },
  badgeText: {},
});

export default TabBar;
