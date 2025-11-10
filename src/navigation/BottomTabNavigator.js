import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, Text } from 'react-native';

// Import Screens
import NewsFeedScreen from '../screens/NewsFeedScreen';
import ReelScreen from '../screens/ReelScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Profile from '../screens/Profile';

// Import Custom Icons
import boy from '../assets/icons/boy.png';
import reels from '../assets/icons/reels.png';
import text from '../assets/icons/text.png';
import Feed from '../assets/icons/Feed.png';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ focused, color }) => {
          let iconSource;

          if (route.name === 'Feed') {
            iconSource = Feed;
          } else if (route.name === 'Reels') {
            iconSource = reels;
          } else if (route.name === 'Notifications') {
            iconSource = text;
          } else if (route.name === 'Profile') {
            iconSource = boy;
          }

          return (
            <View style={styles.iconContainer}>
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#FF6B6B' : '#888' },
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.label,
                  { color: focused ? '#FF6B6B' : '#888' },
                ]}
              >
                {route.name}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={NewsFeedScreen}
        options={{ title: 'Feed' }}
      />
      <Tab.Screen
        name="Reels"
        component={ReelScreen}
        options={{ title: 'Reels' }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ title: 'Alerts' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFF',
    borderTopWidth: 0.8,
    borderTopColor: '#E0E0E0',
    height: 65,
    paddingBottom: 5,
    paddingTop: 5,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default BottomTabNavigator;
