import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const NewsCard = ({ item, onLike }) => {
  const [liked, setLiked] = useState(item.isLiked);
  const [likeCount, setLikeCount] = useState(item.likes);
  const scaleAnim = new Animated.Value(1);

  const handleLike = () => {
    // Animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Toggle like
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    
    if (onLike) {
      onLike(item.id, !liked);
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image 
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Content Overlay */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Content */}
        <Text style={styles.content} numberOfLines={3}>
          {item.content}
        </Text>

        {/* Meta Info */}
        <View style={styles.metaContainer}>
          {/* Location */}
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>📍</Text>
            <Text style={styles.metaText}>{item.location}</Text>
          </View>

          {/* Time */}
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>🕐</Text>
            <Text style={styles.metaText}>{getTimeAgo(item.createdAt)}</Text>
          </View>
        </View>

        {/* Like Section */}
        <View style={styles.likeContainer}>
          <TouchableOpacity 
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Text style={styles.likeIcon}>
                {liked ? '❤️' : '🤍'}
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <Text style={styles.likeCount}>{likeCount} likes</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - 100, // Leave space for header
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  metaText: {
    fontSize: 14,
    color: '#999',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  likeIcon: {
    fontSize: 32,
    marginRight: 10,
  },
  likeCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default NewsCard;