import { NextFunction, Request, Response } from 'express';
import { HomeLeaderboardService } from '../services';

export default class LeaderboardController {
  protected homeLeaderboardService: HomeLeaderboardService;

  constructor(homeLeaderboardService: HomeLeaderboardService) {
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
}
