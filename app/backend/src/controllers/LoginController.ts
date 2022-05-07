import { Request, Response, NextFunction } from 'express';
import {
  AuthenticatedUserInterface,
  UserModelInterface,
} from '../interfaces/user';

export default class LoginController {
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
