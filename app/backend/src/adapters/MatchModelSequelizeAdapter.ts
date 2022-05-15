import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { MatchModelInterface, MatchRepoInterface } from '../interfaces/match';

export default class MatchModelSequelizeAdapter implements MatchRepoInterface {
  protected _MatchModel: typeof MatchModel;

  constructor() {
    this._MatchModel = MatchModel;
  }

  public async create(
    data: Omit<MatchModelInterface, 'id'>,
  ): Promise<MatchModelInterface> {
    const { id } = await this._MatchModel.create(data);

    return { id, ...data };
  }

  public async findAll(): Promise<MatchModelInterface[]> {
    const matches = await this._MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }
}
