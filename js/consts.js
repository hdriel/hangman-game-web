const HEB_CHARS = "אבגדהוזחטיכלמנסעפצקרשת".split("");
const HEB_POST_CHARS = { מ: "ם", נ: "ן", צ: "ץ", פ: "ף", כ: "ך" };
const HEB_REVERSE_POST_CHARS = { ם: "מ", ן: "נ", ץ: "צ", ף: "פ", ך: "כ" };

const ENG_CHARS = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

const MAX_MISTAKES = 10; // MAX 10
const GAME_WORD_LANG = 'HEB'; // 'HEB' | 'ENG'
const WORD_LIST_INDEX = 1; // 0,1 (In:HEB) | 0 (In:ENG)

const SELECTED_CHARS = {
  HEB: HEB_CHARS,
  ENG: ENG_CHARS,
}[GAME_WORD_LANG];

const _SUBJECT_DATA_OPTIONS = {
  ENG: [ANIMALS_EN],
  HEB: [ANIMALS_HEB, EMOTIONAL_HEB],
};
const _DEFAULT_DATA = _SUBJECT_DATA_OPTIONS.ENG[0];
const SELECTED_SUBJECT = _SUBJECT_DATA_OPTIONS[GAME_WORD_LANG][WORD_LIST_INDEX] ?? _DEFAULT_DATA;


const _SUBJECT_NAME_OPTIONS = {
  ENG: ["Animal"],
  HEB: ["חיות", "רגשות"],
};
const _DEFAULT_NAME = _SUBJECT_NAME_OPTIONS.ENG[0];
const SUBJECT_NAME = _SUBJECT_NAME_OPTIONS[GAME_WORD_LANG][WORD_LIST_INDEX] ?? _DEFAULT_NAME;
