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

  public async countHomeGamesWhere(
    id: number,
    predicate: (match: MatchModelInterface) => boolean
  ): Promise<number> {
    const matches = await this.findHomeMatches(id);

    const totalHomeMatches = matches.reduce(
      (total, match) => (predicate(match) ? total + 1 : total),
      0
    );

    return totalHomeMatches;
  }

  public async findAll(): Promise<TeamModelInterface[]> {
    const teams = await this.teamRepo.findAll();

    return teams;
  }

  public async findAwayMatches(id: number): Promise<MatchModelInterface[]> {
    const matches = await this.matchRepo.findAll();

    const awayMatches = matches.filter(({ awayTeam }) => awayTeam === id, 0);

    return awayMatches;
  }

  public async findById(id: string): Promise<TeamModelInterface> {
    const team = await this.teamRepo.findById(Number(id));

    if (!team) {
      throw new ErrorWithCode(
        'ENTITY_NOT_FOUND',
        `Team with id ${id} not found`
      );
    }

    return team;
  }

  public async findHomeMatches(id: number): Promise<MatchModelInterface[]> {
    const matches = await this.matchRepo.findAll();

    const homeMatches = matches.filter(({ homeTeam }) => homeTeam === id, 0);

    return homeMatches;
  }

  public async getAwayGoalsFor(id: number): Promise<number> {
    const awayMatches = await this.findHomeMatches(id);

    const awayGoalsFor = awayMatches.reduce(
      (total, { awayTeamGoals }) => total + awayTeamGoals,
      0,
    );

    return awayGoalsFor;
  }

  public async getGoalsFor(id: number): Promise<number> {
    const awayGoalsFor = await this.getAwayGoalsFor(id);
    const homeGoalsFor = await this.getHomeGoalsFor(id);

    return awayGoalsFor + homeGoalsFor;
  }

  public async getHomeGoalsFor(id: number): Promise<number> {
    const homeMatches = await this.findHomeMatches(id);

    const homeGoalsFor = homeMatches.reduce(
      (total, { homeTeamGoals }) => total + homeTeamGoals,
      0,
    );

    return homeGoalsFor;
  }

  public async getHomeDraws(id: number): Promise<number> {
    return this.countHomeGamesWhere(
      id,
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals === awayTeamGoals
    );
  }

  public async getHomeLosses(id: number): Promise<number> {
    return this.countHomeGamesWhere(
      id,
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals < awayTeamGoals
    );
  }

  public async getHomeVictories(id: number): Promise<number> {
    return this.countHomeGamesWhere(
      id,
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals > awayTeamGoals
    );
  }
}
