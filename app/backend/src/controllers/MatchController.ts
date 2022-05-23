import { NextFunction, Request, Response } from 'express';
import { MatchModelInterface } from '../interfaces/match';
import { MatchService } from '../services';

export default class MatchController {
  protected matchService: MatchService;

  constructor(matchService: MatchService) {
    this.matchService = matchService;
  }

  public async create(
    req: Request<
    unknown,
    MatchModelInterface,
    Omit<MatchModelInterface, 'id'>
    >,
    res: Response<Omit<MatchModelInterface, 'id'>>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = req.body;
      const matches = await this.matchService.create(data);

      res.status(201).json(matches);
    } catch (error) {
      next(error);
    }
  }

  public async findAll(
    req: Request<
    unknown,
    MatchModelInterface[],
    unknown,
    { inProgress: string | undefined }
    >,
    res: Response<MatchModelInterface[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { inProgress } = req.query;

      const matches = await this.matchService.findAll(inProgress);

      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  public async finishMatch(
    req: Request<
    { id: string },
    { message: string },
    Partial<MatchModelInterface>
    >,
    res: Response<{ message: string }>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await this.matchService.update(id, { inProgress: false });

      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  public async update(
    req: Request<
    { id: string },
    unknown,
    Partial<MatchModelInterface>
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { awayTeamGoals, homeTeamGoals } = req.body;

      await this.matchService.update(id, { awayTeamGoals, homeTeamGoals });

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
