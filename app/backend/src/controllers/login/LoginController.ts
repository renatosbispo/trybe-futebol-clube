import { Request, Response, NextFunction } from 'express';
import {
  AuthenticatedUserInterface,
  UserModelInterface,
} from '../../interfaces/user';
import { LoginControllerInterface } from '../../routers/login';

export default class LoginController implements LoginControllerInterface {
  public async login(
    _req: Request<
      unknown,
      AuthenticatedUserInterface,
      Pick<UserModelInterface, 'email' | 'password'>
    >,
    res: Response<AuthenticatedUserInterface>,
    _next: NextFunction
  ): Promise<void> {
    res.status(200).end();
  }
}
