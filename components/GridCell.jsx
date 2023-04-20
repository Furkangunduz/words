import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

export default ({ item, onPressItem, styles = {}, isGameOver }) => {
  const backgroundColor = item.isSelected ? "red" : "white";
  const color = item.isSelected ? "white" : "black";
  const { letter } = item;

  return (
    <TouchableOpacity
      style={[
        styles.square,
        {
          backgroundColor,
        },
      ]}
      disabled={letter == undefined || letter == null || letter == 0 || item.isSelected || isGameOver}
      onPress={() => onPressItem(item)}
    >
      {letter && (
        <View>
          <Text style={[styles.letter, { color }]}>{item.letter}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
