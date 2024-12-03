import ParentScene from "@holywater-tech/ads-builder/framework/components/Scene";
import Background from "@holywater-tech/ads-builder/framework/components/ui/Background";
// import Utils from '@holywater-tech/ads-builder/framework/Utils';
import Utils from "@holywater-tech/ads-builder/framework/Utils";
import Collect from "./Bubbles";
// import { EVENTS } from './constants/Constants';
import Buttons from "./Buttons";
// import Timer from './timer';
import Board from "./Board";
import Title from "./Title";
import Progress from "./Progress";
import Bubbles from "./Bubbles";
import { POSITION, SCALE } from "./constants/Constants";
// import Popup from './Popup';

export default class Game extends ParentScene {
  create() {
    this.isActive = false;
    this.addBackground("bg");
    this.addTitleFirst();
    this.totalCoins = 0.0;
    this.addProgress();
    this.addBubbles();
    // this.winGame();
    Utils.addAudio(this, "music_trivia", 0.5, true);
  }

  initListeners() {
    this.emitter.on("win", this.onSubmitClick, this);
    // this.emitter.on(EVENTS.ON_SHUFFLE_CLICK, this.onShuffleClick, this);
    // this.emitter.on(EVENTS.ON_DESELECT_CLICK, this.onDeselectClick, this);
  }

  addBackground(bg) {
    this[bg] = new Background(this, bg, true, [1.5, 1.5, 1.1, 1.1]);

    this.mainContainer.add([this[bg]]);
    this.sort();
  }

  addTitleFirst() {
    this.title = this.add
      .image(0, 0, "title")
      .addProperties(["pos", "scale"])
      .setCustomPosition(...POSITION.title)
      .setCustomAlign("Top")
      .setDepth(100)
      .setCustomScale(...SCALE.title);
    // this.title_m = this.add
    //   .image(0, 0, "title_m")
    //   .addProperties(["pos", "scale"])
    //   .setCustomPosition(0, -20, 0, -20)
    //   .setCustomAlign("Bottom")
    //   .setDepth(100)
    //   .setCustomScale(1, 0.8, 0.6, 0.6);
    this.mainContainer.add([this.title]);
    this.sort();
  }
  addTitle() {
    this.title2 = new Title(this, "title");
    this.mainContainer.add([this.title2]);
    this.sort();
  }

  addBubbles() {
    this.bubbles = new Bubbles(this);
    this.mainContainer.add([this.bubbles]);
    this.sort();
  }

  addProgress() {
    this.progress = new Progress(this);
    this.mainContainer.add([this.progress]);
    this.sort();
  }

  winGame() {
    this.tweens.add({
      targets: [this.progress, this.bubbles, this.title],
      alpha: 0,
      duration: 300,
      delay: 500,
    });

    this.titlewin = this.add
      .image(0, 0, "title_win")
      .addProperties(["pos", "scale"])
      .setCustomPosition(...POSITION.title_win)
      .setCustomAlign("Top")
      .setDepth(100)
      .setAlpha(0)
      .setCustomScale(...SCALE.title_win);
    this.logo2 = this.add
      .image(0, 0, "atlas", "logo2")
      .addProperties(["pos", "scale"])
      .setCustomPosition(-250, 120, 0, 100)
      .setCustomAlign("Top")
      .setDepth(100)
      .setAlpha(0)
      .setCustomScale(...SCALE.title_win);
    this.cardB = this.add
      .image(0, 0, "card_b")
      .addProperties(["pos", "scale"])
      .setCustomPosition(...POSITION.card)
      .setCustomAlign("Center")
      .setDepth(98)
      .setAlpha(0)
      .setCustomScale(...SCALE.card);
    this.win = this.add
      .image(0, 0, "cards")
      .addProperties(["pos", "scale"])
      .setCustomPosition(...POSITION.cards)
      .setCustomAlign("Center")
      .setDepth(100)
      .setAlpha(0)
      .setCustomScale(...SCALE.cards);
    this.btn = this.add
      .image(0, 0, "atlas", "btn_play")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, -80, 0, -80)
      .setCustomAlign("Bottom")
      .setDepth(100)
      .setAlpha(0)
      .setCustomScale(0.8, 0.8, 1.2, 1.2);
    this.hand = this.add
      .image(0, 0, "atlas", "hand")
      .addProperties(["pos"])
      .setCustomPosition(230, -30, 230, -60)
      .setCustomAlign("Bottom")
      .setDepth(100)
      .setAlpha(0)
      .setScale(1);

    this.tweens.add({
      targets: [
        this.logo2,
        this.win,
        this.cardB,
        this.btn,
        this.hand,
        this.titlewin,
      ],
      alpha: 1,
      duration: 300,
      // repeat: -1,
      delay: 800,
    });
    this.tweens.add({
      targets: [this.btn],
      scale: "*=0.93",
      duration: 500,
      repeat: -1,
      delay: 200,
      yoyo: true,
    });
    this.tweens.add({
      targets: [this.hand],
      px: "-=50",
      py: "-=50",
      lx: "-=50",
      ly: "-=50",
      scale: "*=0.83",
      duration: 500,
      repeat: -1,
      delay: 200,
      yoyo: true,
    });
    this.mainContainer.add([
      this.logo2,
      this.win,
      this.cardB,
      this.btn,
      this.hand,
      this.titlewin,
    ]);
    this.sort();
    this.game.network.addClickToStore(this.btn);
  }

  addLogo(isScale = true) {
    this.logo = this.add
      .image(0, 0, "atlas", "logo")
      .addProperties(["pos"])
      .setCustomPosition(130, 130, 110, 110)
      .setCustomAlign("Top Left")
      .setDepth(100)
      .setScale(0.36);

    if (isScale) {
      this.tweens.add({
        targets: this.logo,
        scale: "*=1.1",
        duration: 500,
        repeat: -1,
        yoyo: true,
      });
    }
    this.logo.setInteractive().on("pointerdown", () => this.openStore(), this);
    this.mainContainer.add([this.logo]);
    this.sort();
  }

  addCtas() {
    this.cta1 = new Buttons(this, "cta", { lx: 0, ly: 0, px: 0, py: 0 }, () =>
      this.openStore()
    ).setScale(0.55);
    this.animcta = this.tweens.add({
      targets: this.cta1,
      scale: "*=1.1",
      duration: 500,
      repeat: -1,
      ease: "Ease.in",
      yoyo: true,
    });

    this.mainContainer.add([this.cta1]);
    this.sort();
  }

  openStore() {
    this.game.network.openStore();
  }
}
