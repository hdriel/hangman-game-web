// todo: remove the randomIndex params
const WordLogic = (function (words, randomIndex = undefined) {
  let guessedLetters;
  let word;

  function init() {
    console.log("init WordLogic");

    word = getRandomWord(words, randomIndex);
    guessedLetters = [];
    console.log("random word", word);
  }

  function getRandomWord(subject, randomIndex = undefined) {
    return randomIndex !== undefined ? subject[randomIndex] : _.sample(subject);
  }

  function addGuessLetter(char) {
    if (!guessedLetters.includes(char)) {
      guessedLetters.push(char);
    }

    const postChar = HEB_POST_CHARS[char];
    if (postChar !== undefined && !guessedLetters.includes(postChar)) {
      guessedLetters.push(postChar);
    }
  }

  return {
    init,
    getWord: () => word,
    getGuessedLetters: () => guessedLetters,
    getIncorrectGuessedLetters: () =>
      guessedLetters
        .filter((char) => !word.includes(char))
        .filter((char) => !HEB_REVERSE_POST_CHARS[char]),
    addGuessLetter,
  };
})(ANIMAL_HEB);
