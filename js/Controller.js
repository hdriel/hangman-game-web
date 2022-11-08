const Controller = (function ({
  WordLogic,
  UILogic,
  KeyboardsLogic,
  GameOverLogic,
}) {
  function init(subject) {
    console.log("init Controller");

    UILogic.init();
    KeyboardsLogic.init();
    WordLogic.init(subject);

    UILogic.renderWord(WordLogic.getWord());

    UILogic.renderKeyboards({
      onClick: KeyboardsLogic.onClickKeyboard,
      guessedLetters: WordLogic.getGuessedLetters(),
      word: WordLogic.getWord(),
      gameOver: GameOverLogic.isGameOver().status,
    });
    // UILogic.renderWord(WordLogic.getWord(), WordLogic.getGuessedLetters());
  }

  return {
    init,
  };
})({ WordLogic, UILogic, KeyboardsLogic, GameOverLogic });

Controller.init("animals");
