import { NextFunction, Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

export default class LeaderboardRouter {
  protected leaderboardController: LeaderboardController;

  public router: Router;

  constructor(leaderboardController: LeaderboardController) {
    this.leaderboardController = leaderboardController;
    this.router = Router();
    this.setupGetHome();
  }

  protected setupGetHome() {
    return this.router.get(
      '/home',
      async (req: Request, res: Response, next: NextFunction) => {
        this.leaderboardController.getHomeLeaderboard(req, res, next);
      },
    );
  }
}
