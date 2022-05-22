import { NextFunction, Request, Response, Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import { MatchController } from '../controllers';
import { MatchModelInterface } from '../interfaces/match';

export default class MatchRouter {
  protected authMiddleware: AuthMiddleware;

  public router: Router;

  protected matchController: MatchController;

  constructor(matchController: MatchController, authMiddleware: AuthMiddleware) {
    this.matchController = matchController;
    this.authMiddleware = authMiddleware;
    this.router = Router();
    this.router = this.setupGetRoot();
    this.router = this.setupPostRoot();
  }

  protected setupGetRoot(): Router {
    return this.router.get(
      '/',
      async (
        req: Request<
        unknown,
        MatchModelInterface[],
        unknown,
        { inProgress: string | undefined }
        >,
        res: Response,
        next: NextFunction,
      ) => {
        this.matchController.findAll(req, res, next);
      },
    );
  }

  protected setupPostRoot(): Router {
    return this.router.post(
      '/',
      async (
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        this.authMiddleware.verifyToken(req, res, next);
      },
      async (
        req: Request<unknown, MatchModelInterface>,
        res: Response,
        next: NextFunction,
      ) => {
        this.matchController.create(req, res, next);
      },
    );
  }
}
