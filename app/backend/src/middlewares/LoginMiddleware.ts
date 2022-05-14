import { Request, Response, NextFunction } from 'express';
import {
  AuthenticatedUserInterface,
} from '../interfaces/user';
import { UserCredentialsType } from '../types/user';
import { AuthService } from '../services';

export default class LoginMiddleware {
  protected authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async verifyCredentials(
    req: Request<
    unknown,
    AuthenticatedUserInterface,
    UserCredentialsType
    >,
    _res: Response<AuthenticatedUserInterface>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      await this.authService.verifyCredentials(email, password);

      next();
    } catch (error) {
      next(error);
    }
  }
}
