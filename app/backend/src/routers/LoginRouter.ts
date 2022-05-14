import { NextFunction, Request, Response, Router } from 'express';
import { LoginController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

export default class LoginRouter {
  protected loginController: LoginController;

  protected authMiddleware: AuthMiddleware;

  public router: Router;

  constructor(
    loginController: LoginController,
    authMiddleware: AuthMiddleware,
  ) {
    this.loginController = loginController;
    this.authMiddleware = authMiddleware;

    this.router = Router().post(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        this.authMiddleware.verifyCredentials(req, res, next);
      },
      async (req: Request, res: Response, next: NextFunction) => {
        this.loginController.login(req, res, next);
      },
    );
  }
}
