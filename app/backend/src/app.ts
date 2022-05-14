import express, { Express, RequestHandler } from 'express';
import fs from 'fs';
import UserModelSequelizeAdapter from './adapters/UserModelSequelizeAdapter';
import { LoginController } from './controllers';
import { UserRepo } from './interfaces/user';
import { ErrorMiddleware, AuthMiddleware } from './middlewares';
import { LoginRouter } from './routers';
import { AuthService, UserService } from './services';

class App {
  public app: Express;

  protected authService: AuthService;

  protected jwtSecret: string;

  protected loginController: LoginController;

  protected authMiddleware: AuthMiddleware;

  protected loginRouter: LoginRouter;

  protected userService: UserService;

  protected userRepo: UserRepo;

  constructor() {
    this.jwtSecret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });
    this.userRepo = new UserModelSequelizeAdapter();

    this.authService = new AuthService(this.userRepo, this.jwtSecret);
    this.userService = new UserService(this.userRepo);

    this.loginController = new LoginController(
      this.authService,
      this.userService,
    );

    this.authMiddleware = new AuthMiddleware(this.authService);
    this.loginRouter = new LoginRouter(this.loginController, this.authMiddleware);

    this.app = express();
    this.config();
    this.setupRoutes();
    this.app.use(ErrorMiddleware.handleError);
  }

  protected config(): void {
    const accessControl: RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  protected setupRoutes(): void {
    this.app.get('/ping', (_req, res) => {
      res.status(200).json({ message: 'pong' });
    });

    this.app.use('/login', this.loginRouter.router);
  }

  public start(PORT: string | number): void {
    const port = typeof PORT === 'string' ? Number(PORT) : PORT;

    this.app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  }
}

export { App };

export const { app } = new App();
