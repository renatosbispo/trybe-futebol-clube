import { NextFunction, Request, Response, Router } from 'express';
import { TeamController } from '../controllers';

export default class TeamRouter {
  public router: Router;

  protected teamController: TeamController;

  constructor(teamController: TeamController) {
    this.teamController = teamController;
    this.router = Router();
    this.router = this.setupGetRoot();
  }

  protected setupGetRoot(): Router {
    return this.router.get(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        this.teamController.findAll(req, res, next);
      },
    );
  }
}
