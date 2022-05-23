import LeaderboardInterface from '../interfaces/leaderboard/Leaderboard.interface';
import { MatchRepoInterface } from '../interfaces/match';
import TeamService from './TeamService';

export default class LeaderboardService {
  protected matchRepo: MatchRepoInterface;

  protected teamService: TeamService;

  constructor(matchRepo: MatchRepoInterface, teamService: TeamService) {
    this.matchRepo = matchRepo;
    this.teamService = teamService;
  }

  protected async getTotalHomeVictories(id: number): Promise<number> {
    const games = await this.teamService.findHomeGames(id);

    const totalHomeVictories = games.reduce((total, { homeTeamGoals, awayTeamGoals }) => (
      homeTeamGoals > awayTeamGoals ? total + 1 : total
    ), 0);

    return totalHomeVictories;
  }

  // getHomeLeaderboard(): Promise<LeaderboardInterface> {}
}
