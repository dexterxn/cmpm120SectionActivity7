class Intro extends Phaser.Scene
{   
    constructor() {
        super('intro')
    }
    preload ()
    {
        this.load.image("fairy", "assets/fairy for section.png");
        this.load.image("rolly polly", "assets/rolly polly for section.png");
        this.load.image("snail", "assets/snail for section.png");
        this.load.image("start", "assets/start.png");
    }

    create ()
    {
        const fairy = this.add.image(400, 100, 'fairy');
        const bug = this.add.image(200, 100, 'rolly polly');
        const snail = this.add.image(600, 100, 'snail');
        snail.setScale(2);
        fairy.setScale(2);
        bug.setScale(2);

        const text = this.add.text(400, 300, 'Roly Poly:\n To the End', { align: 'center' }, 0xFF69B4);
        text.setTint(0xFF69B4, 0xFFC0CB, 0x9F2B68, 0xE30B5C);

        text.setOrigin(0.5, 0.5);
        text.setResolution(window.devicePixelRatio);
        text.setFontFamily('Arial');
        text.setFontStyle('bold');
        text.setFontSize(100);

        text.preFX.setPadding(32);

        const fx = text.preFX.addShadow(0, 0, 0.06, 0.75, 0x000000, 4, 0.8);

        // adding start button 

        const start = this.add.image(400, 600, 'start').setOrigin(0.5, 1);

        const chain1 = this.tweens.chain({
            targets: start,
            tweens: [
                {
                    y: 470,
                    scaleX: 0.7,
                    duration: 300,
                    ease: 'quad.out'
                },
                {
                    y: 550,
                    scaleX: 1,
                    duration: 1000,
                    ease: 'bounce.out'
                },
            ],
            loop: -1,
            loopDelay: 300,
        });
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('victory'));
        });
    }
}

class Victory extends Phaser.Scene{
    constructor() {
        super('victory');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#FFC0CB',
    parent: 'phaser-example',
    scene: [Intro, Victory]
};

const game = new Phaser.Game(config);
