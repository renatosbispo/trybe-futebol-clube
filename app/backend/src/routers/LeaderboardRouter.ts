import { NextFunction, Request, Response, Router } from 'express';
import { LeaderboardController } from '../controllers';

export default class LeaderboardRouter {
  protected leaderboardController: LeaderboardController;

  public router: Router;

  constructor(leaderboardController: LeaderboardController) {
    this.leaderboardController = leaderboardController;
    this.router = Router();
    this.setupGetAway();
    this.setupGetHome();
  }

  protected setupGetAway() {
    return this.router.get(
      '/away',
      async (req: Request, res: Response, next: NextFunction) => {
        this.leaderboardController.getAwayLeaderboard(req, res, next);
      },
    );
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
