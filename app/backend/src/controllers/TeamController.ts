import { NextFunction, Request, Response } from 'express';
import { TeamModelInterface } from '../interfaces/team';
import { TeamService } from '../services';

export default class TeamController {
  protected teamService: TeamService;

  constructor(teamService: TeamService) {
    this.teamService = teamService;
  }

  public async findAll(
    _req: Request<unknown, TeamModelInterface[]>,
    res: Response<TeamModelInterface[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const teams = await this.teamService.findAll();

      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  public async findById(
    req: Request<{ id: string }, TeamModelInterface>,
    res: Response<TeamModelInterface>,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const team = await this.teamService.findById(id);

      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
