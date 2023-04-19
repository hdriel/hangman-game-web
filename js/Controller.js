const Controller = (function ({
  WordLogic,
  UILogic,
  KeyboardsLogic,
  GameOverLogic,
}) {
  function init() {
    console.debug("init Controller");

    WordLogic.init();
    UILogic.init();
    KeyboardsLogic.init();
    GameOverLogic.init();

    triggerEvent(GLOBAL_EVENTS.RESTART_GAME, false);
    triggerEvent(GLOBAL_EVENTS.RENDER_KEYBOARDS);
    triggerEvent(
      GLOBAL_EVENTS.UPDATE_MAX_MISTAKES,
      GameOverLogic.getMaxMistakes()
    );

    WordLogic.initRandomWord(false);
  }

  function destroy() {
    WordLogic.destroy();
    UILogic.destroy();
    KeyboardsLogic.destroy();
    GameOverLogic.destroy();
  }

  return { init, destroy };
})({ WordLogic, UILogic, KeyboardsLogic, GameOverLogic });

Controller.init();
