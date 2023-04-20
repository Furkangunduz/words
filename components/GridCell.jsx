import { TouchableOpacity, View, Text, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { isBgLight } from "../utils/utils";

export default ({ item, onPressItem, styles = {}, isGameOver }) => {
  const backgroundColor = item.isSelected ? "#000000" : item.color;
  const color = !isBgLight(backgroundColor) ? "white" : "black";
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (item.letter) {
      Animated.timing(fadeAnim, {
        toValue: 0.9,
        duration: 750,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 750,
        useNativeDriver: true,
      }).start();
    }
  }, [item.letter]);

  return (
    <TouchableOpacity
      style={[
        styles.square,
        item.letter && {
          backgroundColor: item.isSelected ? "#000000" : item.color,
        },
        item.isSelected && styles.selected,
        item.isVowel ? styles.circle : styles.rect,
      ]}
      disabled={item.letter == undefined || item.letter == null || item.letter == 0 || item.isSelected || isGameOver}
      onPress={() => onPressItem(item)}
    >
      {item.letter && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={[styles.letter, { color }]}>{item.letter}</Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};
