import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SimpleGame } from 'src/game/simple-game';

import { MainScene } from "../game/scenes/main";
import { Scale } from 'phaser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    @ViewChild("canvas") el : ElementRef;

    game : SimpleGame;

    ngAfterViewInit(): void {
        this.config.canvas = this.el.nativeElement;
        this.game = new SimpleGame(this.config);
    }
    title = 'ng7-phaser3-boilerplate';

    config : GameConfig = {
        type: Phaser.CANVAS,
        scale: {
            width: 800,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            height: 600,
            mode: Phaser.Scale.RESIZE
        },
        parent: "game",
        scene: MainScene,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 200 }
          }
        }
      };
    ngOnInit(): void {
    }
}
