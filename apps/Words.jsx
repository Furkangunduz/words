import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";

import Square from "../utils/square";
import Wordlist from "../utils/wordList";
import wordScores from "../utils/wordScores";

import Grid from "../components/Grid";
import Controls from "../components/Controls";

const { height, width } = Dimensions.get("window");

const NUM_COLS = 8;
const NUM_ROWS = 10;
const ITEM_SIZE = 30;
const MAX_FALSE_GUESSES = 3;
const WORDLIST = new Wordlist();
const WORDSCORES = wordScores;

const App = () => {
  const [squares, setSquares] = useState(new Array(NUM_ROWS).fill().map(() => new Array(NUM_COLS).fill().map(() => new Square())));
  const [choosenText, setChoosenText] = useState("");
  const [falseGuessInRowCount, setFalseGuessInRowCount] = useState(0);
  const [score, setScore] = useState(0);

  const onPressItem = (item) => {
    const newSquares = travel(squares, (square) => {
      if (square.id === item.id) {
        if (square.isSelected) {
          setChoosenText((prev) => prev.substring(0, prev.length - 1));
          square.isSelected = false;
        } else {
          setChoosenText((prev) => {
            if (prev && prev?.length >= NUM_COLS) return prev;

            return prev + square.letter;
          });
          square.isSelected = true;
        }
      }
    });
    setSquares(newSquares);
  };

  const onPressCancel = () => {
    const letterToRemove = choosenText.split("").pop();

    const newSquares = travel(squares, (square) => {
      if (square.letter === letterToRemove) {
        if (square.isSelected) {
          square.isSelected = false;
        }
      }
    });
    setSquares(newSquares);
    setChoosenText((prev) => prev.substring(0, prev.length - 1));
  };

  const onPressSubmit = () => {
    if (!choosenText || choosenText.length <= 0) return;
    const doesWordTrue = WORDLIST.doesHaveWord(choosenText);

    if (!doesWordTrue) {
      setFalseGuessInRowCount((prev) => {
        if (prev + 1 >= MAX_FALSE_GUESSES) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    } else {
      setFalseGuessInRowCount(0);
      const score = choosenText.split("").reduce((acc, letter) => acc + WORDSCORES[letter] ?? 0, 0);
      setScore((prev) => prev + score);
    }

    travel(squares, (square) => {
      if (square.isSelected) {
        square.isSelected = false;
      }
    });

    setChoosenText("");
  };

  const travel = (squares, action) => {
    const newSquares = squares.map((row) =>
      row.map((square) => {
        action(square);
        return square;
      })
    );
    return newSquares;
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
    height: ITEM_SIZE * 1.3,
    borderRadius: 5,
    margin: 1.5,
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
    width: "100%",
    justifyContent: "center",
  },
  letter: {
    fontSize: 25,
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
    height: height / 1.5,
  },
});

export default App;
