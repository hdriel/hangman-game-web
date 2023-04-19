function getParsedGuessedLetters() {
  return JSON.parse(localStorage.getItem("guessedLetters") || "[]");
}

const WordLogic = (function (words, subject) {
  function init() {
    console.debug("init WordLogic");

    subscribeEvent(GLOBAL_EVENTS.RESTART_GAME, initRandomWord);
    subscribeEvent(GLOBAL_EVENTS.KEYBOARD_PRESSED, addGuessLetterHandler);
  }

  function destroy() {
    console.debug("init WordLogic");

    unsubscribeEvent(GLOBAL_EVENTS.RESTART_GAME, initRandomWord);
    unsubscribeEvent(GLOBAL_EVENTS.KEYBOARD_PRESSED, addGuessLetterHandler);
  }

  function initRandomWord({ detail: refresh }) {
    const randomWord = getRandomWord(words).replace(/'-@#!%\^&*/gi, "");
    const word = refresh
      ? randomWord
      : localStorage.getItem("word") || randomWord;

    localStorage.setItem("word", word);
    localStorage.setItem(
      "guessedLetters",
      refresh ? "[]" : JSON.stringify(getParsedGuessedLetters())
    );

    triggerEvent(GLOBAL_EVENTS.WORD_GENERATED, {
      word,
      guessedLetters: getParsedGuessedLetters(),
      subject,
    });

    triggerEvent(GLOBAL_EVENTS.GUESSED_LETTERS_UPDATED, {
      guessedLetters: getParsedGuessedLetters(),
      incorrectGuessedLetters: getIncorrectGuessedLetters(),
    });
  }

  function getRandomWord(subject, randomIndex = undefined) {
    return (
      randomIndex !== undefined ? subject[randomIndex] : _.sample(subject)
    ).toUpperCase();
  }

  function getIncorrectGuessedLetters() {
    return getParsedGuessedLetters()
      .filter((char) => !localStorage.getItem("word").includes(char))
      .filter((char) => !HEB_REVERSE_POST_CHARS[char]);
  }

  function addGuessLetterHandler({ detail: char }) {
    addGuessLetter(char);
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
    triggerEvent(GLOBAL_EVENTS.GUESSED_LETTERS_UPDATED, {
      guessedLetters,
      incorrectGuessedLetters: getIncorrectGuessedLetters(),
    });
  }

  return {
    init,
    destroy,
    initRandomWord,
  };
})(SELECTED_SUBJECT, SUBJECT_NAME);
