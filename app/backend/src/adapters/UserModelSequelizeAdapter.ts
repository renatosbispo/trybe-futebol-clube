import UserModel from '../database/models/UserModel';
import { UserModelInterface, UserRepoInterface } from '../interfaces/user';

export default class UserModelSequelizeAdapter implements UserRepoInterface {
  protected _UserModel: typeof UserModel;

  constructor() {
    this._UserModel = UserModel;
  }

  public async findOne(
    criteria: Partial<UserModelInterface>,
  ): Promise<UserModelInterface | null> {
    const user = await this._UserModel.findOne({
      where: { ...criteria },
      raw: true,
    });

    return user;
  }
}
