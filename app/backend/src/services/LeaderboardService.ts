import LeaderboardInterface from '../interfaces/leaderboard/Leaderboard.interface';
import { MatchRepoInterface } from '../interfaces/match';

export default class LeaderboardService {
  protected matchRepo: MatchRepoInterface;

  constructor(matchRepo: MatchRepoInterface) {
    this.matchRepo = matchRepo;
  }

  protected async getTotalGames(id: number): Promise<number> {
    const matches = await this.matchRepo.findAll();

    const totalGames = matches.reduce((total, { homeTeam, awayTeam }) => (
      awayTeam === id || homeTeam === id ? total + 1 : total
    ), 0);

    return totalGames;
  }

  // getHomeLeaderboard(): Promise<LeaderboardInterface> {}
}
