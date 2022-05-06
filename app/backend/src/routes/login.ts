import { NextFunction, Request, Response, Router } from 'express';
import { ILoginController } from '../interfaces';

export default class LoginRoute {
  protected loginController: ILoginController;

  public router: Router;

  constructor(loginController: ILoginController) {
    this.loginController = loginController;

    this.router = Router().post(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        this.loginController.login(req, res, next);
      },
    );
  }
}
