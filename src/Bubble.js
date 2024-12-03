import Utils from "@holywater-tech/ads-builder/framework/Utils";
import { BUBBLES } from "./constants/Constants";

export default class Bubble extends Phaser.GameObjects.Container {
  constructor(scene, options) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.options = options;

    this.addBubble();
  }

  addBubble() {
    // this.scene.crySound = Utils.addAudio(this.scene, "tap", 0.5, false);
    this.bubble = this.scene.add
      .sprite(
        this.options.x,
        this.options.y,
        "atlas",
        // "bubble1"
        BUBBLES[Math.floor(Math.random() * BUBBLES.length)]
      )
      .setDepth(145)
      .setAlpha(1)
      .setScale(0.7);
    this.bubble.setInteractive().once("pointerdown", this.handleClick, this);
    this.scene.anims.create({
      key: "cry",
      frames: this.scene.anims.generateFrameNames("atlas", {
        prefix: "bubble",
        start: 1,
        end: 4,
      }),
      frameRates: 4,

      //   repeat: -1,
      //   repeatDelay: 1000,
    });

    this.add([this.bubble]);
    this._sort();
    // this.animationCry = tear.play("cry");
  }

  handleClick() {
    Utils.addAudio(this.scene, "tap", 0.5, false);
    this.scene.bubbles.removeTutorial();
    this.bubble.setAlpha(0.5);
    this.animationCry = this.bubble.play("cry");
    this.scene.emitter.emit("changeCount");
  }
}
