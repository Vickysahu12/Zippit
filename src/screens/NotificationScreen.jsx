// screens/NotificationsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Dummy Notifications Data
const NOTIFICATIONS_DATA = [
  {
    id: '1',
    type: 'like',
    user: 'Rahul Sharma',
    avatar: 'https://i.pravatar.cc/100?img=1',
    message: 'liked your post',
    time: '2m ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    user: 'Priya Singh',
    avatar: 'https://i.pravatar.cc/100?img=2',
    message: 'commented on your post: "Great news!"',
    time: '15m ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'follow',
    user: 'Amit Kumar',
    avatar: 'https://i.pravatar.cc/100?img=3',
    message: 'started following you',
    time: '1h ago',
    isRead: false,
  },
  {
    id: '4',
    type: 'share',
    user: 'Sneha Patel',
    avatar: 'https://i.pravatar.cc/100?img=4',
    message: 'shared your post',
    time: '3h ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'mention',
    user: 'Vikas Gupta',
    avatar: 'https://i.pravatar.cc/100?img=5',
    message: 'mentioned you in a comment',
    time: '5h ago',
    isRead: true,
  },
  {
    id: '6',
    type: 'like',
    user: 'Anjali Verma',
    avatar: 'https://i.pravatar.cc/100?img=6',
    message: 'liked your comment',
    time: '1d ago',
    isRead: true,
  },
];

const NotificationItem = ({ item }) => {
  const getIconName = () => {
    switch (item.type) {
      case 'like':
        return 'heart';
      case 'comment':
        return 'chatbubble';
      case 'follow':
        return 'person-add';
      case 'share':
        return 'arrow-redo';
      case 'mention':
        return 'at';
      default:
        return 'notifications';
    }
  };

  const getIconColor = () => {
    switch (item.type) {
      case 'like':
        return '#FF6B6B';
      case 'comment':
        return '#4CAF50';
      case 'follow':
        return '#2196F3';
      case 'share':
        return '#FF9800';
      case 'mention':
        return '#9C27B0';
      default:
        return '#757575';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.notificationItem, !item.isRead && styles.unreadItem]}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View
          style={[styles.iconBadge, { backgroundColor: getIconColor() }]}
        >
          <Icon name={getIconName()} size={14} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.userName}>{item.user}</Text>{' '}
          <Text style={styles.messageText}>{item.message}</Text>
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Unread</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Mentions</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={NOTIFICATIONS_DATA}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  // ---------- HEADER ----------
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    marginTop:30
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    letterSpacing: 0.3,
  },
  markAllButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  markAllText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },

  // ---------- TABS ----------
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F4F4F4',
  },
  activeTab: {
    backgroundColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500',
  },
  activeTabText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },

  // ---------- LIST ----------
  listContainer: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },

  // ---------- NOTIFICATION CARD ----------
  notificationItem: {
    flexDirection: 'row',
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 14,

    // Modern shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },

  unreadItem: {
    backgroundColor: '#FFF4F4',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },

  // ---------- AVATAR + BADGE ----------
  avatarContainer: {
    marginRight: 14,
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },

  // ---------- TEXT ----------
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  userName: {
    fontWeight: '700',
    color: '#222',
  },
  messageText: {
    color: '#555',
    fontWeight: '400',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },

  // ---------- UNREAD DOT ----------
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
    marginLeft: 10,
  },
});

export default NotificationsScreen;