import { Request, Response, NextFunction } from 'express';
import { UserCredentialsType } from '../../types/user';
import { AuthenticatedUserInterface } from '../../interfaces/user';

export default interface LoginControllerInterface {
  login: (
    req: Request<unknown, AuthenticatedUserInterface, UserCredentialsType>,
    res: Response<AuthenticatedUserInterface>,
    next: NextFunction
  ) => Promise<void>;
}
