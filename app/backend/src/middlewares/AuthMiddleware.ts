import { Request, Response, NextFunction } from 'express';
import { AuthenticatedUserInterface } from '../interfaces/user';
import { UserCredentialsType } from '../types/user';
import { AuthService } from '../services';

export default class AuthMiddleware {
  protected authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async verifyCredentials(
    req: Request<unknown, AuthenticatedUserInterface, UserCredentialsType>,
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

  public async verifyToken(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = req.headers.authorization;

      const tokenPayload = this.authService.verifyToken(token);

      req.tokenPayload = tokenPayload;

      next();
    } catch (error) {
      next(error);
    }
  }
}
