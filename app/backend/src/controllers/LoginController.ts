import { Request, Response, NextFunction } from 'express';
import {
  AuthenticatedUserInterface,
  UserModelInterface,
} from '../interfaces/user';
import { UserCredentialsType } from '../types/user';
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
    UserCredentialsType
    >,
    res: Response<AuthenticatedUserInterface>,
    _next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;

      const user = await this.userService.findByEmail(email) as UserModelInterface;
      const { password, ...userWithoutPassword } = user;
      const token = this.authService.generateToken({ id: user.id, email });

      res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
      console.error(error);
    }
  }
}
