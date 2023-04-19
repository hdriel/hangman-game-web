const UILogic = (function ({ CHARS = SELECTED_CHARS }) {
  let word;

  function init({ word: _word }) {
    console.debug("init UILogic");

    subscribeEvent(
      GLOBAL_EVENTS.GUESSED_LETTERS_UPDATED,
      _renderKeyboardStyleEventHandler
    );

    subscribeEvent(
      GLOBAL_EVENTS.GUESSED_LETTERS_UPDATED,
      _renderWordStyleEventHandler
    );

    subscribeEvent(GLOBAL_EVENTS.WORD_GENERATED, _wordGeneratedEventHandler);
    subscribeEvent(GLOBAL_EVENTS.RENDER_KEYBOARDS, _resetKeyboardHandler);

    subscribeEvent(GLOBAL_EVENTS.GAME_OVER, _renderWordStyleEventHandler);
    subscribeEvent(GLOBAL_EVENTS.GAME_OVER, _disableKeyboardButtonsHandler);
    subscribeEvent(GLOBAL_EVENTS.GAME_OVER, _renderGameOverAnnouncementHandler);

    subscribeEvent(GLOBAL_EVENTS.RESTART_GAME, _resetKeyboardButtonsHandler);
    subscribeEvent(
      GLOBAL_EVENTS.RESTART_GAME,
      _renderHangmanMistakePreviewHandler
    );
    subscribeEvent(
      GLOBAL_EVENTS.RESTART_GAME,
      _renderGameOverAnnouncementHandler
    );
  }

  function destroy() {
    console.debug("Destroyed UILogic");

    unsubscribeEvent(
      GLOBAL_EVENTS.GUESSED_LETTERS_UPDATED,
      _renderKeyboardStyleEventHandler
    );

    unsubscribeEvent(
      GLOBAL_EVENTS.GUESSED_LETTERS_UPDATED,
      _renderWordStyleEventHandler
    );

    unsubscribeEvent(GLOBAL_EVENTS.WORD_GENERATED, _wordGeneratedEventHandler);
    unsubscribeEvent(GLOBAL_EVENTS.RENDER_KEYBOARDS, _resetKeyboardHandler);

    unsubscribeEvent(GLOBAL_EVENTS.GAME_OVER, _renderWordStyleEventHandler);
    unsubscribeEvent(GLOBAL_EVENTS.GAME_OVER, _disableKeyboardButtonsHandler);
    unsubscribeEvent(
      GLOBAL_EVENTS.GAME_OVER,
      _renderGameOverAnnouncementHandler
    );

    unsubscribeEvent(GLOBAL_EVENTS.RESTART_GAME, _resetKeyboardButtonsHandler);
    unsubscribeEvent(
      GLOBAL_EVENTS.RESTART_GAME,
      _renderHangmanMistakePreviewHandler
    );
    unsubscribeEvent(
      GLOBAL_EVENTS.RESTART_GAME,
      _renderGameOverAnnouncementHandler
    );
  }

  function _wordGeneratedEventHandler({
    detail: { word: _word, subject, guessedLetters },
  }) {
    word = _word;
    renderWord(word, subject, guessedLetters);
  }

  function _renderWordStyleEventHandler({
    detail: { guessedLetters, isWin, isLose },
  }) {
    const isGameOver = isWin || isLose;
    word
      ?.split("")
      .map((char) => guessedLetters?.includes(char))
      .forEach((isExist, index) => {
        const element = $(`.random-word-char:nth-child(${index + 1})`);
        if (isExist) element.text(word[index]);
        else if (isGameOver && !element.text()) {
          element.text(word[index]);
          element.addClass("failed");
        }
      });
  }

  function _disableKeyboardButtonsHandler({ detail: { isWin, isLose } }) {
    CHARS.forEach((char) => {
      const element = $(`#${char}`);
      element.attr("disabled", true);
      element.addClass("disabled");
    });
  }

  function _resetKeyboardHandler({ detail }) {
    renderKeyboards({ word, guessedLetters: [] });
  }

  function _resetKeyboardButtonsHandler({ detail: refresh }) {
    if (refresh) {
      renderKeyboards({ word, guessedLetters: [] });
    } else {
      CHARS.forEach((char) => {
        const element = $(`#${char}`);
        element.attr("disabled", false);
        element.removeClass("disabled");
        element.removeClass("active");
        element.removeClass("inactive");
      });
    }
  }

  function _renderKeyboardStyleEventHandler({
    detail: { guessedLetters, isWin, isLose },
  }) {
    CHARS.filter((char) => guessedLetters.includes(char)).forEach((char) => {
      const isInTheWord = word?.includes(char);
      const isActive = isInTheWord;
      const isInactive = !isInTheWord;
      const disabled = true;

      const element = $(`#${char}`);
      element.attr("disabled", true);
      if (isActive) element.addClass("active");
      if (isInactive) element.addClass("inactive");
      if (disabled) element.addClass("disabled");
    });
  }

  function renderWord(word, subject, guessedLetters = [], gameOver = false) {
    const words = word.split(" ");
    const wordDom = ` 
          <p id="subject">נושא: ${subject}</p>     
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

  function renderKeyboards({ word, guessedLetters = [], gameOver = false }) {
    const wordDom = `
      <div class="keyboards">
          ${CHARS.map((char) => {
            const isGuessed = guessedLetters?.includes(char);
            const isInTheWord = word?.includes(char);
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
      $(`#${char}`).click(() =>
        triggerEvent(GLOBAL_EVENTS.KEYBOARD_PRESSED, char)
      );
    });
  }

  function _renderGameOverAnnouncementHandler({ detail: { isWin, isLose } }) {
    if (!isWin && !isLose) {
      $("#game-over-container").html("");
      return;
    }

    const gameOverDom = `
      <div class="game-over">
        <p>${isWin ? "ניצחת" : "הפסדת"}</p>        
      </div>
      `;

    $("#game-over-container").html(gameOverDom);
  }

  function _renderHangmanMistakePreviewHandler({ detail: refresh }) {
    _renderHangmanMistakePreview(10, 10);
  }

  function _renderHangmanMistakePreview(chances, maxChances) {
    const gameOverDom = `
      <img id="hangman-img" src="assets/hangman-${chances}-removebg-preview.png" alt="hangman-image"/>   
      ${
        chances && chances !== maxChances
          ? `<p>${"נשארו לך n נסיונות".replace("n", chances)}</p>`
          : ""
      }
    `;

    $("#hangman-mistakes").html(gameOverDom);
  }

  function renderHappyHangmanWinnerPreview() {
    const gameOverDom = `
      <img id="hangman-happy-img" src="assets/happy-hangman.png" alt="hangman-image"/>   
    `;

    $("#hangman-mistakes").html(gameOverDom);
  }

  return { init, destroy };
})({});
