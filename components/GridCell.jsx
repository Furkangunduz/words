import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default ({ item, onPressItem, styles }) => {
  const backgroundColor = item.isUsed ? "red" : "white";
  const color = item.isUsed ? "white" : "black";
  return (
    <TouchableOpacity style={[styles.square, { backgroundColor }]} onPress={() => onPressItem(item)}>
      <View>
        <Text style={[styles.letter, { color }]}>{item.letter}</Text>
      </View>
    </TouchableOpacity>
  );
};
