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
}
