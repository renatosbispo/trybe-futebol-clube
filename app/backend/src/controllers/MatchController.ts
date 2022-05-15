import { NextFunction, Request, Response } from 'express';
import { MatchModelInterface } from '../interfaces/match';
import { MatchService } from '../services';

export default class MatchController {
  protected matchService: MatchService;

  constructor(matchService: MatchService) {
    this.matchService = matchService;
  }

  public async findAll(
    _req: Request<unknown, MatchModelInterface[]>,
    res: Response<MatchModelInterface[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const matches = await this.matchService.findAll();

      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
