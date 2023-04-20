import { View, Text } from "react-native";

function Score({ score, styles }) {
  return (
    <View style={{ padding: 10, paddingBottom: 25 }}>
      <Text style={{ fontSize: 30 }}>
        Score:
        <Text style={{ fontSize: 30, color: "red" }}> {score}</Text>
      </Text>
    </View>
  );
}

export default Score;
