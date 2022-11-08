const KeyboardsLogic = (function (
  chars,
  { WordLogic, UILogic, GameOverLogic }
) {
  function init() {
    console.log("init KeyboardLogic");

    $("body").keypress((e) => {
      const char = e.originalEvent.key;
      const postChar = Object.keys(HEB_POST_CHARS).find(
        (c) => HEB_POST_CHARS[c] === char
      );
      if (chars.includes(char) || chars.includes(postChar))
        onClickKeyboard(postChar || char);
    });
  }

  function onClickKeyboard(char) {
    WordLogic.addGuessLetter(char);
    const word = WordLogic.getWord();
    const guessedLetters = WordLogic.getGuessedLetters();
    const gameOver = GameOverLogic.isGameOver().status;

    UILogic.renderWord(word, guessedLetters, gameOver);
    UILogic.renderKeyboards({
      onClick: onClickKeyboard,
      guessedLetters: WordLogic.getGuessedLetters(),
      word: WordLogic.getWord(),
      gameOver,
    });
  }

  return {
    init,
    onClickKeyboard,
  };
})(HEB_CHARS, { WordLogic, UILogic, GameOverLogic });
