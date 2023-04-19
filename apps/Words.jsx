import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Square from "../utils/square";

const NUM_COLUMNS = 8;
const ITEM_SIZE = 30;

const Grid = ({ data, onPressItem }) => {
  return data.map((item, index) => (
    <View key={index} style={styles.row}>
      {item.map((square, index) => (
        <GridCell key={"cell" + index} item={square} onPressItem={onPressItem} />
      ))}
    </View>
  ));
};

const GridCell = ({ item, onPressItem }) => {
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
      <Grid data={squares} onPressItem={onPressItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    borderWidth: 1, // Add this to show border around the container
    borderColor: "rgba(0,0,0,0.2)", // Add this to set the color of the border
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
