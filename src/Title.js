// import { SHEETS } from './constants/assets';

export default class Title extends Phaser.GameObjects.Container {
    constructor(scene, title) {
        super(scene, 0, 0);
        this.tweens = scene.tweens;
        this.addProperties(['pos', 'scale', 'align'])
            .setCustomPosition(0, 170, 0, 200)
            .setCustomScale(0.5, 0.5, 0.8, 0.8)
            .setCustomAlign('Top', 'Center')
            .setDepth(250)
            .setAlpha(1);
        this.isPortrait = this.scene.game.size.isPortrait;
        this.addTitle(title);
    }

    addTitle() {
        this.title = this.scene.add.image(0, 0, 'daub_title');
        this.title_text = this.scene.add.image(0, 0, 'daub_text');
        this.scene.tweens.add({
            targets: this.title_text,
            scale: '*=0.9',
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.in',
        });
        this.add([this.title, this.title_text]);
        this._sort();
    }

    show() {
        this.tweens.add({
            targets: this,
            alpha: 1,
            duration: 500,
            ease: 'Sine.out',
        });
        return this;
    }

    move() {
        this.tweens.add({
            targets: this,
            delay: 500,
            scale: '*=0.95',
            repeat: -1,
            yoyo: true,
            duration: 1500,
        });
    }

    remove() {
        this.tweens.add({
            targets: this,
            alpha: 0,
            duration: 300,
            ease: 'Sine.out',
        });
    }

    blink() {
        this.show();
        setTimeout(() => this.remove(), 2500);
    }

    scaleTitle() {
        this.tweens.add({
            targets: this,
            scaleX: 0.3,
            duration: 700,
            ease: 'Sine.out',
        });
    }
}
