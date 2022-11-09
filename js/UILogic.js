const UILogic = (function (CHARS) {
  function init() {
    console.debug("init UILogic");
  }

  function renderWord(word, guessedLetters = [], gameOver = false) {
    const words = word.split(" ");
    const wordDom = `      
          ${words
            .map((word) => {
              return word
                .split("")
                .map((char) => {
                  const hasGuessed = guessedLetters.includes(char);
                  const visibleChar = hasGuessed || gameOver ? char : "";
                  return `<span class="random-word-char ${
                    char === " " ? "space-char" : ""
                  } ${
                    gameOver && !hasGuessed ? "failed" : ""
                  }">${visibleChar}</span>`;
                })
                .join("");
            })
            .map(
              (wordElement) => ` <div class="random-word">${wordElement}</div>`
            )
            .join("")}   
      `;

    $("#word-container").html(wordDom);
  }

  function renderKeyboards({
    word,
    onClick,
    guessedLetters = [],
    gameOver = false,
  }) {
    const wordDom = `
      <div class="keyboards">
          ${CHARS.map((char) => {
            const isGuessed = guessedLetters.includes(char);
            const isInTheWord = word.includes(char);
            const isActive = isGuessed && isInTheWord;
            const isInactive = isGuessed && !isInTheWord;
            const disabled = isGuessed || gameOver;
            return `<button id="${char}" class="key ${
              isActive ? "active" : ""
            } ${isInactive ? "inactive" : ""} ${disabled ? "disabled" : ""}" ${
              disabled ? "disabled" : ""
            }>${char}</button>`;
          }).join("")}       
      </div>`;

    $("#keyboard-container").html(wordDom);

    CHARS.forEach((char) => {
      $(`#${char}`).click(() => onClick(char));
    });
  }

  function renderGameOverAnnouncement(isWinner) {
    if (isWinner === undefined) {
      $("#game-over-container").html("");
      return;
    }

    const gameOverDom = `
      <div class="game-over">
        <p>${isWinner ? "ניצחת" : "הפסדת"}</p>
        <!-- <p>נסה שנית, לחץ על מקש ה Enter</p> -->
      </div>
      `;

    $("#game-over-container").html(gameOverDom);
  }

  function renderHangmanMistakePreview(chances) {
    const gameOverDom = `
      <img id="hangman-img" src="assets/hangman-${chances}-removebg-preview.png" alt="hangman-image"/>   
      ${chances ? `<p>${"נשארו לך n נסיונות".replace("n", chances)}</p>` : ""}
    `;

    $("#hangman-mistakes").html(gameOverDom);
  }

  function renderHappyHangmanWinnerPreview() {
    const gameOverDom = `
      <img id="hangman-happy-img" src="assets/happy-hangman.png" alt="hangman-image"/>   
    `;

    $("#hangman-mistakes").html(gameOverDom);
  }
  return {
    init,
    renderWord,
    renderKeyboards,
    renderGameOverAnnouncement,
    renderHangmanMistakePreview,
    renderHappyHangmanWinnerPreview,
  };
})(SELECTED_CHARS);
