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

  public async getHomeGoalsBalance(id: number): Promise<number> {
    const homeGoalsFor = await this.teamService.getHomeGoalsFor(id);
    const homeGoalsAgainst = await this.teamService.getHomeGoalsAgainst(id);

    return homeGoalsFor - homeGoalsAgainst;
  }

  public async getHomeTotalPoints(id: number): Promise<number> {
    const totalHomeDraws = await this.teamService.getHomeDraws(id);
    const totalHomeVictories = await this.teamService.getHomeVictories(id);

    return totalHomeDraws + totalHomeVictories * 3;
  }

  // getHomeLeaderboard(): Promise<LeaderboardInterface> {}
}
