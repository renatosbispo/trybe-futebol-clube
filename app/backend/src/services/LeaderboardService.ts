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

  // getHomeLeaderboard(): Promise<LeaderboardInterface> {}
}
