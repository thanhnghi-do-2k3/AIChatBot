import {useFocusEffect} from '@react-navigation/native';
import LayoutProfileItem from 'components/LayoutProfileItem';
import ScreenName from 'constant/ScreenName';

import LottieView from 'lottie-react-native';
import {AppNavigationRef} from 'navigation/index';
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Lottie from 'theme/Lottie';
import {deviceWidth} from 'util/dimension';

const ProfileScreen: React.FC = ({navigation}: any) => {
  // Mock data
  const mockUser = {
    username: 'JohnDoe123',
    id: 'mock123456789012345',
    email: 'johndoe@example.com',
  };

  const mockUsage = {
    name: 'basic',
    dailyTokens: '50',
    monthlyTokens: '1500',
    annuallyTokens: '18000',
  };

  const handleLogout = () => {};

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      behavior="padding"
      keyboardVerticalOffset={100}
      enabled>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <View style={{gap: 8}}>
              <Text style={styles.text_title}>User name</Text>
              <Text style={styles.text_id}>{mockUser.username}</Text>
            </View>
          </View>

          <View style={{gap: 16, width: '100%'}}>
            <Text style={styles.text_account}>Subcription</Text>
            <LayoutProfileItem title="Current Plan" detail={mockUsage.name} />

            {mockUsage.name === 'basic' && (
              <>
                <Text
                  style={[
                    styles.text_account,
                    {
                      fontSize: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      marginTop: 16,
                    },
                  ]}>
                  Please subscribe to get more tokens and access a more powerful
                  bot.
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    //navigation.navigate(ScreenName.SubcriptionScreen);
                  }}>
                  <LottieView
                    source={Lottie.paidAnimation}
                    autoPlay
                    loop
                    style={{width: 100, height: 100, alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              </>
            )}

            <Text style={styles.text_account}>Usage</Text>

            <LayoutProfileItem
              title="Daily Token"
              detail={mockUsage.dailyTokens}
            />
            <LayoutProfileItem
              title="Monthly Token"
              detail={mockUsage.monthlyTokens || '0'}
            />
            <LayoutProfileItem
              title="Annually Token"
              detail={mockUsage.annuallyTokens || '0'}
            />

            <Text style={styles.text_account}>Account</Text>

            <LayoutProfileItem
              title="User ID"
              detail={`${mockUser.id.slice(0, 15)}...`}
            />

            <LayoutProfileItem title="Birth Date" detail={'N/A'} />
            <LayoutProfileItem title="Gender" detail={'N/A'} />
            <LayoutProfileItem title="Country" detail={'N/A'} />
            <LayoutProfileItem title="Phone Number" detail={'N/A'} />
            <LayoutProfileItem title="Email" detail={mockUser.email} />

            <View
              style={{
                flexDirection: 'column',
                rowGap: 16,
              }}>
              <Text style={styles.text_account}>Privacy and Terms</Text>
              <View
                style={{
                  rowGap: 12,
                }}>
                <TouchableOpacity onPress={() => {}} style={styles.button}>
                  <Text style={styles.text_account}>Terms of Service</Text>
                  <Icon
                    name="chevron-right"
                    type="font-awesome"
                    color="#9FA1A4"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={styles.button}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 8,
                    }}>
                    <Text style={styles.text_account}>Privacy Policy</Text>
                  </View>
                  <Icon
                    name="chevron-right"
                    type="font-awesome"
                    color="#9FA1A4"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                rowGap: 16,
              }}>
              <Text style={styles.text_account}>Account Management</Text>
              <View
                style={{
                  rowGap: 12,
                }}>
                <TouchableOpacity
                  onPress={handleLogout}
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 18,
                    paddingRight: 18,
                    borderRadius: 16,
                    backgroundColor: '#f5f6f7',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 8,
                    }}>
                    <Icon name="sign-out" type="font-awesome" color="#EC5966" />
                    <Text
                      style={{
                        fontFamily: 'SFProRegular',
                        fontSize: 14,
                        color: '#EC5966',
                      }}>
                      Logout
                    </Text>
                  </View>
                  <Icon
                    name="chevron-right"
                    type="font-awesome"
                    color="#9FA1A4"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingBottom: 200,
    paddingRight: 24,
    paddingLeft: 24,
    gap: 16,
  },
  text_title: {
    fontFamily: 'SFProRegular',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: '#7D7D7D',
  },
  text_id: {
    fontFamily: 'SFProRegular',
    fontWeight: 700,
    lineHeight: 28.64,
    fontSize: 24,
    letterSpacing: -1,
    textAlign: 'center',
    color: '#04022A',
  },
  text_account: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
    color: '#2C2C2C',
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 16,
    backgroundColor: '#f5f6f7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});