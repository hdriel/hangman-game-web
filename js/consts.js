const HEB_CHARS = "אבגדהוזחטיכלמנסעפצקרשת".split("");
const HEB_POST_CHARS = { מ: "ם", נ: "ן", צ: "ץ", פ: "ף", כ: "ך" };
const HEB_REVERSE_POST_CHARS = { ם: "מ", ן: "נ", ץ: "צ", ף: "פ", ך: "כ" };

const ENG_CHARS = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

const SELECTED_CHARS = {
  HEB: HEB_CHARS,
  ENG: ENG_CHARS,
}["HEB"];

const SELECTED_SUBJECT = {
  ENG: [ANIMALS_EN],
  HEB: [ANIMALS_HEB, EMOTIONAL_HEB],
}["HEB"][0];

const SUBJECT_NAME = {
  ENG: ["Animal"],
  HEB: ["חיות", "רגשות"],
}["HEB"][0];
