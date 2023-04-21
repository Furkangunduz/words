import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

function Score({ score, styles, falseGuessInRowCount, setIsGamePaused }) {
  const pauseImage = require("../assets/pause.png");
  const playImage = require("../assets/play.png");
  const [activeImage, setActiveImage] = useState(pauseImage);

  const onPress = () => {
    setIsGamePaused((prev) => !prev);
    if (activeImage === pauseImage) {
      setActiveImage(playImage);
    } else {
      setActiveImage(pauseImage);
    }
  };

  return (
    <View style={[styles.fullWidth, { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }]}>
      <TouchableOpacity onPress={() => onPress()}>
        <View style={[styles.button, { paddingHorizontal: 10, paddingVertical: 10 }]}>
          <Image source={activeImage} style={{ width: 20, height: 20, tintColor: "rgba(0,0,0,0.7)" }}></Image>
        </View>
      </TouchableOpacity>

      <View
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          marginBottom: 25,
          borderWidth: 2,
          borderColor: "rgba(0,0,0,0.7)",
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 25 }}>
          SCORE:
          <Text style={{ fontSize: 25, color: "red" }}> {score}</Text>
        </Text>
      </View>
    </View>
  );
}

export default Score;
