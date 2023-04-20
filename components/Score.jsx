import { View, Text } from "react-native";

function Score({ score, styles }) {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 40 }}>
        Score:
        <Text style={{ fontSize: 40, color: "red" }}> {score}</Text>
      </Text>
    </View>
  );
}

export default Score;
