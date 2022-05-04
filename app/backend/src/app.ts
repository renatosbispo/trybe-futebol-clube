import * as express from 'express';

class App {
  public app: express.Express;

  constructor() {
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
  }

  public start(PORT: string | number): void {
    const port = typeof PORT === 'string' ? Number(PORT) : PORT;

    this.app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
