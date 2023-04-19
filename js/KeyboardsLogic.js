const KeyboardsLogic = (function (chars, { UILogic, GameOverLogic }) {
  chars = chars.map((char) => char.toUpperCase());
  let isGameOverAlready = false;

  function init() {
    console.debug("init KeyboardLogic");
    subscribeEvent(GLOBAL_EVENTS.GAME_OVER, _updateGameOverStatusHandler);

    $(document).keypress((e) => {
      const char = e.originalEvent.key;
      const postChar = Object.keys(HEB_POST_CHARS).find(
        (c) => HEB_POST_CHARS[c] === char
      );
      if (chars.includes(char) || chars.includes(postChar)) {
        onClickKeyboard(postChar || char);
      }
      if (e.originalEvent.keyCode === 13 && isGameOverAlready) {
        triggerEvent(GLOBAL_EVENTS.RESTART_GAME, true);
      }
    });
  }

  function destroy() {
    console.debug("destroy KeyboardLogic");
    unsubscribeEvent(GLOBAL_EVENTS.GAME_OVER, _updateGameOverStatusHandler);
  }

  function _updateGameOverStatusHandler({ detail: { isLose, isWin } }) {
    isGameOverAlready = true;
  }

  function onClickKeyboard(char) {
    UILogic.renderHangmanMistakePreview(
      GameOverLogic.getTotalChances(),
      GameOverLogic.getMaxChances()
    );
  }

  return { init };
})(SELECTED_CHARS, { WordLogic, UILogic, GameOverLogic });
