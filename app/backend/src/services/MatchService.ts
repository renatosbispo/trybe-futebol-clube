import { MatchModelInterface, MatchRepoInterface } from '../interfaces/match';

export default class MatchService {
  protected matchRepo: MatchRepoInterface;

  constructor(matchRepo: MatchRepoInterface) {
    this.matchRepo = matchRepo;
  }

  public async findAll(): Promise<MatchModelInterface[]> {
    const matches = await this.matchRepo.findAll();

    return matches;
  }
}
