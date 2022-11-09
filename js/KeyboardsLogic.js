const KeyboardsLogic = (function (
  chars,
  { WordLogic, UILogic, GameOverLogic }
) {
  chars = chars.map((char) => char.toUpperCase());

  function init() {
    console.debug("init KeyboardLogic");

    $(document).keypress((e) => {
      const char = e.originalEvent.key;
      const postChar = Object.keys(HEB_POST_CHARS).find(
        (c) => HEB_POST_CHARS[c] === char
      );
      if (chars.includes(char) || chars.includes(postChar)) {
        onClickKeyboard(postChar || char);
      }
      if (
        e.originalEvent.charCode === 13 &&
        GameOverLogic.isGameOver().status
      ) {
        GameOverLogic.restartGame();
      }
    });
  }

  function onClickKeyboard(char) {
    WordLogic.addGuessLetter(char);
    const word = WordLogic.getWord();
    const guessedLetters = WordLogic.getGuessedLetters();
    const { status: gameOver, isWin: isWinner } = GameOverLogic.isGameOver();

    UILogic.renderWord(word, WordLogic.getSubject(), guessedLetters, gameOver);
    UILogic.renderKeyboards({
      onClick: onClickKeyboard,
      guessedLetters: WordLogic.getGuessedLetters(),
      word: WordLogic.getWord(),
      gameOver,
    });

    UILogic.renderHangmanMistakePreview(
      GameOverLogic.getTotalChances(),
      GameOverLogic.getMaxChances()
    );

    if (gameOver) {
      UILogic.renderGameOverAnnouncement(isWinner);
      isWinner && UILogic.renderHappyHangmanWinnerPreview();
    }
  }

  return {
    init,
    onClickKeyboard,
  };
})(SELECTED_CHARS, { WordLogic, UILogic, GameOverLogic });
