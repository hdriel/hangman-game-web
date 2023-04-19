const Controller = (function ({
  WordLogic,
  UILogic,
  KeyboardsLogic,
  GameOverLogic,
}) {
  function init() {
    console.debug("init Controller");

    WordLogic.init();
    UILogic.init({});
    KeyboardsLogic.init();
    GameOverLogic.init();

    triggerEvent(GLOBAL_EVENTS.RESTART_GAME);
    triggerEvent(GLOBAL_EVENTS.RENDER_KEYBOARDS);

    WordLogic.initRandomWord(false);

    UILogic.renderHangmanMistakePreview(
      GameOverLogic.getTotalChances(),
      GameOverLogic.getMaxChances()
    );
  }

  return { init };
})({ WordLogic, UILogic, KeyboardsLogic, GameOverLogic });

Controller.init();
