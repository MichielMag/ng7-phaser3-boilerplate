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
        this.phaserSprite = this.add.sprite(400, 300, "logo");
    }
}