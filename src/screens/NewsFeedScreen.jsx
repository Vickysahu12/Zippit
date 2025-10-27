import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { dummyNews } from '../utils/DummyData';

const { width } = Dimensions.get('window');

const NewsFeedScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [news, setNews] = useState(dummyNews);

  const categories = [
    { id: '1', name: 'Popular', icon: '🔥' },
    { id: '2', name: 'Sports', icon: '⚽' },
    { id: '3', name: 'Stock Market', icon: '📈' },
    { id: '4', name: 'Social', icon: '👥' },
    { id: '5', name: 'World', icon: '🌍' },
    { id: '6', name: 'Campus', icon: '🎓' },
  ];

  const stories = [
    { id: '1', name: 'Food Street', image: 'https://picsum.photos/200/300?random=1' },
    { id: '2', name: 'Tech Fest', image: 'https://picsum.photos/200/300?random=2' },
    { id: '3', name: 'New Cafe', image: 'https://picsum.photos/200/300?random=3' },
    { id: '4', name: 'Job Fair', image: 'https://picsum.photos/200/300?random=4' },
  ];

  const toggleLike = (id) => {
    const updated = news.map((item) =>
      item.id === id ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 } : item
    );
    setNews(updated);
  };

  const renderStory = ({ item }) => (
    <TouchableOpacity style={styles.storyItem} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.storyImage} />
      <View style={styles.storyPlay}>
        <Text style={styles.playIcon}>▶</Text>
      </View>
      <Text style={styles.storyName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        selectedCategory === item.name && styles.categoryTabActive,
      ]}
      onPress={() => setSelectedCategory(item.name)}
      activeOpacity={0.7}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderNewsPost = ({ item }) => (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <Image source={{ uri: item.userImage }} style={styles.postUserImage} />
          <View>
            <Text style={styles.postUserName}>{item.userName}</Text>
            <Text style={styles.postTime}>{item.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.postMenu}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Post Title */}
      <Text style={styles.postTitle}>{item.title}</Text>

      {/* Post Content */}
      <Text style={styles.postContent} numberOfLines={3}>
        {item.content}
      </Text>

      {/* Post Image */}
      <Image source={{ uri: item.image }} style={styles.postImage} />

      {/* Location */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.locationText}>{item.location}</Text>
      </View>

      {/* Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleLike(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.actionIcon}>{item.isLiked ? '❤️' : '🤍'}</Text>
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Text style={styles.actionIcon}>🔄</Text>
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bookmarkButton} activeOpacity={0.7}>
          <Text style={styles.actionIcon}>🔖</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.userProfile} activeOpacity={0.8}>
          <Image
            source={{
              uri: 'https://ui-avatars.com/api/?name=User&background=FFEB3B&color=000',
            }}
            style={styles.userProfileImage}
          />
          <Text style={styles.greetingText}>How's it Going?</Text>
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <FlatList
        ListHeaderComponent={
          <>
            {/* Categories */}
            <View style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>New Feeds</Text>
              <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderCategory}
                contentContainerStyle={styles.categoriesList}
              />
            </View>

            {/* Stories */}
            <View style={styles.storiesSection}>
              <FlatList
                data={stories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderStory}
                contentContainerStyle={styles.storiesList}
              />
            </View>
          </>
        }
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={renderNewsPost}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  userProfile: { flexDirection: 'row', alignItems: 'center' },
  userProfileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FFEB3B',
  },
  greetingText: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },

  categoriesSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  categoriesList: { paddingHorizontal: 12 },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
  },
  categoryTabActive: { backgroundColor: '#2196F3' },
  categoryIcon: { fontSize: 16, marginRight: 6 },
  categoryText: { fontSize: 14, fontWeight: '600', color: '#666666' },
  categoryTextActive: { color: '#FFFFFF' },

  storiesSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F8F9FA',
  },
  storiesList: { paddingHorizontal: 12 },
  storyItem: { width: 105, marginHorizontal: 6, alignItems: 'center' },
  storyImage: { width: 105, height: 145, borderRadius: 14 },
  storyPlay: {
    position: 'absolute',
    top: '38%',
    backgroundColor: 'rgba(0,0,0,0.65)',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: { color: '#FFFFFF', fontSize: 16, paddingLeft: 3 },
  storyName: {
    position: 'absolute',
    bottom: 10,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  feedContainer: { paddingBottom: 20 },
  postContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingBottom: 14,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  postHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  postUserImage: { width: 42, height: 42, borderRadius: 21, marginRight: 12 },
  postUserName: { fontSize: 15, fontWeight: '700', color: '#1A1A1A' },
  postTime: { fontSize: 12, color: '#999', marginTop: 2 },
  postMenu: { padding: 6 },
  menuIcon: { fontSize: 22, color: '#666' },
  postTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  postImage: { width, height: 280, resizeMode: 'cover' },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop:1
  },
  locationIcon: { fontSize: 14, marginRight: 5 },
  locationText: { fontSize: 13, color: '#666', fontWeight: '500' },
  postActions: { flexDirection: 'row', paddingHorizontal: 16, alignItems: 'center' },
  actionButton: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  actionIcon: { fontSize: 20, marginRight: 6 },
  actionText: { fontSize: 14, color: '#666', fontWeight: '600' },
  bookmarkButton: { marginLeft: 'auto' },
});

export default NewsFeedScreen;

// work on some discussion about the zippit