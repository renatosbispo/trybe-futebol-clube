import { NextFunction, Request, Response, Router } from 'express';
import { LoginController } from '../controllers';
import { LoginMiddleware } from '../middlewares';

export default class LoginRouter {
  protected loginController: LoginController;

  protected loginMiddleware: LoginMiddleware;

  public router: Router;

  constructor(
    loginController: LoginController,
    loginMiddleware: LoginMiddleware,
  ) {
    this.loginController = loginController;
    this.loginMiddleware = loginMiddleware;

    this.router = Router().post(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        this.loginMiddleware.verifyCredentials(req, res, next);
      },
      async (req: Request, res: Response, next: NextFunction) => {
        this.loginController.login(req, res, next);
      },
    );
  }
}
