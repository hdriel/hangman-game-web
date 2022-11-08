const UILogic = (function (CHARS) {
  let chars = CHARS;
  function init() {
    console.log("init UILogic");
  }

  function renderWord(word, guessedLetters = [], gameOver = false) {
    const wordDom = `
      <div class="random-word">
          ${word
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

            .join("")}       
      </div>`;

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
          ${chars
            .map((char) => {
              const isGuessed = guessedLetters.includes(char);
              const isInTheWord = word.includes(char);
              const isActive = isGuessed && isInTheWord;
              const isInactive = isGuessed && !isInTheWord;
              const disabled = isGuessed || gameOver;
              return `<button id="${char}" class="key ${
                isActive ? "active" : ""
              } ${isInactive ? "inactive" : ""} ${
                disabled ? "disabled" : ""
              }" ${disabled ? "disabled" : ""}>${char}</button>`;
            })
            .join("")}       
      </div>`;

    $("#keyboard-container").html(wordDom);

    chars.forEach((char) => {
      $(`#${char}`).click(() => onClick(char));
    });
  }

  return {
    init,
    renderWord,
    renderKeyboards,
  };
})(HEB_CHARS);
