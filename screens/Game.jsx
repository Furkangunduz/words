import React, { useState, useEffect } from "react";
import useInterval from "../hooks/useInterval";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Dimensions, Alert } from "react-native";
import { Toast } from "toastify-react-native";

import style from "../style";

import Square from "../utils/square";
import Wordlist from "../utils/wordList";
import wordScores from "../utils/wordScores";

import { travel, gameSpeedTable } from "../utils/utils";

import Grid from "../components/Grid";
import Controls from "../components/Controls";
import ScoreSection from "../components/ScoreSection";

const { height, width } = Dimensions.get("window");

const NUM_COLS = 8;
const NUM_ROWS = 10;
const ITEM_SIZE = 30;
const MAX_FALSE_GUESSES = 3;
const WORD_LIST = new Wordlist();
const WORDS_CORES = wordScores;
const SECOND = 1000;
const styles = style(ITEM_SIZE, width, height);
const BLOCK_DROP_SPEED = 0.75;

const App = ({ navigation, route }) => {
  const { userName } = route.params;
  console.log(userName);
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
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(5);

  const generateNewPiece = () => {
    let randomCol = Math.floor(Math.random() * NUM_COLS);
    let isIce = Math.random() * 10 < 1;

    const square = squares[0][randomCol];
    if (!square.letter) {
      square.setRandomLetter();
      square.isStopDroping = false;
      square.isMoved = true;
      if (isIce) {
        square.setIce();
      }
    }
    square.setRandomLetter();
    square.isStopDroping = false;
    square.isMoved = true;
  };

  const updateSquares = () => {
    let gameOver = false;

    for (let colIndex = 0; colIndex < NUM_COLS; colIndex++) {
      let isColumnFull = true;
      for (let rowIndex = 0; rowIndex < NUM_ROWS; rowIndex++) {
        const square = squares[rowIndex][colIndex];
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

    const newSquares = travel(squares, ({ square, rowIndex, colIndex }) => {
      if (rowIndex < NUM_ROWS - 1) {
        const bottomSquare = squares[rowIndex + 1][colIndex];
        const leftSquare = colIndex > 0 ? squares[rowIndex][colIndex - 1] : null;
        const rightSquare = colIndex < NUM_COLS - 1 ? squares[rowIndex][colIndex + 1] : null;

        if (!isGameOver) {
          if (square.isIce && !square.isIceEffected && bottomSquare.letter) {
            const onTopEdge = rowIndex === 0;
            const topSquare = onTopEdge ? null : squares[rowIndex - 1][colIndex];

            if (topSquare && topSquare.letter && !topSquare.isIceEffected) {
              topSquare.setIceEffected();
            }
            if (bottomSquare.letter && !bottomSquare.isIceEffected) {
              bottomSquare.setIceEffected();
            }
            if (leftSquare && leftSquare.letter && !leftSquare.isIceEffected) {
              leftSquare.setIceEffected();
            }
            if (rightSquare && rightSquare.letter && !rightSquare.isIceEffected) {
              rightSquare.setIceEffected();
            }
          }
          if (!bottomSquare.letter && !square.isMoved) {
            bottomSquare.setSquare(square);
            bottomSquare.isMoved = true;
            square.setSquare(new Square());
            square.isMoved = false;
          }
        }
      }
    });

    const clearIsMovedSquares = travel(newSquares, ({ square }) => {
      square.isMoved = false;
    });

    setSquares(clearIsMovedSquares);
  };

  const onPressItem = (item) => {
    if (!item.isSelected && choosenText.length < NUM_COLS) {
      setChoosenText((prev) => {
        if (prev && prev?.length >= NUM_COLS) return prev;

        item.isSelected = true;
        return prev + item.letter;
      });
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

          Toast.error(`3 defa yanlış deneme yaptınız. 1 satır aşşağı düşüyor.`, "top");
          return 0;
        } else {
          Toast.error(`Yanlış deneme Yaptınız : ${prev + 1}`, "top");

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

        Toast.success(`+${score} puan`, "top");
        return newScore;
      });
      travel(squares, ({ square }) => {
        if (square.isSelected && chooosenTextArray.includes(square.letter)) {
          square.life -= 1;
          square.isSelected = false;

          if (square.isIce) {
            square.isIce = false;
            square.life = 1;
          }
          if (square.life <= 0) {
            square.setSquare(new Square());
          }
        }
      });
    }

    setChoosenText("");
  };

  const dropRowOfSquares = () => {
    for (let colIndex = 0; colIndex < NUM_COLS; colIndex++) {
      squares[0][colIndex].setSquare(new Square());
      squares[0][colIndex].setRandomLetter();
    }
  };

  const restartGame = () => {
    setSquares(() =>
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
    setIsGameOver(false);
    setIsGamePaused(false);
    setChoosenText("");
    setScore(0);
    setGameSpeed(5);
  };

  useEffect(() => {
    if (isGameOver) {
      const currentDate = new Date();
      const currentDateTimeString = currentDate.toLocaleString();

      AsyncStorage.getItem("scores")
        .then((scores) => {
          if (!scores) {
            const newScoresArray = [{ score, date: currentDateTimeString }];
            AsyncStorage.setItem("scores", JSON.stringify(newScoresArray)).catch((error) => {
              console.log(error);
              Alert.alert("Error", "Failed to save scores");
            });
          } else {
            const scoresArray = JSON.parse(scores);
            scoresArray.push({ score, date: currentDateTimeString });
            AsyncStorage.setItem("scores", JSON.stringify(scoresArray)).catch((error) => {
              console.log(error);
              Alert.alert("Error", "Failed to save scores");
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", "Failed to save scores");
        });

      navigation.navigate("End", { score, userName, restartGame });
    }
  }, [isGameOver]);

  useEffect(() => {
    if (isGamePaused) {
      Toast.info("Oyun duraklatıldı", "top");
    }
  }, [isGamePaused]);

  useInterval(() => {
    if (isGameOver) return;
    if (isGamePaused) return;
    generateNewPiece();
  }, gameSpeed * SECOND);

  useInterval(() => {
    if (isGameOver) return;
    if (isGamePaused) return;
    updateSquares();
  }, BLOCK_DROP_SPEED * SECOND);

  useEffect(() => {
    if (isGameOver) return;
    if (isGamePaused) return;

    generateNewPiece();
  }, []);

  return (
    <View style={[styles.container]}>
      {isGamePaused && <View style={styles.overlayScreen}></View>}
      <ScoreSection
        score={score}
        styles={styles}
        isGamePaused={isGamePaused}
        setIsGamePaused={setIsGamePaused}
        falseGuessInRowCount={falseGuessInRowCount}
      />
      <Grid data={squares} onPressItem={onPressItem} styles={styles} isGameOver={isGameOver} isGamePaused={isGamePaused} />
      <Controls
        styles={styles}
        choosenText={choosenText}
        onPressCancel={onPressCancel}
        onPressSubmit={onPressSubmit}
        isGameOver={isGameOver}
        isGamePaused={isGamePaused}
      />
    </View>
  );
};

export default App;
