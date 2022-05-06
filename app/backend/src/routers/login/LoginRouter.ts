import { NextFunction, Request, Response, Router } from 'express';
import LoginControllerInterface from './LoginController.interface';

export default class LoginRouter {
  protected loginController: LoginControllerInterface;

  public router: Router;

  constructor(loginController: LoginControllerInterface) {
    this.loginController = loginController;

    this.router = Router().post(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        this.loginController.login(req, res, next);
      },
    );
  }
}
