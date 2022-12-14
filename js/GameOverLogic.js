const GameOverLogic = (function ({ WordLogic, UILogic, maxMistakes = MAX_MISTAKES }) {
  function init() {
    console.debug("GameOverLogic init");
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
