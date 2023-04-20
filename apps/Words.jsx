import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";

import Square from "../utils/square";
import Grid from "../components/Grid";
import Controls from "../components/Controls";

const { height, width } = Dimensions.get("window");
const NUM_COLS = 8;
const NUM_ROWS = 10;
const ITEM_SIZE = 30;

const App = () => {
  const [squares, setSquares] = useState(new Array(NUM_ROWS).fill().map(() => new Array(NUM_COLS).fill().map(() => new Square())));
  const [choosenText, setChoosenText] = useState("");

  const onPressItem = (item) => {
    const newSquares = squares.map((row) =>
      row.map((square) => {
        if (square.id === item.id) {
          if (square.isSelected) {
            setChoosenText((prev) => prev.substring(0, prev.length - 1));
            square.isSelected = false;
          } else {
            setChoosenText((prev) => {
              console.log(prev);
              if (prev && prev?.length >= NUM_COLS) return prev;

              return prev + square.letter;
            });
            square.isSelected = true;
          }
        }
        return square;
      })
    );
    setSquares(newSquares);
  };

  const onPressCancel = () => {
    const choosenTextIdsArray = choosenText.split("");

    const newSquares = squares.map((row) =>
      row.map((square) => {
        if (choosenTextIdsArray.includes(square.letter)) {
          if (square.isSelected) {
            square.isSelected = false;
          }
        }
        return square;
      })
    );
    setSquares(newSquares);
    setChoosenText("");
  };

  const onPressSubmit = () => {
    console.log("submitted", choosenText);
  };

  return (
    <View style={styles.container}>
      <Grid data={squares} onPressItem={onPressItem} styles={styles} />
      <Controls styles={styles} choosenText={choosenText} onPressCancel={onPressCancel} onPressSubmit={onPressSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0,
  },
  row: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  square: {
    width: ITEM_SIZE * 1.25,
    height: ITEM_SIZE * 1.5,
    borderRadius: 5,
    margin: 2.5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1.5,
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 50,
  },
  choosenText: {
    height: ITEM_SIZE * 2,
    justifyContent: "center",
  },

  letter: {
    fontSize: 15,
    fontWeight: "bold",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width / 1.5,
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    borderRadius: 100,
  },
  image: {
    width: 30,
    height: 30,
  },
  green_bg: {
    backgroundColor: "green",
  },
  red_bg: {
    backgroundColor: "red",
  },
  flatlistContainer: {
    height: height / 1.4,
  },
});

export default App;
