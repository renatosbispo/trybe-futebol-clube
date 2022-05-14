import UserModel from '../database/models/UserModel';
import { UserModelInterface, UserRepo } from '../interfaces/user';

export default class UserModelSequelizeAdapter implements UserRepo {
  protected _UserModel: typeof UserModel;

  constructor() {
    this._UserModel = UserModel;
  }

  public async findOne(
    criteria: Partial<UserModelInterface>,
  ): Promise<UserModelInterface | null> {
    const user = await this._UserModel.findOne({ where: { ...criteria } });

    return user;
  }
}
