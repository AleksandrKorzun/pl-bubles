import { BALLS, NUMBERS, POSITIONS, SCALES } from './constants/Constants';

export default class Board extends Phaser.GameObjects.Container {
    constructor(scene, board) {
        super(scene, 0, 0);
        this.name = board;
        this.tweens = scene.tweens;
        this.isPortrait = this.scene.game.size.isPortrait;
        this.addBoard(board);
        this.addNumber(board);
        this.addProperties(['pos', 'scale', 'align'])
            .setCustomPosition(...POSITIONS[board])
            .setCustomScale(...SCALES[board])
            .setCustomAlign('Center')
            .setDepth(25)
            .setAlpha(1);
        this.scene.scale.on('resize', () => this.onResize());
    }

    addBoard(board) {
        this[board] = this.scene.add.image(0, 0, 'board').setDepth(5);
        this.blur = this.scene.add.image(0, 0, 'board_blur').setDepth(46);
        this.add([this[board], this.blur]);
        this._sort();
    }

    onResize() {
        // console.log('1', 1);
        // this.addProperties(['pos', 'scale', 'align'])
        //     .setCustomPosition(...POSITIONS[this.name])
        //     .setCustomScale(...SCALES[this.name])
        //     .setCustomAlign('Center')
        //     .setDepth(25)
        //     .setAlpha(1);
    }

    addNumber(board) {
        NUMBERS[board].forEach(({ num, x, y, choose }, idx) => {
            this[`number_${num}`] = this.scene.add
                .text(x, y, num, { font: 'normal 140px BerlinSansFBDemiBold', fill: '#302d2d' })
                .setScale(0.7)
                .setOrigin(0.5)
                .setSize(150, 150)
                .setDepth(6 + idx);
            const itemGlowX = x === -250 ? -259 : x;
            this[`number_${num}_glow`] = this.scene.add
                .image(itemGlowX, y, 'atlas', 'item_glow')
                .setDepth(35)
                .setScale(1)
                .setAlpha(choose ? 1 : 0)
                .setOrigin(0.5);
            this[`number_${num}_red`] = this.scene.add
                .image(itemGlowX, y, 'atlas', 'item_red')
                .setDepth(35)
                .setScale(1.7)
                .setAlpha(0)
                .setOrigin(0.5);
            this[`number_${num}_glow_daub`] = this.scene.add
                .image(itemGlowX, y, 'atlas', 'daub_red')
                .setDepth(37)
                .setScale(1.5)
                .setAlpha(choose ? 1 : 0)
                .setOrigin(0.5);

            this.add([
                this[`number_${num}`],
                this[`number_${num}_glow`],
                // this[`number_${num}_bingo`],
                this[`number_${num}_glow_daub`],
                this[`number_${num}_red`],
                // this[`number_${num}_bingo_star`],
            ]);

            this._sort();
        });
    }

    addInterActive() {
        NUMBERS[this.name].forEach(({ num }) => {
            if (num) {
                this[`number_${num}`].setInteractive().on('pointerdown', () => this.onClickItem(num), this);
            }
        });

        return this;
    }

    disableInterActive() {
        NUMBERS[this.name].forEach(({ num }) => {
            if (num) {
                this[`number_${num}`].disableInteractive();
            }
        });

        return this;
    }

    wrong(num) {
        this.scene.tweens.add({
            targets: this[`number_${num}_red`],
            alpha: 1,
            duration: 300,
            yoyo: true,
            repeat: 1,
            onComplete: () => this[`number_${num}_red`].setAlpha(0),
        });
    }

    addStar(correctNum, board) {
        const correct = NUMBERS[board].find(({ num }) => num === correctNum);
        const itemGlowX = correct.x === -250 ? -259 : correct.x;
        this[`glow_${correctNum}`] = this.scene.add
            .image(itemGlowX, correct.y, 'atlas', 'item_glow')
            .setDepth(37)
            .setScale(1)
            .setAlpha(1)
            .setOrigin(0.5);
        this[`number_${correctNum}_glow_daub`] = this.scene.add
            .image(itemGlowX, correct.y - 60, 'atlas', 'daub_red')
            .setDepth(38)
            .setScale(2.5)
            .setAlpha(0)
            .setOrigin(0.5);

        this.scene.tweens.add({
            targets: this[`number_${correctNum}_glow_daub`],
            scale: 1.5,
            y: '+=60',
            alpha: 1,
            duration: 300,
        });

        setTimeout(() => {
            this.addSmallStars(correct.x, correct.y);
        }, 500);
        this[`number_${correctNum}`].disableInteractive();
        this.add([this[`glow_${correctNum}`], this[`number_${correctNum}_glow_daub`]]);
        this._sort();
    }

