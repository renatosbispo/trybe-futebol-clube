import ErrorWithCode from '../lib/error-with-code';
import { MatchModelInterface, MatchRepoInterface } from '../interfaces/match';

export default class MatchService {
  protected matchRepo: MatchRepoInterface;

  constructor(matchRepo: MatchRepoInterface) {
    this.matchRepo = matchRepo;
  }

  public async create(
    data: Omit<MatchModelInterface, 'id'>,
  ): Promise<MatchModelInterface> {
    if (data.awayTeam === data.homeTeam) {
      throw new ErrorWithCode(
        'UNAUTHORIZED_OPERATION',
        'It is not possible to create a match with two equal teams',
      );
    }

    const newMatch = await this.matchRepo.create(data);

    return newMatch;
  }

  public async findAll(
    inProgress: string | undefined,
  ): Promise<MatchModelInterface[]> {
    const matches = await this.matchRepo.findAll();

    if (typeof inProgress !== 'undefined') {
      return matches.filter((match) => {
        const parsedInProgress = inProgress === 'true';
        const inProgressFromDb = Boolean(match.inProgress);

        return inProgressFromDb === parsedInProgress;
      });
    }

    return matches;
  }
}
