import { NextFunction, Request, Response, Router } from 'express';
import { MatchController } from '../controllers';

export default class MatchRouter {
  public router: Router;

  protected matchController: MatchController;

  constructor(matchController: MatchController) {
    this.matchController = matchController;
    this.router = Router();
    this.router = this.setupGetRoot();
  }

  protected setupGetRoot(): Router {
    return this.router.get(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        this.matchController.findAll(req, res, next);
      },
    );
  }
}