    onClickItem(num) {
        if (this.scene.correct_balls === num) {
            this.scene.isActive = true;
            this.removeHand();
            this.addStar(this.scene.correct_balls, this.name);
            setTimeout(() => {
                // this.scene.collect.addBall(this.scene.collect.length - 1);
                this.removeHand();
            }, 1500);
            setTimeout(() => {
                if (num !== 37 && num !== 46 && num !== 54) {
                    this.scene.collect.addBall(this.scene.collect.length - 1);
                    this.removeHand();
                }
            }, 3000);
            setTimeout(() => {
                if (num === 37 || num === 46 || num === 54) {
                    this.scene.collect.addBall(this.scene.collect.length - 1);
                    this.removeHand();
                }
            }, 6000);
            // setTimeout(() => {
            //     this.scene.isActive = false;
            // }, 6990);
            setTimeout(() => {
                const currBall = BALLS.find((ball) => ball.num === this.scene.correct_balls);
                this.removeHand();
                // console.log('first', curBall);
                if (currBall?.num === 54 || !currBall?.num) return;
                if (this.scene.isActive) return;
                this.scene[currBall?.board].addHand(currBall?.num);
            }, 7000);
            if (num === 37) {
                setTimeout(() => this.bingo(this.scene.bingo1), 700);
                setTimeout(() => this.scene.addBingo('bingo'), 1700);
            }
            if (num === 46) {
                setTimeout(() => this.bingo(this.scene.bingo2), 700);
                setTimeout(() => this.scene.addBingo('double'), 1700);
            }
            if (num === 54) {
                setTimeout(() => this.bingo(this.scene.bingo3), 700);
                setTimeout(() => this.scene.addBingo('triple'), 1700);
                setTimeout(() => this.scene.winGame(), 3700);
                this.disableInterActive();
                // this.scene.soundtrack.stop();
            }
        }
        this.wrong(num);
    }

    bingo(number) {
        number.forEach((num, idx) => {
            const { x, y } = this[`number_${num}`];

            this[`number_${num}_bingo`] = this.scene.add
                .image(x === -250 ? -255 : x, y, 'atlas', 'item_bingo')
                .setDepth(35)
                .setAlpha(1)
                .setScale(0)
                .setOrigin(0.5);
            this[`number_${num}_bingo_star`] = this.scene.add
                .image(x === -250 ? -255 : x, y, 'atlas', 'daub')
                .setScale(0)
                .setDepth(39)
                .setAlpha(1)
                .setOrigin(0.5);
            this.add([this[`number_${num}_bingo`], this[`number_${num}_bingo_star`]]);

            this.scene.tweens.add({
                targets: this[`number_${num}_bingo`],
                scale: 1,
                duration: 300,
                ease: 'Bounce.out',
                delay: 100 * idx,
            });

            this.scene.tweens.add({
                targets: this[`number_${num}_bingo_star`],
                scale: 1.4,
                duration: 300,
                ease: 'Bounce.out',
                delay: 200 + 100 * idx,
                onComplete: () => this[`number_${num}_bingo_star`].setScale(1),
            });
            this._sort();
        });
    }

    addHand(num) {
        if (this.hand) {
            this.removeHand();
        }
        if (this.scene.isActive) return;
        this.hand = this.scene.add
            .image(this[`number_${num}`].x + 190, this[`number_${num}`].y + 180, 'atlas', 'hand')
            .setDepth(176)
            .setScale(5);
        this.scene.tweens.add({
            targets: [this.hand],
            x: '-=70',
            y: '-=70',
            scale: '*=0.9',
            duration: 300,
            repeatDelay: 200,
            yoyo: true,
            repeat: -1,
        });
        this.add([this.hand]);
        this._sort();
    }

    removeHand() {
        this.hand?.destroy();
    }

    addTutorialFirst() {
        this.glow = this.scene.add.image(0, 170, 'atlas', 'item_yellow').setDepth(76).setScale(2);
        this.number_41.setScale(1).setDepth(77);
        this.add([this.glow]);
        this._sort();
        this.glowAnim = this.scene.tweens.add({
            targets: [this.glow, this.number_41],
            scale: '*=0.8',
            duration: 200,
            delay: 300,
            yoyo: true,
            repeatDelay: 400,
            repeat: -1,
        });
        this.addHand(41);
    }

    removeFirstTutorial() {
        this.number_41.setScale(0.6).setDepth(36);
        this.glow.destroy();
        this.glowAnim.remove();
    }

    addSmallStars(x, y) {
        this.star1 = this.scene.add
            .image(x + 30, y + 40, 'atlas', 'star')
            .setDepth(78)
            .setScale(0.1);
        this.star2 = this.scene.add
            .image(x + 50, y, 'atlas', 'star')
            .setDepth(78)
            .setScale(0.1);
        this.star3 = this.scene.add
            .image(x + 30, y - 70, 'atlas', 'star')
            .setDepth(78)
            .setScale(0.1);
        this.star4 = this.scene.add
            .image(x - 35, y - 50, 'atlas', 'star')
            .setDepth(78)
            .setScale(0.1);
        this.star5 = this.scene.add
            .image(x - 50, y, 'atlas', 'star')
            .setDepth(78)
            .setScale(0.1);
        this.star6 = this.scene.add
            .image(x - 70, y + 60, 'atlas', 'star')
            .setDepth(78)
            .setScale(0.1);

        this.scene.tweens.add({
            targets: [this.star1, this.star2, this.star3, this.star4, this.star5, this.star6],
            angle: '+=360',
            duration: 500,
            scale: 0.8,
        });
        this.scene.tweens.add({
            targets: [this.star1, this.star2, this.star3, this.star4, this.star5, this.star6],
            y: '+=60',
            duration: 500,
            delay: 600,
            alpha: 0,
        });
        this.add([this.star1, this.star2, this.star3, this.star4, this.star5, this.star6]);
        this._sort();
        setTimeout(() => {
            this.star1.destroy();
            this.star2.destroy();
            this.star3.destroy();
            this.star4.destroy();
            this.star5.destroy();
            this.star6.destroy();
        }, 1700);
    }
}
