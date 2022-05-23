import { NextFunction, Request, Response } from 'express';
import { AwayLeaderboardService, HomeLeaderboardService } from '../services';

export default class LeaderboardController {
  protected awayLeaderboardService: AwayLeaderboardService;

  protected homeLeaderboardService: HomeLeaderboardService;

  constructor(
    homeLeaderboardService: HomeLeaderboardService,
    awayLeaderboardService: AwayLeaderboardService,
  ) {
    this.awayLeaderboardService = awayLeaderboardService;
    this.homeLeaderboardService = homeLeaderboardService;
  }

  public async getHomeLeaderboard(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const homeLeaderboard = await this.homeLeaderboardService.getHomeLeaderboard();

      res.status(200).json(homeLeaderboard);
    } catch (error) {
      next(error);
    }
  }

  public async getAwayLeaderboard(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const awayLeaderboard = await this.awayLeaderboardService.getAwayLeaderboard();

      res.status(200).json(awayLeaderboard);
    } catch (error) {
      next(error);
    }
  }
}
