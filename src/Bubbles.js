// import { SHEETS } from './constants/assets';

import Utils from "@holywater-tech/ads-builder/framework/Utils";

import { POSITIONS, POSITIONS_BALLS, SCALES } from "./constants/Constants";
import Bubble from "./Bubble";

export default class Bubbles extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.addProperties(["pos", "scale"])
      .setCustomPosition(0, 300, 350, 240)
      .setCustomScale(1.6, 1.6, 1.4, 1.4)
      .setCustomAlign("Center")
      .setDepth(25)
      .setAngle(-20)
      .setAlpha(1);
    this.addBubblesBase();
    this.addBubbles();
    this.addTutorial();
  }

  addBubblesBase() {
    this.bubblesBase = this.scene.add
      .image(0, 0, "buble_base")
      .setDepth(4)
      .setAlpha(1)
      .setScale(1, 1);
    this.bubblesBase.setBlendMode(Phaser.BlendModes.SCREEN);
    this.add([this.bubblesBase]);
    this._sort();
  }
  addTutorial() {
    this.tutorial = this.scene.add
      .image(25, -190, "bg_hide")
      .setDepth(50)
      .setScale(0.8)
      .setAlpha(1);
    this.hand = this.scene.add
      .image(-160, -70, "atlas", "hand")
      .setDepth(100)
      .setScale(0.8);
    this.handAnim = this.scene.tweens.add({
      targets: [this.hand],
      x: "-=50",
      y: "-=50",
      scale: "*=0.83",
      duration: 500,
      repeat: -1,
      delay: 200,
      yoyo: true,
    });
    this.add([this.tutorial, this.hand]);
    this._sort();
  }
  addBubbles() {
    for (let col = 0; col < 13; col++) {
      for (let row = 0; row < 13; row++) {
        this[`bubbles${col}_${row}`] = new Bubble(this.scene, {
          x: -390 + 65 * col,
          y: -220 + 65 * row,
        }).setDepth(10);
        this.add([this[`bubbles${col}_${row}`]]);
      }
    }
    this._sort();
  }
  removeTutorial() {
    this.handAnim.stop();
    this.hand.destroy();
    this.tutorial.destroy();
  }
}
