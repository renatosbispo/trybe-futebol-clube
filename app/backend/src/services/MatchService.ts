import ErrorWithCode from '../lib/error-with-code';
import { MatchModelInterface, MatchRepoInterface } from '../interfaces/match';
import { TeamRepoInterface } from '../interfaces/team';

export default class MatchService {
  protected matchRepo: MatchRepoInterface;

  protected teamRepo: TeamRepoInterface;

  constructor(matchRepo: MatchRepoInterface, teamRepo: TeamRepoInterface) {
    this.matchRepo = matchRepo;
    this.teamRepo = teamRepo;
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

    const awayTeam = await this.teamRepo.findById(data.awayTeam);
    const homeTeam = await this.teamRepo.findById(data.homeTeam);

    if (!awayTeam || !homeTeam) {
      throw new ErrorWithCode(
        'ENTITY_NOT_FOUND',
        'There is no team with such id!',
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
