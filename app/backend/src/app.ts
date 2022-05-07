import express, { Express, RequestHandler } from 'express';
import { LoginController } from './controllers';
import { LoginRouter } from './routers';

class App {
  public app: Express;

  protected loginController: LoginController;

  protected loginRouter: LoginRouter;

  constructor() {
    this.loginController = new LoginController();
    this.loginRouter = new LoginRouter(this.loginController);

    this.app = express();
    this.config();
    this.setupRoutes();
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
