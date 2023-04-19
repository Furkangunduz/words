import React from "react";
import { View, StyleSheet } from "react-native";
import GridCell from "./GridCell";

export default ({ data, onPressItem, styles }) => {
  return data.map((item, index) => (
    <View key={index} style={styles.row}>
      {item.map((square, index) => (
        <GridCell key={"cell" + index} item={square} styles={styles} onPressItem={onPressItem} />
      ))}
    </View>
  ));
};
