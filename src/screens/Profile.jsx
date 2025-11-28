// screens/MenuScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true, rightComponent }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color="#FF6B6B" />
      </View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {rightComponent || (showArrow && (
      <Icon name="chevron-forward" size={20} color="#999" />
    ))}
  </TouchableOpacity>
);

const MenuSection = ({ title, children }) => (
  <View style={styles.menuSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const MenuScreen = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/200?img=12' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="create-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <MenuSection title="ACCOUNT">
        <MenuItem
          icon="person-outline"
          title="Profile"
          subtitle="View and edit your profile"
          onPress={() => {}}
        />
        <MenuItem
          icon="settings-outline"
          title="Settings"
          subtitle="Privacy, security, and more"
          onPress={() => {}}
        />
        <MenuItem
          icon="shield-checkmark-outline"
          title="Privacy"
          subtitle="Control your privacy settings"
          onPress={() => {}}
        />
      </MenuSection>

      {/* Preferences Section */}
      <MenuSection title="PREFERENCES">
        <MenuItem
          icon="notifications-outline"
          title="Push Notifications"
          subtitle="Manage notification preferences"
          showArrow={false}
          rightComponent={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E0E0E0', true: '#FF6B6B' }}
              thumbColor="#FFFFFF"
            />
          }
        />
        <MenuItem
          icon="moon-outline"
          title="Dark Mode"
          subtitle="Switch to dark theme"
          showArrow={false}
          rightComponent={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E0E0E0', true: '#FF6B6B' }}
              thumbColor="#FFFFFF"
            />
          }
        />
        <MenuItem
          icon="language-outline"
          title="Language"
          subtitle="English"
          onPress={() => {}}
        />
      </MenuSection>

      {/* Content Section */}
      <MenuSection title="CONTENT">
        <MenuItem
          icon="bookmark-outline"
          title="Saved Posts"
          subtitle="View your saved news"
          onPress={() => {}}
        />
        <MenuItem
          icon="time-outline"
          title="Reading History"
          subtitle="Articles you've read"
          onPress={() => {}}
        />
        <MenuItem
          icon="stats-chart-outline"
          title="Your Activity"
          subtitle="See your reading stats"
          onPress={() => {}}
        />
      </MenuSection>

      {/* Support Section */}
      <MenuSection title="SUPPORT">
        <MenuItem
          icon="help-circle-outline"
          title="Help Center"
          subtitle="Get help and support"
          onPress={() => {}}
        />
        <MenuItem
          icon="mail-outline"
          title="Contact Us"
          subtitle="Send us your feedback"
          onPress={() => {}}
        />
        <MenuItem
          icon="information-circle-outline"
          title="About"
          subtitle="Version 1.0.0"
          onPress={() => {}}
        />
      </MenuSection>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Icon name="log-out-outline" size={24} color="#FF6B6B" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤️ in India</Text>
        <Text style={styles.footerVersion}>v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop:30
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  menuSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 12,
    color: '#CCC',
  },
});

export default MenuScreen;