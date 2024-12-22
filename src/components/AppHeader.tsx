import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {isIOS} from 'util/device';

interface Props {
  headerTitle?: string;
  headerImageSrc?: string;
  hidenLeftHeader?: boolean;
  headerLeftHeaderIcon?: boolean;
  onPressLeftHeader: () => void;
  onPressRightHeader?: () => void;
  headerRightHeaderIcon?: boolean;
  hideRightHeader?: boolean;
  standalone?: boolean;
}

const AppHeader: React.FC<Props> = (props): React.ReactElement => {
  const {
    headerTitle,
    headerImageSrc,
    hidenLeftHeader,
    headerLeftHeaderIcon,
    onPressLeftHeader,
    onPressRightHeader,
    headerRightHeaderIcon,
    hideRightHeader = true, // Set default value here
    standalone,
  } = props;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          marginTop: standalone ? StatusBar.currentHeight : undefined,
          marginBottom: standalone ? undefined : 8,
        },
      ]}>
      <View
        style={[
          styles.header,
          {
            marginTop: standalone ? 0 : isIOS() ? undefined : 32,
          },
        ]}>
        <Pressable
          onPress={onPressLeftHeader}
          style={styles.headerIconContainer}>
          {hidenLeftHeader ? (
            <View />
          ) : headerLeftHeaderIcon ? (
            <Icon name="chevron-left" type="font-awesome" color="#000" />
          ) : (
            <View
              style={[
                styles.headerIconContainer,
                {borderWidth: 1, borderColor: '#E2E4E8'},
              ]}>
              <Icon name="chevron-left" type="font-awesome" color="#000" />
            </View>
          )}
        </Pressable>

        {headerImageSrc ? (
          <Image
            source={headerImageSrc}
            style={{width: 40, height: 40, borderRadius: 8}}
          />
        ) : (
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        )}

        {headerRightHeaderIcon ? (
          hideRightHeader ? (
            <View
              style={[styles.headerIconContainer, {backgroundColor: '#fff'}]}
            />
          ) : (
            <View
              style={[styles.headerIconContainer, {backgroundColor: '#fff'}]}
            />
          )
        ) : hideRightHeader ? (
          <View
            style={[styles.headerIconContainer, {backgroundColor: '#fff'}]}
          />
        ) : (
          <Pressable
            onPress={onPressRightHeader}
            style={styles.headerIconContainer}>
            <Icon name="search" type="font-awesome" color="#000" />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
  },
  header: {
    backgroundColor: '#fff',
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'SFProDisplay-Bold',
  },
});

export default AppHeader;
