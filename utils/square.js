import { isBgLight } from "./utils";
class Square {
  static TurkishVowels = ["a", "e", "ı", "i", "o", "ö", "u", "ü"];
  static TurkishConsonants = ["b", "c", "ç", "d", "f", "g", "ğ", "h", "j", "k", "l", "m", "n", "p", "r", "s", "ş", "t", "v", "y", "z"];
  static percent_40_1 = ["a", "e", "ı", "n", "r", "s", "t"];
  static percent_20 = ["o", "ö", "u", "ü"];
  static percent_40_2 = ["b", "c", "ç", "d", "f", "g", "ğ", "h", "i", "j", "k", "l", "m", "p", "r", "s", "ş", "t", "v", "y", "z"];

  constructor() {
    this.letter = null;
    this.isVowel = null;
    this.isSelected = false;
    this.isMoved = false;
    this.isStopDroping = true;
    this.color = null;
    this.id = Date.now() + "_" + Math.random() * 10000000;
    this.setRandomColor();
  }

  setSquare(square) {
    this.letter = square.letter;
    this.isVowel = square.isVowel;
    this.isSelected = square.isSelected;
    this.isMoved = square.isMoved;
    this.isStopDroping = square.isStopDroping;
    this.id = square.id;
    this.color = square.color;
  }

  setRandomLetter() {
    const random_1 = Math.random();

    if (random_1 < 0.2) {
      this.letter = Square.percent_20[Math.floor(Math.random() * Square.percent_20.length)];
    } else {
      const random_2 = Math.random();
      if (random_2 < 0.5) {
        this.letter = Square.percent_40_1[Math.floor(Math.random() * Square.percent_40_1.length)];
      } else {
        this.letter = Square.percent_40_2[Math.floor(Math.random() * Square.percent_40_2.length)];
      }
    }

    if (Square.TurkishVowels.includes(this.letter)) {
      this.isVowel = true;
    } else {
      this.isVowel = false;
    }
  }

  setRandomColor() {
    let color = "#000000";
    while (color === "#000000" || color === "#FFFFFF" || color === "#000" || color === "#FFF" || color === "#ffffff" || isBgLight(color)) {
      color =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
    }
    this.color = color;
  }
}

export default Square;
