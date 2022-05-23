import express, { Express, RequestHandler } from 'express';
import fs from 'fs';
import {
  MatchModelSequelizeAdapter,
  TeamModelSequelizeAdapter,
  UserModelSequelizeAdapter,
} from './adapters';
import {
  LeaderboardController,
  LoginController,
  MatchController,
  TeamController,
} from './controllers';
import { MatchRepoInterface } from './interfaces/match';
import { TeamRepoInterface } from './interfaces/team';
import { UserRepoInterface } from './interfaces/user';
import { AuthMiddleware, ErrorMiddleware } from './middlewares';
import { LeaderboardRouter, LoginRouter, MatchRouter, TeamRouter } from './routers';
import {
  AuthService,
  AwayLeaderboardService,
  HomeLeaderboardService,
  MatchService,
  TeamService,
  UserService,
} from './services';

class App {
  public app: Express;

  protected authMiddleware: AuthMiddleware;

  protected authService: AuthService;

  protected awayLeaderboardService: AwayLeaderboardService;

  protected homeLeaderboardService: HomeLeaderboardService;

  protected jwtSecret: string;

  protected leaderboardController: LeaderboardController;

  protected leaderboardRouter: LeaderboardRouter;

  protected loginController: LoginController;

  protected loginRouter: LoginRouter;

  protected matchController: MatchController;

  protected matchRepo: MatchRepoInterface;

  protected matchRouter: MatchRouter;

  protected matchService: MatchService;

  protected teamController: TeamController;

  protected teamRepo: TeamRepoInterface;

  protected teamRouter: TeamRouter;

  protected teamService: TeamService;

  protected userRepo: UserRepoInterface;

  protected userService: UserService;

  constructor() {
    this.jwtSecret = fs.readFileSync('jwt.evaluation.key', {
      encoding: 'utf-8',
    });

    this.app = express();
    this.config();

    this.setupRepos();
    this.setupServices();
    this.setupControllers();
    this.setupMiddlewares();
    this.setupRouters();
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

  protected setupControllers(): void {
    this.leaderboardController = new LeaderboardController(
      this.homeLeaderboardService,
      this.awayLeaderboardService,
    );

    this.loginController = new LoginController(
      this.authService,
      this.userService,
    );

    this.matchController = new MatchController(this.matchService);
    this.teamController = new TeamController(this.teamService);
  }

  protected setupServices(): void {
    this.authService = new AuthService(this.userRepo, this.jwtSecret);
    this.matchService = new MatchService(this.matchRepo, this.teamRepo);
    this.teamService = new TeamService(this.teamRepo, this.matchRepo);

    this.awayLeaderboardService = new AwayLeaderboardService(
      this.matchRepo,
      this.teamService,
    );

    this.homeLeaderboardService = new HomeLeaderboardService(
      this.matchRepo,
      this.teamService,
    );

    this.userService = new UserService(this.userRepo);
  }

  protected setupMiddlewares(): void {
    this.authMiddleware = new AuthMiddleware(this.authService);
  }

  protected setupRepos(): void {
    this.matchRepo = new MatchModelSequelizeAdapter();
    this.teamRepo = new TeamModelSequelizeAdapter();
    this.userRepo = new UserModelSequelizeAdapter();
  }

  protected setupRoutes(): void {
    this.app.use('/leaderboard', this.leaderboardRouter.router);
    this.app.use('/login', this.loginRouter.router);
    this.app.use('/matches', this.matchRouter.router);
    this.app.use('/teams', this.teamRouter.router);
  }

  protected setupRouters(): void {
    this.leaderboardRouter = new LeaderboardRouter(this.leaderboardController);

    this.loginRouter = new LoginRouter(
      this.authMiddleware,
      this.loginController,
    );

    this.matchRouter = new MatchRouter(this.matchController, this.authMiddleware);
    this.teamRouter = new TeamRouter(this.teamController);
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
