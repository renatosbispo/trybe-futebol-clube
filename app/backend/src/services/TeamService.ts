import ErrorWithCode from '../lib/error-with-code';
import { TeamModelInterface, TeamRepoInterface } from '../interfaces/team';
import { MatchModelInterface, MatchRepoInterface } from '../interfaces/match';

export default class TeamService {
  protected matchRepo: MatchRepoInterface;

  protected teamRepo: TeamRepoInterface;

  constructor(teamRepo: TeamRepoInterface, matchRepo: MatchRepoInterface) {
    this.matchRepo = matchRepo;
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

  public async findGames(id: number): Promise<MatchModelInterface[]> {
    const matches = await this.matchRepo.findAll();

    const totalGames = matches.filter(({ homeTeam, awayTeam }) => (
      awayTeam === id || homeTeam === id
    ), 0);

    return totalGames;
  }
}
