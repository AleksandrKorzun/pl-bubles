import { EVENTS_DEFAULT } from "@holywater-tech/ads-builder/framework/components/EventsDispatcher";
import Screen from "../Screen";

export const EVENTS = {
  ...EVENTS_DEFAULT,
  ON_SUBMIT_CLICK: "onSubmitClick",
  ON_SHUFFLE_CLICK: "onShuffleClick",
  ON_DESELECT_CLICK: "onDeselectClick",
  ON_BUTTON_CLICK_START: "onButtonClickStart",
  HAPPY: "happy",
  SHOW_DRESS_ITEM: "setItems",
  SHOW_NEXT_ITEM: "onChangeScene",
  REMOVE_ITEM: "removeItem",
  CHANGE_SCENE: "onChangeScene",
  CHANGE_HAIR: "onChangeHair" /* your custom events */,
};

export const BUBBLES = ["bubble10", "bubble11", "bubble12", "bubble13"];
export const LAYERS_DEPTH = {
  TITLE: 5,
  ITEM_GLOW: 35,
  ITEM_BASE: 34,
  ITEM: 30,
  MISTAKES: 33,
  TIMER: 35,
  HAND_TUTORIAL: 44,
};

export const POSITION = {
  title: Screen.phoneProportions ? [-300, 200, 0, 130] : [-300, 180, 0, 100],
  balance: Screen.phoneProportions ? [300, 200, 0, 400] : [300, 180, 0, 300],
  title_win: Screen.phoneProportions ? [250, 120, 0, 300] : [250, 120, 0, 240],
  cards: Screen.phoneProportions ? [0, 150, 0, 200] : [0, 150, 0, 140],
  card: Screen.phoneProportions ? [0, -140, 0, -140] : [0, -140, 0, -90],
};
export const SCALE = {
  title: Screen.phoneProportions
    ? [0.65, 0.65, 0.65, 0.65]
    : [0.55, 0.55, 0.45, 0.45],
  balance: Screen.phoneProportions ? [1, 1, 1, 1] : [0.8, 0.8, 0.8, 0.8],
  title_win: Screen.phoneProportions ? [1.3, 1.3, 1.3, 1.3] : [1.3, 1.3, 1, 1],
  cards: Screen.phoneProportions
    ? [0.4, 0.4, 0.5, 0.5]
    : [0.33, 0.33, 0.33, 0.33],
  card: Screen.phoneProportions ? [1.4, 1.4, 1.4, 1.4] : [1, 1, 1, 1],
};

export const Balls = [
  "bingo_ball_B",
  "bingo_ball_B",
  "bingo_ball_B",
  "bingo_ball_B",
  "bingo_ball_B",
  "bingo_ball_B",
  "bingo_ball_B",
];
// 45    41    19 73    59
//    22    10       54

export const BALLS = [
  { num: 41, board: "board" },
  { num: 22, board: "board2" },
  { num: 37, board: "board" },
  { num: 10, board: "board2" },
  { num: 17, board: "board" },
  { num: 71, board: "board" },
  { num: 46, board: "board2" },
  { num: 54, board: "board" },
];
export const POSITIONS_BALLS = [
  { x: 0, y: 0, ball: "ball_b", number: 41, audio: "N41" },
  { x: 300, y: 0, ball: "ball_i", number: 22, audio: "I22" },
  { x: 100, y: 0, ball: "ball_n", number: 37, audio: "N37" },
  { x: 300, y: 0, ball: "ball_b", number: 10, audio: "B10" },
  { x: 300, y: 0, ball: "ball_i", number: 17, audio: "I17" },
  { x: 300, y: 0, ball: "ball_o", number: 71, audio: "O71" },
  { x: -200, y: 0, ball: "ball_g", number: 46, audio: "G46" },
  { x: 300, y: 0, ball: "ball_g", number: 54, audio: "G54" },
  // { x: 300, y: 0, ball: 'ball_i', number: 23, audio: 'I23' },
  // { x: -100, y: 0, ball: 'ball_o', number: 61, audio: 'O61' },
  // { x: 300, y: 0, ball: 'ball_b', number: 6, audio: 'B6' },
  // { x: 0, y: 0, ball: 'ball_i', number: 28, audio: 'I28' },
  // { x: 200, y: 0, ball: 'ball_o', number: 66, audio: 'O66' },
  // { x: 300, y: 0, ball: 'ball_n', number: 33, audio: 'N33' },
  // { x: 300, y: 0, ball: 'ball_g', number: 50, audio: 'G50' },
];

