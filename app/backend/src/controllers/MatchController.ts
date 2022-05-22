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
}
