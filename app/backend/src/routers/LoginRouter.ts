import { NextFunction, Request, Response, Router } from 'express';
import { LoginController } from '../controllers';

export default class LoginRouter {
  protected loginController: LoginController;

  public router: Router;

  constructor(loginController: LoginController) {
    this.loginController = loginController;

    this.router = Router().post(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        this.loginController.login(req, res, next);
      },
    );
  }
}
