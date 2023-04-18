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
};
