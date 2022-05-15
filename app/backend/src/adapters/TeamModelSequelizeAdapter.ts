import TeamModel from '../database/models/TeamModel';
import { TeamModelInterface, TeamRepoInterface } from '../interfaces/team';

export default class TeamModelSequelizeAdapter implements TeamRepoInterface {
  protected _TeamModel: typeof TeamModel;

  constructor() {
    this._TeamModel = TeamModel;
  }

  public async findAll(): Promise<TeamModelInterface[]> {
    const teams = await this._TeamModel.findAll();

    return teams;
  }
}
