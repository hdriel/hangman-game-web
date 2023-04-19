const GameOverLogic = (function ({ maxMistakes = MAX_MISTAKES }) {
  let word;

  function init() {
    console.debug("GameOverLogic init");

    subscribeEvent(
      GLOBAL_EVENTS.GUESSED_LETTERS_UPDATED,
      _checkForGameOverEventHandler
    );

    subscribeEvent(GLOBAL_EVENTS.WORD_GENERATED, _wordGeneratedEventHandler);
    subscribeEvent(GLOBAL_EVENTS.RESTART_GAME, _restartGameHandler);
  }

  function destroy() {
    console.debug("GameOverLogic destroy");

    unsubscribeEvent(
      GLOBAL_EVENTS.GUESSED_LETTERS_UPDATED,
      _checkForGameOverEventHandler
    );

    unsubscribeEvent(GLOBAL_EVENTS.WORD_GENERATED, _wordGeneratedEventHandler);
    unsubscribeEvent(GLOBAL_EVENTS.RESTART_GAME, _restartGameHandler);
  }

  function _wordGeneratedEventHandler({ detail: { word: _word } }) {
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

  function _restartGameHandler() {
    triggerEvent(GLOBAL_EVENTS.UPDATE_CHANCES, {
      chances: 0,
      maxChances: maxMistakes,
    });
  }

  return {
    init,
    destroy,
  };
})({});
