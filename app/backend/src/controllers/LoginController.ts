import { Request, Response, NextFunction } from 'express';
import {
  AuthenticatedUserInterface,
  UserModelInterface,
} from '../interfaces/user';
import { AuthService, UserService } from '../services';

export default class LoginController {
  protected authService: AuthService;

  protected userService: UserService;

  constructor(authService: AuthService, userService: UserService) {
    this.authService = authService;
    this.userService = userService;
  }

  public async login(
    req: Request<
    unknown,
    AuthenticatedUserInterface,
    Pick<UserModelInterface, 'email' | 'password'>
    >,
    res: Response<AuthenticatedUserInterface>,
    _next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password: passwordFromReq } = req.body;

      await this.authService.verifyCredentials(email, passwordFromReq);

      const user = await this.userService.findByEmail(email) as UserModelInterface;
      const { password, ...userWithoutPassword } = user;

      res.status(200).json({ user: userWithoutPassword, token: 'token' });
    } catch (error) {
      console.error(error);
    }
  }
}
