import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { dummyNews } from "../utils/DummyData";

import heart from "../assets/icons/heart.png"
import chat from "../assets/icons/chat.png" 
import send from "../assets/icons/send.png"

const { width } = Dimensions.get("window");

const NewsFeedScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const [news, setNews] = useState(dummyNews);

  const categories = [
    { id: "1", name: "Popular", icon: "🔥" },
    { id: "2", name: "Sports", icon: "⚽" },
    { id: "3", name: "Stock Market", icon: "📈" },
    { id: "4", name: "Social", icon: "👥" },
    { id: "5", name: "World", icon: "🌍" },
    { id: "6", name: "Campus", icon: "🎓" },
  ];

  const stories = [
    { id: "1", name: "Food Street", image: "https://picsum.photos/200/300?random=1" },
    { id: "2", name: "Tech Fest", image: "https://picsum.photos/200/300?random=2" },
    { id: "3", name: "New Cafe", image: "https://picsum.photos/200/300?random=3" },
    { id: "4", name: "Job Fair", image: "https://picsum.photos/200/300?random=4" },
  ];

  const toggleLike = (id) => {
    setNews((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
  };

  /* ------------------ STORY ------------------ */
  const StoryCard = ({ item }) => (
    <TouchableOpacity style={styles.storyItem} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.storyImage} />
      <View style={styles.storyOverlay}>
        <Text style={styles.playIcon}>▶</Text>
      </View>
      <Text style={styles.storyName}>{item.name}</Text>
    </TouchableOpacity>
  );

  /* ------------------ CATEGORY ------------------ */
  const CategoryTab = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        selectedCategory === item.name && styles.categoryTabActive,
      ]}
      onPress={() => setSelectedCategory(item.name)}
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

  /* ------------------ POST ------------------ */
  const NewsPost = ({ item }) => (
    <View style={styles.postContainer}>
      {/* Header */}
      <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <Image source={{ uri: item.userImage }} style={styles.userPic} />

          <View>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.postTime}>{item.timeAgo}</Text>
          </View>
        </View>

        <Text style={styles.menuIcon}>⋮</Text>
      </View>

      {/* Title */}
      <Text style={styles.postTitle}>{item.title}</Text>

      {/* Content */}
      <Text style={styles.postContent} numberOfLines={3}>
        {item.content}
      </Text>

      {/* Image */}
      <Image source={{ uri: item.image }} style={styles.postImage} />

      {/* Location */}
      <View style={styles.locationRow}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.locationText}>{item.location}</Text>
      </View>

        {/* Actions */}
      <View style={styles.actionsRow}>
        {/* Like */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleLike(item.id)}
        >
          <Image
            source={item.isLiked ? require("../assets/icons/heart.png") : heart}
            style={styles.iconImage}
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        {/* Comment */}
        <TouchableOpacity style={styles.actionButton}>
          <Image source={chat} style={styles.iconImage} />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        {/* Share */}
        <TouchableOpacity style={styles.actionButton}>
          <Image source={send} style={styles.iconImage} />
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>

        {/* Bookmark (emoji hi rehne diya) */}
        <TouchableOpacity style={styles.bookmarkButton}>
          <Text style={styles.actionIcon}>🔖</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://ui-avatars.com/api/?name=User&background=FFEB3B&color=000",
          }}
          style={styles.headerProfile}
        />
        <Text style={styles.greetingText}>How's it Going?</Text>
      </View>

      {/* Feed */}
      <FlatList
        ListHeaderComponent={
          <>
            {/* Categories */}
            <Text style={styles.sectionTitle}>New Feeds</Text>
            <FlatList
              data={categories}
              horizontal
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => <CategoryTab item={item} />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />

            {/* Stories */}
            <FlatList
              data={stories}
              horizontal
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => <StoryCard item={item} />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesList}
            />
          </>
        }
        data={news}
        renderItem={({ item }) => <NewsPost item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

/* ----------------------- STYLES ----------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 45,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerProfile: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#FFEB3B",
  },
  greetingText: { fontSize: 16, fontWeight: "600" },

  /* Categories */
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  categoriesList: { paddingHorizontal: 10, marginBottom: 5 },
  categoryTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 22,
    backgroundColor: "#F1F1F1",
  },
  categoryTabActive: { backgroundColor: "#007bff" },
  categoryTextActive: { color: "#fff" },
  categoryIcon: { marginRight: 6, fontSize: 16 },
  categoryText: { fontSize: 14, fontWeight: "600", color: "#666" },

  /* Stories */
  storiesList: { paddingHorizontal: 10, paddingVertical: 12 },
  storyItem: { marginRight: 10 },
  storyImage: { width: 105, height: 145, borderRadius: 14 },
  storyOverlay: {
    position: "absolute",
    top: "38%",
    left: "30%",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 25,
  },
  playIcon: { color: "#fff", fontSize: 14 },
  storyName: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 10,
    paddingVertical: 4,
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
  },

  /* Posts */
  postContainer: { backgroundColor: "#FFF", marginBottom: 8 },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    paddingBottom: 10,
  },
  postHeaderLeft: { flexDirection: "row", alignItems: "center" },
  userPic: { width: 42, height: 42, borderRadius: 21, marginRight: 12 },
  userName: { fontSize: 15, fontWeight: "700" },
  postTime: { fontSize: 12, color: "#777" },

  menuIcon: { fontSize: 20, color: "#555" },

  postTitle: {
    fontSize: 17,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  postContent: {
    paddingHorizontal: 16,
    color: "#666",
    lineHeight: 20,
    marginBottom: 14,
  },
  postImage: { width, height: 280, resizeMode: "cover" },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  locationIcon: { marginRight: 5 },
  locationText: { color: "#666", fontWeight: "500" },

  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  actionButton: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  actionIcon: { fontSize: 20, marginRight: 6 },
  actionText: { fontSize: 14, color: "#666", fontWeight: "600" },
  bookmarkButton: { marginLeft: "auto" },

  iconImage: {
  width: 22,
  height: 22,
  marginRight: 6,
  resizeMode: "contain",
},

});

export default NewsFeedScreen;
