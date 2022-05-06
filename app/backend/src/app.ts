import * as express from 'express';
import { LoginController } from './controllers';
import { LoginRoute } from './routes';

class App {
  public app: express.Express;

  protected loginController: LoginController;

  protected loginRoute: LoginRoute;

  constructor() {
    this.loginController = new LoginController();
    this.loginRoute = new LoginRoute(this.loginController);

    this.app = express();
    this.config();
    this.setupRoutes();
  }

  protected config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
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

    this.app.use('/login', this.loginRoute.router);
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
