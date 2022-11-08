const GameOverLogic = (function ({ WordLogic }) {
  let maxMistakes = 5;

  return {
    isGameOver() {
      const word = WordLogic.getWord();
      const guessedLetters = WordLogic.getGuessedLetters();
      const incorrectGuessedLetters = WordLogic.getIncorrectGuessedLetters();

      const isWin = word
        .split("")
        .every((char) => guessedLetters.includes(char));

      const isLose = incorrectGuessedLetters.length >= maxMistakes;

      return {
        status: isWin || isLose,
        isWin,
        isLose,
      };
    },
  };
})({ WordLogic });
