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
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  markAllText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unreadItem: {
    backgroundColor: '#FFF5F5',
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B6B',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  userName: {
    fontWeight: 'bold',
    color: '#333',
  },
  messageText: {
    color: '#666',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginLeft: 8,
  },
});

export default NotificationsScreen;