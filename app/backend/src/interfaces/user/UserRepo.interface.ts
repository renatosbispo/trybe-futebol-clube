import UserModelInterface from './UserModel.interface';

export default interface UserRepo {
  findOne(criteria: Partial<UserModelInterface>): Promise<UserModelInterface | null>;
}
