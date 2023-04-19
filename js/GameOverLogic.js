const GameOverLogic = (function ({
  WordLogic,
  UILogic,
  maxMistakes = MAX_MISTAKES,
}) {
  let word;

  function init() {
    console.debug("GameOverLogic init");

    subscribeEvent(
      GLOBAL_EVENTS.GUESSED_LETTERS_UPDATED,
      _checkForGameOverEventHandler
    );

    subscribeEvent(GLOBAL_EVENTS.WORD_GENERATED, _wordGeneratedEventHandler);
  }

  function destroy() {
    console.debug("GameOverLogic destroy");

    unsubscribeEvent(
      GLOBAL_EVENTS.GUESSED_LETTERS_UPDATED,
      _checkForGameOverEventHandler
    );

    unsubscribeEvent(GLOBAL_EVENTS.WORD_GENERATED, _wordGeneratedEventHandler);
  }

  function _wordGeneratedEventHandler({ detail: _word }) {
    word = _word;
  }

  function _checkForGameOverEventHandler({
    detail: { guessedLetters, incorrectGuessedLetters },
  }) {
    const isLose = incorrectGuessedLetters.length >= maxMistakes;
    const isWin = word
      .split(" ")
      .join("")
      .split("")
      .every((char) => guessedLetters.includes(char));

    const isGameOver = isWin || isLose;

    if (isGameOver) triggerEvent(GLOBAL_EVENTS.GAME_OVER, { isWin, isLose });
  }

  function isGameOver() {
    const word = WordLogic.getWord();
    const guessedLetters = WordLogic.getGuessedLetters();
    const incorrectGuessedLetters = WordLogic.getIncorrectGuessedLetters();

    const isWin = word
      .split(" ")
      .join("")
      .split("")
      .every((char) => guessedLetters.includes(char));

    const isLose = incorrectGuessedLetters.length >= maxMistakes;

    return {
      status: isWin || isLose,
      isWin,
      isLose,
    };
  }

  function restartGame() {
    WordLogic.init(true);
    UILogic.renderWord(WordLogic.getWord(), WordLogic.getSubject());
    UILogic.renderHangmanMistakePreview(
      GameOverLogic.getTotalChances(),
      GameOverLogic.getMaxChances()
    );
    UILogic.renderKeyboards({
      onClick: KeyboardsLogic.onClickKeyboard,
      guessedLetters: WordLogic.getGuessedLetters(),
      word: WordLogic.getWord(),
      gameOver: GameOverLogic.isGameOver().status,
    });
    UILogic.renderGameOverAnnouncement();
  }

  return {
    init,
    isGameOver,
    getTotalChances: () => {
      const mistakes = WordLogic.getIncorrectGuessedLetters().length;
      return maxMistakes - mistakes;
    },
    getMaxChances: () => maxMistakes,
    restartGame,
  };
})({ WordLogic, UILogic });
