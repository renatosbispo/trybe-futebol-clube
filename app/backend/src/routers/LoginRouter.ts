import { NextFunction, Request, Response, Router } from 'express';
import { LoginController } from '../controllers';
import { AuthMiddleware, RequestValidationMiddleware } from '../middlewares';
import { UserSchema } from '../schemas';

export default class LoginRouter {
  protected authMiddleware: AuthMiddleware;

  protected loginController: LoginController;

  public router: Router;

  constructor(
    authMiddleware: AuthMiddleware,
    loginController: LoginController,
  ) {
    this.authMiddleware = authMiddleware;
    this.loginController = loginController;

    this.router = Router();
    this.router = this.setupPostRoot();
    this.router = this.setupGetValidate();
  }

  protected setupPostRoot(): Router {
    return this.router.post(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        new RequestValidationMiddleware(
          [UserSchema.email, UserSchema.password],
          [req.body.email, req.body.password],
        ).validate(req, res, next);
      },
      async (req: Request, res: Response, next: NextFunction) => {
        this.authMiddleware.verifyCredentials(req, res, next);
      },
      async (req: Request, res: Response, next: NextFunction) => {
        this.loginController.login(req, res, next);
      },
    );
  }

  protected setupGetValidate(): Router {
    return this.router.get(
      '/validate',
      async (req: Request, res: Response, next: NextFunction) => {
        this.loginController.validate(req, res, next);
      },
    );
  }
}
