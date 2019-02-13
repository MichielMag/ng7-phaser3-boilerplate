import { TestBed } from '@angular/core/testing';

import { GameStatsService } from './game-stats.service';

describe('GameStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameStatsService = TestBed.get(GameStatsService);
    expect(service).toBeTruthy();
  });
});
