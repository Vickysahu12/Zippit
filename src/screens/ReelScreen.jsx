// screens/ReelsScreen.js
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Dummy Reels Data
const REELS_DATA = [
  {
    id: '1',
    title: 'Breaking: Major Political Summit',
    category: 'Politics',
    image: 'https://picsum.photos/400/700?random=1',
    likes: 1200,
    comments: 340,
    shares: 89,
    author: 'CNN News',
  },
  {
    id: '2',
    title: 'Cricket Finals: Historic Win',
    category: 'Sports',
    image: 'https://picsum.photos/400/700?random=2',
    likes: 2500,
    comments: 890,
    shares: 456,
    author: 'ESPN',
  },
  {
    id: '3',
    title: 'Tech Giant Launches New AI',
    category: 'Technology',
    image: 'https://picsum.photos/400/700?random=3',
    likes: 3400,
    comments: 1200,
    shares: 678,
    author: 'TechCrunch',
  },
  {
    id: '4',
    title: 'Climate Change: New Report',
    category: 'Environment',
    image: 'https://picsum.photos/400/700?random=4',
    likes: 890,
    comments: 234,
    shares: 123,
    author: 'BBC News',
  },
];

const ReelItem = ({ item, isActive }) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.reelContainer}>
      {/* Background Image */}
      <Image source={{ uri: item.image }} style={styles.reelImage} />
      
      {/* Gradient Overlay */}
      <View style={styles.gradientOverlay} />

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <View style={styles.authorSection}>
            <Image
              source={{ uri: `https://i.pravatar.cc/100?img=${item.id}` }}
              style={styles.authorAvatar}
            />
            <Text style={styles.authorName}>{item.author}</Text>
          </View>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>

          <Text style={styles.reelTitle}>{item.title}</Text>
        </View>

        {/* Right Side Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setLiked(!liked)}
          >
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              size={32}
              color={liked ? '#FF6B6B' : '#FFFFFF'}
            />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="chatbubble-outline" size={30} color="#FFFFFF" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="arrow-redo-outline" size={30} color="#FFFFFF" />
            <Text style={styles.actionText}>{item.shares}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="ellipsis-vertical" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ReelsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={REELS_DATA}
        renderItem={({ item, index }) => (
          <ReelItem item={item} isActive={index === activeIndex} />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'relative',
  },
  reelImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 80,
  },
  bottomInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  authorName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reelTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});

export default ReelsScreen;