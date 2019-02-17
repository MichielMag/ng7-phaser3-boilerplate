import { Scene } from "phaser";
import { GameStatsService } from 'src/app/game-stats.service';
import { Score } from '../domain/score';

export class MainScene extends Scene
{
    private phaserSprite: Phaser.GameObjects.Sprite;
    private platforms : Phaser.Physics.Arcade.StaticGroup;
    private player : any;// Phaser.Physics.Arcade.Sprite;

    private cursors : Phaser.Input.Keyboard.CursorKeys;
    private escape : Phaser.Input.Keyboard.Key;

    private stars : Phaser.Physics.Arcade.Group;

    constructor() 
    {
        super("main");

        GameStatsService.instance.keyPressed.subscribe((key) => {
            if (key === 'gravity_inverse')
            {
                if (this.physics.world.gravity.y > 0)
                    this.physics.world.gravity.y = -900;
                else
                    this.physics.world.gravity.y = 300;
            }
        });
    }

    preload(): void {
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;


        this.load.image('ground',   '/assets/game/platform.png');
        this.load.image('star',     '/assets/game/star.png');
        this.load.image('bomb',     '/assets/game/bomb.png');
        this.load.spritesheet('dude',   '/assets/game/dude.png', { frameWidth: 32, frameHeight: 48 });

        var texture = this.textures.createCanvas('gradient', width, height);
        var context = texture.getContext();
        var grd = context.createLinearGradient(0, 0, width, height);    // ERROR LINE

        grd.addColorStop(0, '#FFFFFF');
        grd.addColorStop(1, '#004CB3');

        context.fillStyle = grd;
        context.fillRect(0, 0, width, height);

        //  Call this if running under WebGL, or you'll see nothing change
        texture.refresh();
    }

    create(): void {
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;

        this.add.image((width / 2),(height / 2), 'gradient');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite((width / 2),0, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child : any) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.player, this.platforms);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this._createAnimations();
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    private collectStar(player, star)
    {
        star.disableBody(true, true);

        let score = new Score();
        score.Stars = 1;
        GameStatsService.instance.emitScore(score);
    }

    private lastKey : string = "";

    update()
    {
        if (this.cursors.left.isDown)
        {
            if (this.lastKey !== 'left') {
                GameStatsService.instance.emitKey('left');
                this.lastKey = 'left';
            }

            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            if (this.lastKey !== 'right') {
                GameStatsService.instance.emitKey('right');
                this.lastKey = 'right';
            }
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            if (this.lastKey !== 'none') {
                GameStatsService.instance.emitKey('none');
                this.lastKey = 'none';
            }

            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            if (this.lastKey !== 'up') {
                GameStatsService.instance.emitKey('up');
                this.lastKey = 'up';
            }

            this.player.setVelocityY(-330);
        }

    }

    _createAnimations()
    {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{
                key: 'dude',
                frame: 4
            }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });
    }
}