function getParsedGuessedLetters() {
  return JSON.parse(localStorage.getItem("guessedLetters") || "[]");
}

const WordLogic = (function (words, subject) {
  function init(refresh) {
    console.debug("init WordLogic");

    const randomWord = getRandomWord(words).replace(/'-@#!%\^&*/gi, "");
    const word = refresh
      ? randomWord
      : localStorage.getItem("word") || randomWord;

    localStorage.setItem("word", word);
    localStorage.setItem(
      "guessedLetters",
      refresh ? "[]" : JSON.stringify(getParsedGuessedLetters())
    );
  }

  function getRandomWord(subject, randomIndex = undefined) {
    return (
      randomIndex !== undefined ? subject[randomIndex] : _.sample(subject)
    ).toUpperCase();
  }

  function addGuessLetter(char) {
    char = char.toUpperCase();
    const guessedLetters = getParsedGuessedLetters();
    if (!guessedLetters.includes(char)) {
      guessedLetters.push(char);
    }

    const postChar = HEB_POST_CHARS[char];
    if (postChar !== undefined && !guessedLetters.includes(postChar)) {
      guessedLetters.push(postChar);
    }

    localStorage.setItem("guessedLetters", JSON.stringify(guessedLetters));
  }

  return {
    init,
    getWord: () => localStorage.getItem("word"),
    getSubject: () => subject,
    getGuessedLetters: () => getParsedGuessedLetters(),
    getIncorrectGuessedLetters: () =>
      getParsedGuessedLetters()
        .filter((char) => !localStorage.getItem("word").includes(char))
        .filter((char) => !HEB_REVERSE_POST_CHARS[char]),
    addGuessLetter,
  };
})(SELECTED_SUBJECT, SUBJECT_NAME);
