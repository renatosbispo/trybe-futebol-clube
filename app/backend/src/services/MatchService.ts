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
          const parsedInProgress = inProgress === 'true';
          const inProgressFromDb = Boolean(match.inProgress);

          return inProgressFromDb === parsedInProgress;
        },
      );
    }

    return matches;
  }
}
