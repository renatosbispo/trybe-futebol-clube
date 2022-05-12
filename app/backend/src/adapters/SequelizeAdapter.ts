import UserModel from '../database/models/UserModel';
import { UserModelInterface, UserRepo } from '../interfaces/user';

export default class SequelizeAdapter implements UserRepo {
  public findOne = async (
    criteria: Partial<UserModelInterface>,
  ): Promise<UserModelInterface | null> => {
    const user = await UserModel.findOne({ where: { ...criteria } });

    return user;
  };
}
