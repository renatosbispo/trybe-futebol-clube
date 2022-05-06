import { Request, Response, NextFunction } from 'express';
import {
  AuthenticatedUserInterface,
  UserModelInterface,
} from '../../interfaces/user';

export default interface LoginControllerInterface {
  login: (
    req: Request<
    unknown,
    AuthenticatedUserInterface,
    Pick<UserModelInterface, 'email' | 'password'>
    >,
    res: Response<AuthenticatedUserInterface>,
    next: NextFunction
  ) => Promise<void>;
}
