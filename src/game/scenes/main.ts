import { Scene } from "phaser";

export class MainScene extends Scene
{
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() 
    {
        super("main");
    }

    preload(): void {
        this.load.image("logo", "/assets/game/phaser.png");
        
    }

    create(): void {
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;


        this.phaserSprite = this.add.sprite((width / 2)/* - (this.imageWidth / 2)*/, (height / 2) /*- (this.imageHeight / 2)*/, "logo");
    }
}