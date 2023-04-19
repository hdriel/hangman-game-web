function triggerEvent(eventName, eventData) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: eventData }));
}

function subscribeEvent(eventName, cb) {
  window.addEventListener(eventName, cb); // cb = ({ detail: data }) => data);
}

function unsubscribeEvent(eventName, cb) {
  window.removeEventListener(eventName, cb);
}

const GLOBAL_EVENTS = {
  GUESSED_LETTERS_UPDATED: "GUESSED_LETTERS_UPDATED",
  WORD_GENERATED: "WORD_GENERATED",
  GAME_OVER: "GAME_OVER",
  RESTART_GAME: "RESTART_GAME",
  KEYBOARD_PRESSED: "KEYBOARD_PRESSED",
  RENDER_KEYBOARDS: "RENDER_KEYBOARDS",
};
