import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Score } from 'src/game/domain/score';

@Injectable({
  providedIn: 'root'
})
export class GameStatsService {
    static instance : GameStatsService;

    public keyPressed : Subject<string> = new Subject<string>();
    public scoreChanged : Subject<Score> = new Subject<Score>();

    private score : Score = new Score();

    constructor() 
    {
        if (GameStatsService.instance === undefined || GameStatsService.instance === null)
        {
            GameStatsService.instance = this;
        }
    }

    emitKey(key : string)
    {
        this.keyPressed.next(key);
    }

    emitScore(score : Score)
    {
        this.score.add(score);
        this.scoreChanged.next(this.score);
    }
}
