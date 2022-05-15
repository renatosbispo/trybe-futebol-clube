import ErrorWithCode from '../lib/error-with-code';
import { TeamModelInterface, TeamRepoInterface } from '../interfaces/team';

export default class TeamService {
  protected teamRepo: TeamRepoInterface;

  constructor(teamRepo: TeamRepoInterface) {
    this.teamRepo = teamRepo;
  }

  public async findAll(): Promise<TeamModelInterface[]> {
    const teams = await this.teamRepo.findAll();

    return teams;
  }

  public async findById(id: string): Promise<TeamModelInterface> {
    const team = await this.teamRepo.findById(Number(id));

    if (!team) {
      throw new ErrorWithCode(
        'ENTITY_NOT_FOUND',
        `Team with id ${id} not found`,
      );
    }

    return team;
  }
}
