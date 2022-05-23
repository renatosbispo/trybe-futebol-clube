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

  public async countAwayGamesWhere(
    id: number,
    predicate: (match: MatchModelInterface) => boolean,
  ): Promise<number> {
    const matches = await this.findAwayMatches(id);

    const totalAwayMatches = matches.reduce(
      (total, match) => (predicate(match) ? total + 1 : total),
      0,
    );

    return totalAwayMatches;
  }

  public async countHomeGamesWhere(
    id: number,
    predicate: (match: MatchModelInterface) => boolean,
  ): Promise<number> {
    const matches = await this.findHomeMatches(id);

    const totalHomeMatches = matches.reduce(
      (total, match) => (predicate(match) ? total + 1 : total),
      0,
    );

    return totalHomeMatches;
  }

  public async findAll(): Promise<TeamModelInterface[]> {
    const teams = await this.teamRepo.findAll();

    return teams;
  }

  public async findAwayMatches(id: number): Promise<MatchModelInterface[]> {
    const matches = await this.matchRepo.findAll();

    const awayMatches = matches.filter(
      ({ awayTeam, inProgress }) => awayTeam === id && !inProgress,
      0,
    );

    return awayMatches;
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

  public async findHomeMatches(id: number): Promise<MatchModelInterface[]> {
    const matches = await this.matchRepo.findAll();

    const homeMatches = matches.filter(
      ({ homeTeam, inProgress }) => homeTeam === id && !inProgress,
      0,
    );

    return homeMatches;
  }

  public async getAwayGoalsFor(id: number): Promise<number> {
    const awayMatches = await this.findAwayMatches(id);

    const awayGoalsFor = awayMatches.reduce(
      (total, { awayTeamGoals }) => total + awayTeamGoals,
      0,
    );

    return awayGoalsFor;
  }

  public async getAwayGoalsAgainst(id: number): Promise<number> {
    const awayMatches = await this.findAwayMatches(id);

    const awayGoalsAgainst = awayMatches.reduce(
      (total, { homeTeamGoals }) => total + homeTeamGoals,
      0,
    );

    return awayGoalsAgainst;
  }

  public async getAwayTotalDraws(id: number): Promise<number> {
    return this.countAwayGamesWhere(
      id,
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals === awayTeamGoals,
    );
  }

  public async getAwayTotalLosses(id: number): Promise<number> {
    return this.countAwayGamesWhere(
      id,
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals > awayTeamGoals,
    );
  }

  public async getAwayTotalMatches(id: number): Promise<number> {
    const awayMatches = (await this.findAwayMatches(id)).length;

    return awayMatches;
  }

  public async getAwayTotalVictories(id: number): Promise<number> {
    return this.countAwayGamesWhere(
      id,
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals < awayTeamGoals,
    );
  }

  public async getGoalsAgainst(id: number): Promise<number> {
    const awayGoalsAgainst = await this.getAwayGoalsAgainst(id);
    const homeGoalsAgainst = await this.getHomeGoalsAgainst(id);

    return awayGoalsAgainst + homeGoalsAgainst;
  }

  public async getGoalsFor(id: number): Promise<number> {
    const awayGoalsFor = await this.getAwayGoalsFor(id);
    const homeGoalsFor = await this.getHomeGoalsFor(id);

    return awayGoalsFor + homeGoalsFor;
  }

  public async getHomeGoalsAgainst(id: number): Promise<number> {
    const homeMatches = await this.findHomeMatches(id);

    const homeGoalsAgainst = homeMatches.reduce(
      (total, { awayTeamGoals }) => total + awayTeamGoals,
      0,
    );

    return homeGoalsAgainst;
  }

  public async getHomeGoalsFor(id: number): Promise<number> {
    const homeMatches = await this.findHomeMatches(id);

    const homeGoalsFor = homeMatches.reduce(
      (total, { homeTeamGoals }) => total + homeTeamGoals,
      0,
    );

    return homeGoalsFor;
  }

  public async getHomeTotalDraws(id: number): Promise<number> {
    return this.countHomeGamesWhere(
      id,
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals === awayTeamGoals,
    );
  }

  public async getHomeTotalLosses(id: number): Promise<number> {
    return this.countHomeGamesWhere(
      id,
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals < awayTeamGoals,
    );
  }

  public async getHomeTotalMatches(id: number): Promise<number> {
    const homeMatches = (await this.findHomeMatches(id)).length;

    return homeMatches;
  }

  public async getHomeTotalVictories(id: number): Promise<number> {
    return this.countHomeGamesWhere(
      id,
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals > awayTeamGoals,
    );
  }
}
