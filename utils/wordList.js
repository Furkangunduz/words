import wordsJson from "../assets/wordlist/index.js";

class Wordlist {
  words = [];
  constructor() {
    this.words = wordsJson;
  }

  doesHaveWord(word) {
    if (!word || !this.words || !word.length > 0) return false;
    const wordFirstLetter = word.split("")[0].toLowerCase();
    const list = this.words[wordFirstLetter];
    if (!list) return false;
    return list.includes(word);
  }

  // binarySearch(target) {
  //   let left = 0;
  //   let right = list.length - 1;

  //   while (left <= right) {
  //     let mid = Math.floor((left + right) / 2);
  //     if (list[mid] === target) {
  //       return mid;
  //     } else if (list[mid] < target) {
  //       left = mid + 1;
  //     } else {
  //       right = mid - 1;
  //     }
  //   }
  //   return false;
  // }
}

export default Wordlist;
