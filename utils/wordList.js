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
}

export default Wordlist;
