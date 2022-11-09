const Controller = (function ({
  WordLogic,
  UILogic,
  KeyboardsLogic,
  GameOverLogic,
}) {
  function init() {
    console.debug("init Controller");

    UILogic.init();
    KeyboardsLogic.init();
    GameOverLogic.init();

    let gameOver = GameOverLogic.isGameOver().status;
    WordLogic.init(gameOver);
    gameOver = GameOverLogic.isGameOver().status;

    const guessedLetters = WordLogic.getGuessedLetters();
    const word = WordLogic.getWord();

    UILogic.renderWord(word, guessedLetters);
    UILogic.renderKeyboards({
      onClick: KeyboardsLogic.onClickKeyboard,
      guessedLetters: guessedLetters,
      word: word,
      gameOver,
    });

    const chances = GameOverLogic.getTotalChances();
    UILogic.renderHangmanMistakePreview(chances);
  }

  return { init };
})({ WordLogic, UILogic, KeyboardsLogic, GameOverLogic });

Controller.init();
