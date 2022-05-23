import LeaderboardInterface from '../interfaces/leaderboard/Leaderboard.interface';
import { MatchRepoInterface } from '../interfaces/match';
import TeamService from './TeamService';

export default class AwayLeaderboardService {
  protected awayLeaderboard: LeaderboardInterface[];

  protected matchRepo: MatchRepoInterface;

  protected teamService: TeamService;

  constructor(matchRepo: MatchRepoInterface, teamService: TeamService) {
    this.matchRepo = matchRepo;
    this.teamService = teamService;
  }

  protected async getAwayEfficiency(id: number): Promise<number> {
    const awayTotalPoints = await this.getAwayTotalPoints(id);
    const awayTotalMatches = await this.teamService.getAwayTotalMatches(id);

    const awayEfficiency = (awayTotalPoints / (awayTotalMatches * 3)) * 100;

    return Math.round(awayEfficiency * 100) / 100;
  }

  protected async getAwayGoalsBalance(id: number): Promise<number> {
    const awayGoalsFor = await this.teamService.getAwayGoalsFor(id);
    const awayGoalsAgainst = await this.teamService.getAwayGoalsAgainst(id);

    return awayGoalsFor - awayGoalsAgainst;
  }

  protected async getAwayTotalPoints(id: number): Promise<number> {
    const totalAwayDraws = await this.teamService.getAwayTotalDraws(id);
    const totalAwayVictories = await this.teamService.getAwayTotalVictories(id);

    return totalAwayDraws + totalAwayVictories * 3;
  }

  public async getAwayLeaderboard(): Promise<LeaderboardInterface[]> {
    const teams = await this.teamService.findAll();

    const leaderboard = await Promise.all(
      teams.map(({ id, teamName }) => this.getTeamStatsAway(id, teamName)),
    );

    this.awayLeaderboard = leaderboard;

    this.sortAwayLeaderboard();

    return this.awayLeaderboard;
  }

  protected async getTeamStatsAway(id: number, name: string): Promise<LeaderboardInterface> {
    return {
      name,
      totalPoints: await this.getAwayTotalPoints(id),
      totalGames: await this.teamService.getAwayTotalMatches(id),
      totalVictories: await this.teamService.getAwayTotalVictories(id),
      totalDraws: await this.teamService.getAwayTotalDraws(id),
      totalLosses: await this.teamService.getAwayTotalLosses(id),
      goalsFavor: await this.teamService.getAwayGoalsFor(id),
      goalsOwn: await this.teamService.getAwayGoalsAgainst(id),
      goalsBalance: await this.getAwayGoalsBalance(id),
      efficiency: await this.getAwayEfficiency(id),
    };
  }

  protected async sortAwayLeaderboard() {
    this.awayLeaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));
  }
}
