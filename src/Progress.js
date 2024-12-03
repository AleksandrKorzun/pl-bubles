import Utils from "@holywater-tech/ads-builder/framework/Utils";
import { POSITION, SCALE } from "./constants/Constants";

export default class Progress extends Phaser.GameObjects.Container {
  constructor(scene, option) {
    super(scene, 0, 0);
    this.option = option;
    this.initAssets();
    this.setDepth(45).setAlpha(1);
    this.addProgress();
    this.scene.emitter.on(
      "changeCount",
      () => this.changeCount((this.scene.totalCoins += 0.1)),
      this
    );
    // this.addArrow();
  }

  initAssets() {
    this.addProperties(["pos", "scale"])
      .setCustomPosition(...POSITION.balance)
      .setCustomAlign("Top")
      .setDepth(10)
      .setCustomScale(...SCALE.balance);
  }

  addProgress() {
    this.balance = this.scene.add
      .image(0, 0, "atlas", "balance_box")
      .setDepth(3)
      .setScale(1.2);
    this.balanceLogo = this.scene.add
      .image(-160, -45, "atlas", "balance_logo")
      .setDepth(4)
      .setScale(1.2);
    this.balanceTitle = this.scene.add
      .image(0, -75, "atlas", "progress_title")
      .setDepth(4)
      .setScale(0.45);
    this.progressBox = this.scene.add
      .image(0, 75, "atlas", "progress_box")
      .setDepth(4)
      .setScale(1.2);
    this.progressTextHide = this.scene.add
      .image(0, 75, "atlas", "redeem_hide")
      .setDepth(5)
      .setAlpha(1)
      .setScale(1.2);
    this.progressText = this.scene.add
      .image(0, 75, "atlas", "redeem")
      .setDepth(6)
      .setAlpha(0)
      .setScale(1.2);
    this.progressFill = this.scene.add
      .image(-210, 75, "atlas", "green")
      .setDepth(4)
      .setAlpha(1)
      .setOrigin(0, 0.5)
      .setScale(0, 1.2);
    this.coinText = this.scene.add
      .text(
        -90,
        -20,
        `$ ${this.scene.totalCoins}${this.scene.totalCoins ? 0 : ",00"}`,
        {
          font: `bold 70px balooRegular`,
          fill: "#095FA6",
          letterSpacing: 10,
          strokeThickness: 5,
        }
      )
      .setDepth(120)
      .setAlpha(1)
      .setOrigin(0, 0.5);
    this.add([
      this.balance,
      this.balanceLogo,
      this.balanceTitle,
      this.coinText,
      this.progressBox,
      this.progressTextHide,
      this.progressText,
      this.progressFill,
    ]);
    this._sort();
  }
  changeCount(x, duration = 400) {
    this.coinText.text = `$ ${this.scene.totalCoins.toFixed(1)}0`;

    this.changeProgress(x);
  }
  changeProgress(x) {
    const scale = this.progressFill.scaleX + 0.08;

    this.addArrow();
    if (this.scene.totalCoins >= 1.5) {
      this.scene.tweens.add({
        targets: [this.progressText],
        alpha: 1,
        duration: 500,
        ease: "Linear",
      });
      this.scene.tweens.add({
        targets: [this.progressTextHide],
        alpha: 0,
        duration: 300,
        ease: "Linear",
      });
      this.progressBox.setInteractive().once("pointerdown", () => {
        this.scene.winGame();
      });
      if (this.scene.totalCoins.toFixed(1) == 1.5) {
        this[`tween${x}`] = this.scene.tweens.add({
          targets: [this.progressFill],
          scaleX: "+=0.08",
          duration: 200,
          ease: "Linear",
          onComplete: () => this.progressFill.setScale(1.2, 1.2),
        });
      }
      return;
    }
    this[`tween${x}`] = this.scene.tweens.add({
      targets: [this.progressFill],
      scaleX: "+=0.08",
      duration: 150,
      ease: "Linear",
      onComplete: () => {
        this.progressFill.setScale(scale, 1.2);
      },
    });
  }
  addArrow() {
    this.arrow1 = this.scene.add
      .image(150, -20, "atlas", "errow")
      .setDepth(4)
      .setAlpha(0)
      .setScale(1.2);
    this.arrow2 = this.scene.add
      .image(150, -30, "atlas", "errow")
      .setDepth(4)
      .setAlpha(0)
      .setScale(1.2);
    this.arrow3 = this.scene.add
      .image(150, -40, "atlas", "errow")
      .setDepth(4)
      .setAlpha(0)
      .setScale(1.2);
    this.add([this.arrow1, this.arrow2, this.arrow3]);
    this._sort();
    this.scene.tweens.add({
      targets: this.arrow1,
      alpha: 1,
      duration: 300,
      yoyo: true,
    });
    this.scene.tweens.add({
      targets: this.arrow2,
      alpha: 1,
      duration: 300,
      delay: 150,
      yoyo: true,
    });
    this.scene.tweens.add({
      targets: this.arrow3,
      alpha: 1,
      duration: 300,
      delay: 300,
      yoyo: true,
    });
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
