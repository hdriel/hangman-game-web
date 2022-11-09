const GameOverLogic = (function ({ WordLogic, UILogic }) {
  let maxMistakes = 10;

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
    UILogic.renderWord(WordLogic.getWord());
    const chances = GameOverLogic.getTotalChances();
    UILogic.renderHangmanMistakePreview(chances);
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
    restartGame,
  };
})({ WordLogic, UILogic });
