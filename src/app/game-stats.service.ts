import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStatsService {
    static instance : GameStatsService;

    public keyPressed : Subject<string> = new Subject<string>();

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
}
