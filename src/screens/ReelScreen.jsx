import React, { useRef, useState } from "react";
import { View, FlatList, StatusBar, Dimensions, StyleSheet } from "react-native";
import ReelItem from "../components/ReelItem";
import { REELS_DATA } from "../components/reelsData";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ReelsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <FlatList
        ref={flatListRef}
        data={REELS_DATA}
        renderItem={({ item }) => <ReelItem item={item} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </View>
  );
};

export default ReelsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
