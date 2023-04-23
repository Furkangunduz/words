import { TouchableOpacity, Text, Animated, ImageBackground, View } from "react-native";
import { useEffect, useRef, memo, useMemo } from "react";
import { isBgLight } from "../utils/utils";
import Square from "../utils/square";

export default memo(({ item, onPressItem, styles = {}, isGameOver, isGamePaused }) => {
  const backgroundColor = isGamePaused ? "#000" : item.isSelected ? "#000000" : item.color || "#000000";
  const color = !isBgLight(backgroundColor) ? "rgba(255,255,255,0.9)" : "black";
  const fadeAnim = useMemo(() => new Animated.Value(0), []);

  useMemo(() => {
    if (item.letter) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, item.letter]);

  return (
    <TouchableOpacity
      style={[
        styles.square,
        item.letter && {
          backgroundColor: item.isSelected ? "#000000" : !(item.isIce || (item.isIceEffected && item.life > 1)) ? item.color : "#FFFFFF",
        },
        item.isSelected && styles.selected,
        item.isVowel ? styles.circle : styles.rect,
        (item.isIce || (item.isIceEffected && item.life > 1)) && { borderWidth: 3, borderColor: "#92bbfc" },
      ]}
      disabled={item.letter == undefined || item.letter == null || item.letter == 0 || item.isSelected || isGameOver || isGamePaused}
      onPress={() => onPressItem(item)}
    >
      {item.letter && (item.isIce || (item.isIceEffected && item.life > 1)) ? (
        <View>
          <ImageBackground
            source={Square.icePng}
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              position: "relative",
            }}
          >
            <Text style={[styles.letter]}>{item.letter}</Text>
          </ImageBackground>
        </View>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={[styles.letter, { color }]}>{item.letter}</Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
});
