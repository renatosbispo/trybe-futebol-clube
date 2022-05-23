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

  public async getTotalHomePoints(id: number): Promise<number> {
    const totalHomeDraws = await this.teamService.getHomeDraws(id);
    const totalHomeVictories = await this.teamService.getHomeVictories(id);

    return totalHomeDraws + totalHomeVictories * 3;
  }

  // getHomeLeaderboard(): Promise<LeaderboardInterface> {}
}
