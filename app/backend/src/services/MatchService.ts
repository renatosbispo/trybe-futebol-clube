import { MatchModelInterface, MatchRepoInterface } from '../interfaces/match';

export default class MatchService {
  protected matchRepo: MatchRepoInterface;

  constructor(matchRepo: MatchRepoInterface) {
    this.matchRepo = matchRepo;
  }

  public async findAll(
    inProgress: string | undefined,
  ): Promise<MatchModelInterface[]> {
    const matches = await this.matchRepo.findAll();

    if (typeof inProgress !== 'undefined') {
      return matches.filter(
        (match) => {
          const isMatchInProgress = match.inProgress === 1;
          const parsedInProgress = inProgress === 'true';

          return isMatchInProgress === parsedInProgress;
        },
      );
    }

    return matches;
  }
}
