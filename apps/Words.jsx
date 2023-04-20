import React, { useState, useEffect } from "react";
import useInterval from "../hooks/useInterval";
import { View } from "react-native";
import { Dimensions } from "react-native";

import style from "../style";

import Square from "../utils/square";
import Wordlist from "../utils/wordList";
import wordScores from "../utils/wordScores";

import { travel, gameSpeedTable } from "../utils/utils";

import Grid from "../components/Grid";
import Controls from "../components/Controls";
import Score from "../components/Score";

const { height, width } = Dimensions.get("window");

const NUM_COLS = 8;
const NUM_ROWS = 10;
const ITEM_SIZE = 30;
const MAX_FALSE_GUESSES = 3;
const WORD_LIST = new Wordlist();
const WORDS_CORES = wordScores;
const SECOND = 1000;
const BLOCK_DROP_SPEED = 1.25;
const styles = style(ITEM_SIZE, width, height);

const App = () => {
  const [squares, setSquares] = useState(() =>
    new Array(NUM_ROWS).fill().map((row, rowIndex) =>
      new Array(NUM_COLS).fill().map((item, colIndex) => {
        if (rowIndex >= NUM_ROWS - 3) {
          const square = new Square();
          square.setRandomLetter();
          return square;
        } else {
          return new Square();
        }
      })
    )
  );
  const [choosenText, setChoosenText] = useState("");
  const [falseGuessInRowCount, setFalseGuessInRowCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(5);

  const generateNewPiece = () => {
    let randomCol = Math.floor(Math.random() * NUM_COLS);

    const square = squares[0][randomCol];
    if (!square.letter) {
      square.setRandomLetter();
      square.isStopDroping = false;
    }
  };

  const updateSquares = () => {
    const clearIsMovedSquares = travel(squares, ({ square }) => {
      square.isMoved = false;
    });

    let gameOver = false;
    for (let colIndex = 0; colIndex < NUM_COLS; colIndex++) {
      let isColumnFull = true;
      for (let rowIndex = 0; rowIndex < NUM_ROWS; rowIndex++) {
        const square = clearIsMovedSquares[rowIndex][colIndex];
        if (!square.letter) {
          isColumnFull = false;
          break;
        }
      }
      if (isColumnFull) {
        gameOver = true;
        setIsGameOver(gameOver);
        break;
      }
    }

    const newSquares = travel(clearIsMovedSquares, ({ square, rowIndex, colIndex }) => {
      if (rowIndex < NUM_ROWS - 1) {
        const bottomSquare = clearIsMovedSquares[rowIndex + 1][colIndex];

        if (!isGameOver) {
          if (!bottomSquare.letter && !square.isMoved) {
            bottomSquare.setSquare(square);
            bottomSquare.isMoved = true;
            square?.setSquare(new Square());
            square.isMoved = false;
          }
        }
      }
    });

    setSquares(newSquares);
  };

  const onPressItem = (item) => {
    if (!item.isSelected && choosenText.length < NUM_COLS) {
      setChoosenText((prev) => {
        if (prev && prev?.length >= NUM_COLS) return prev;
        return prev + item.letter;
      });
      item.isSelected = true;
    }
  };

  const onPressCancel = () => {
    const letterToRemove = choosenText.split("").pop();

    const newSquares = travel(squares, ({ square }) => {
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
    const doesWordTrue = WORD_LIST.doesHaveWord(choosenText);

    if (!doesWordTrue) {
      setFalseGuessInRowCount((prev) => {
        if (prev + 1 >= MAX_FALSE_GUESSES) {
          dropRowOfSquares();
          return 0;
        } else {
          return prev + 1;
        }
      });
      travel(squares, ({ square }) => {
        if (square.isSelected) {
          square.isSelected = false;
        }
      });
    } else {
      setFalseGuessInRowCount(0);
      const chooosenTextArray = choosenText.split("");
      const score = chooosenTextArray.reduce((acc, letter) => acc + WORDS_CORES[letter] ?? 0, 0);
      setScore((prev) => {
        const newScore = prev + score;

        for (let i = 0; i <= Object.keys(gameSpeedTable).length; i++) {
          const key = Object.keys(gameSpeedTable)[i];
          if (!key) break;
          const [low, high] = key.split("-");
          if (newScore >= low && newScore <= high) {
            setGameSpeed(gameSpeedTable[key]);
          }
        }

        return newScore;
      });
      travel(squares, ({ square }) => {
        if (square.isSelected && chooosenTextArray.includes(square.letter)) {
          square.setSquare(new Square());
        }
      });
    }

    setChoosenText("");
  };

  const dropRowOfSquares = () => {
    for (let colIndex = 0; colIndex < NUM_ROWS; colIndex++) {
      squares[0][colIndex].setSquare(new Square());
      squares[0][colIndex].setRandomLetter();
    }
  };

  useEffect(() => {
    if (isGameOver) {
      alert("oyun bitti");
    }
  }, [isGameOver]);

  useInterval(() => {
    generateNewPiece();
  }, gameSpeed * SECOND);

  useInterval(() => {
    updateSquares();
  }, BLOCK_DROP_SPEED * SECOND);

  return (
    <View style={styles.container}>
      <Score score={score} />
      <Grid data={squares} onPressItem={onPressItem} styles={styles} isGameOver={isGameOver} />
      <Controls
        styles={styles}
        choosenText={choosenText}
        onPressCancel={onPressCancel}
        onPressSubmit={onPressSubmit}
        isGameOver={isGameOver}
      />
    </View>
  );
};

export default App;
