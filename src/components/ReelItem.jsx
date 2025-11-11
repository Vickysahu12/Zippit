import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";

// Physical icons (replace Ionicons)
import heart from "../assets/icons/heart.png"
import chat from "../assets/icons/chat.png" 
import arrows from "../assets/icons/arrows.png"
import send from "../assets/icons/send.png"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ReelItem = ({ item }) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.reelContainer}>
      <Image source={{ uri: item.image }} style={styles.reelImage} />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradientBottom}
      />

      {/* Top Section */}
      <View style={styles.topBar}>
        <Text style={styles.reelLabel}>Reels</Text>
        <TouchableOpacity>
          <Image source={arrows} style={{ width: 25, height: 25, tintColor: "#fff" }} />
        </TouchableOpacity>
      </View>

      {/* Right Side Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => setLiked(!liked)}>
          <Image
            source={heart}
            style={[styles.icon, { tintColor: liked ? "#FF4D67" : "#FFF" }]}
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image source={chat} style={styles.icon} />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image source={send} style={styles.icon} />
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Info */}
      <View style={styles.bottomInfo}>
        <View style={styles.authorRow}>
          <Image
            source={{ uri: `https://i.pravatar.cc/100?img=${item.id}` }}
            style={styles.avatar}
          />
          <Text style={styles.authorName}>{item.author}</Text>
          <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.reelTitle}>{item.title}</Text>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReelItem;

const styles = StyleSheet.create({
  reelContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "relative",
    backgroundColor: "#000",
  },
  reelImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  gradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  topBar: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reelLabel: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  actionsContainer: {
    position: "absolute",
    right: 15,
    bottom: 120,
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: "#FFF",
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  bottomInfo: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 100,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  authorName: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  followBtn: {
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  followText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  reelTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginVertical: 6,
  },
  categoryBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
  },
});
