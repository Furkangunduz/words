import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Square from "../utils/square";
import Grid from "../components/Grid";

const NUM_COLUMNS = 8;
const ITEM_SIZE = 30;
const App = () => {
  const [squares, setSquares] = useState(new Array(NUM_COLUMNS).fill().map(() => new Array(10).fill().map(() => new Square())));

  const onPressItem = (item) => {
    const newSquares = squares.map((row) =>
      row.map((square) => {
        if (square.id === item.id) {
          square.isUsed = true;
        }
        return square;
      })
    );
    setSquares(newSquares);
  };

  return (
    <View style={styles.container}>
      <Grid data={squares} onPressItem={onPressItem} styles={styles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  square: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.25,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1.5,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#DDD",
    padding: 10,
    borderRadius: 5,
  },
  letter: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default App;