export const NUMBERS = {
  board: [
    { num: 3, x: -250, y: -220, choose: false },
    { num: 20, x: -130, y: -220, choose: false },
    { num: 11, x: 0, y: -220, choose: true },
    { num: 50, x: 130, y: -220, choose: false },
    { num: 71, x: 260, y: -220, choose: false },
    { num: 4, x: -250, y: -90, choose: false },
    { num: 29, x: -130, y: -90, choose: false },
    { num: 37, x: 0, y: -90, choose: false },
    { num: 44, x: 130, y: -90, choose: false },
    { num: 68, x: 260, y: -90, choose: false },
    { num: 18, x: -250, y: 40, choose: true },
    { num: 17, x: -130, y: 40, choose: false },
    { num: 12, x: 0, y: 40, choose: true },
    { num: 54, x: 130, y: 40, choose: false },
    { num: 39, x: 260, y: 40, choose: true },
    { num: 5, x: -250, y: 170, choose: false },
    { num: 78, x: -130, y: 170, choose: false },
    { num: 41, x: 0, y: 170, choose: false },
    { num: 43, x: 130, y: 170, choose: false },
    { num: 62, x: 260, y: 170, choose: false },
    { num: 49, x: -250, y: 300, choose: false },
    { num: 27, x: -130, y: 300, choose: false },
    { num: 13, x: 0, y: 300, choose: true },
    { num: 57, x: 130, y: 300, choose: false },
    { num: 61, x: 260, y: 300, choose: false },
  ],
  board2: [
    { num: 14, x: -250, y: -220, choose: true },
    { num: 87, x: -130, y: -220, choose: false },
    { num: 33, x: 0, y: -220, choose: false },
    { num: 51, x: 130, y: -220, choose: false },
    { num: 73, x: 260, y: -220, choose: false },
    { num: 24, x: -250, y: -90, choose: false },
    { num: 22, x: -130, y: -90, choose: false },
    { num: 82, x: 0, y: -90, choose: false },
    { num: 55, x: 130, y: -90, choose: false },
    { num: 66, x: 260, y: -90, choose: false },
    { num: 10, x: -250, y: 40, choose: false },
    { num: 19, x: -130, y: 40, choose: false },
    { num: 15, x: 0, y: 40, choose: true },
    { num: 59, x: 130, y: 40, choose: false },
    { num: 31, x: 260, y: 40, choose: false },
    { num: 6, x: -250, y: 170, choose: false },
    { num: 28, x: -130, y: 170, choose: false },
    { num: 45, x: 0, y: 170, choose: false },
    { num: 46, x: 130, y: 170, choose: false },
    { num: 72, x: 260, y: 170, choose: false },
    { num: 53, x: -250, y: 300, choose: false },
    { num: 23, x: -130, y: 300, choose: false },
    { num: 67, x: 0, y: 300, choose: false },
    { num: 47, x: 130, y: 300, choose: false },
    { num: 16, x: 260, y: 300, choose: true },
  ],
};
export const SHEETS = {
  ITEM_BASE: "btn",
  ITEM_GLOW: "btn_tap",
  HAND_TUTORIAL: "hand_tutorial",
};

export const POSITIONS_PHONE = {
  collect: Screen.phoneProportions ? [250, 80, 70, 0] : [250, 80, 70, 0],
  board: Screen.phoneProportions ? [300, 50, 70, -200] : [300, 50, 70, -180],
  board2: Screen.phoneProportions ? [-200, 50, 70, 300] : [-200, 50, 70, 200],
  button: Screen.phoneProportions ? [0, 320, 0, 540] : [0, 320, 0, 540],
};
export const POSITIONS = {
  collect:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.collect
      : [80, 50, 70, 0],
  board:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.board
      : [300, 50, 120, -200],
  board2:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.board2
      : [-200, 50, 120, 160],
  button:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.board2
      : [0, 280, 0, 340],
};

const SCALES_PHONE = {
  board: Screen.phoneProportions
    ? [0.7, 0.7, 0.6, 0.6]
    : [0.7, 0.7, 0.48, 0.48],
  board2: Screen.phoneProportions
    ? [0.7, 0.7, 0.6, 0.6]
    : [0.7, 0.7, 0.48, 0.48],
  collect: Screen.phoneProportions
    ? [0.6, 0.6, 0.6, 0.6]
    : [0.6, 0.6, 0.6, 0.6],
  timer: Screen.phoneProportions ? [1.6, 1.6, 1, 1] : [1.4, 1.4, 1, 1],
};

export const SCALES = {
  collect:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.collect
      : [0.55, 0.55, 0.5, 0.5],
  board:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.board
      : [0.65, 0.65, 0.43, 0.43],
  board2:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.board2
      : [0.65, 0.65, 0.43, 0.43],
  timer:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.timer
      : [0.9, 0.9, 0.7, 0.7],
  buttons: Screen.phoneProportions ? [0, 250, 0, 300] : [0, 250, 0, 350],
  title: Screen.phoneProportions
    ? [0.22, 0.22, 0.22, 0.22]
    : [0.22, 0.22, 0.22, 0.22],
  messageTitle: Screen.phoneProportions ? [0, 350, 0, -100] : [0, 350, 0, -30],
  level: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
};
export const version = window.App.version;
console.log("version", version);
// const BG =
