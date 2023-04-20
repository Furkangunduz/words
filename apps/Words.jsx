import React, { useState } from "react";
import { View } from "react-native";
import { Dimensions } from "react-native";

import style from "../style";

import Square from "../utils/square";
import Wordlist from "../utils/wordList";
import wordScores from "../utils/wordScores";

import travel from "../utils/utils";

import Grid from "../components/Grid";
import Controls from "../components/Controls";
import Score from "../components/Score";

const { height, width } = Dimensions.get("window");

const NUM_COLS = 8;
const NUM_ROWS = 10;
const ITEM_SIZE = 30;
const MAX_FALSE_GUESSES = 3;
const WORDLIST = new Wordlist();
const WORDSCORES = wordScores;

const styles = style(ITEM_SIZE, width, height);

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
      alert("yanlış");
    } else {
      setFalseGuessInRowCount(0);
      const score = choosenText.split("").reduce((acc, letter) => acc + WORDSCORES[letter] ?? 0, 0);
      setScore((prev) => prev + score);
      alert("doğru");
    }

    travel(squares, (square) => {
      if (square.isSelected) {
        square.isSelected = false;
      }
    });

    setChoosenText("");
  };

  return (
    <View style={styles.container}>
      <Score score={score} />
      <Grid data={squares} onPressItem={onPressItem} styles={styles} />
      <Controls styles={styles} choosenText={choosenText} onPressCancel={onPressCancel} onPressSubmit={onPressSubmit} />
    </View>
  );
};

export default App;
