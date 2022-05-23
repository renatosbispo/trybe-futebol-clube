import { firstBy } from 'thenby';
import LeaderboardInterface from '../interfaces/leaderboard/Leaderboard.interface';
import { MatchRepoInterface } from '../interfaces/match';
import TeamService from './TeamService';

export default class LeaderboardService {
  protected homeLeaderboard: LeaderboardInterface[];

  protected matchRepo: MatchRepoInterface;

  protected teamService: TeamService;

  constructor(matchRepo: MatchRepoInterface, teamService: TeamService) {
    this.matchRepo = matchRepo;
    this.teamService = teamService;
  }

  public async getHomeEfficiency(id: number): Promise<number> {
    const homeTotalPoints = await this.getHomeTotalPoints(id);
    const homeTotalMatches = await this.teamService.getHomeTotalMatches(id);

    const homeEfficiency = (homeTotalPoints / (homeTotalMatches * 3)) * 100;

    return Math.round(homeEfficiency * 100) / 100;
  }

  public async getHomeGoalsBalance(id: number): Promise<number> {
    const homeGoalsFor = await this.teamService.getHomeGoalsFor(id);
    const homeGoalsAgainst = await this.teamService.getHomeGoalsAgainst(id);

    return homeGoalsFor - homeGoalsAgainst;
  }

  public async getHomeTotalPoints(id: number): Promise<number> {
    const totalHomeDraws = await this.teamService.getHomeTotalDraws(id);
    const totalHomeVictories = await this.teamService.getHomeTotalVictories(id);

    return totalHomeDraws + totalHomeVictories * 3;
  }

  public async getHomeLeaderboard(): Promise<LeaderboardInterface[]> {
    const teams = await this.teamService.findAll();

    const leaderboard = await Promise.all(
      teams.map(({ id }) => this.getTeamStatsHome(id)),
    );

    this.homeLeaderboard = leaderboard;

    this.sortHomeLeaderboard();

    return this.homeLeaderboard;
  }

  public async getTeamStatsHome(id: number): Promise<LeaderboardInterface> {
    return {
      name: (await this.teamService.findById(`${id}`)).teamName,
      totalPoints: await this.getHomeTotalPoints(id),
      totalGames: await this.teamService.getHomeTotalMatches(id),
      totalVictories: await this.teamService.getHomeTotalVictories(id),
      totalDraws: await this.teamService.getHomeTotalDraws(id),
      totalLosses: await this.teamService.getHomeTotalLosses(id),
      goalsFavor: await this.teamService.getHomeGoalsFor(id),
      goalsOwn: await this.teamService.getHomeGoalsAgainst(id),
      goalsBalance: await this.getHomeGoalsBalance(id),
      efficiency: await this.getHomeEfficiency(id),
    };
  }

  public async sortHomeLeaderboard() {
    this.homeLeaderboard.sort(
      firstBy(
        (a: LeaderboardInterface, b: LeaderboardInterface) =>
          b.totalVictories - a.totalVictories,
      )
        .thenBy(
          (a: LeaderboardInterface, b: LeaderboardInterface) =>
            b.goalsBalance - a.goalsBalance,
        )
        .thenBy(
          (a: LeaderboardInterface, b: LeaderboardInterface) =>
            b.goalsFavor - a.goalsFavor,
        )
        .thenBy(
          (a: LeaderboardInterface, b: LeaderboardInterface) =>
            a.goalsOwn - b.goalsOwn,
        ),
    );
  }
}
