import UserModelInterface from './UserModel.interface';

export default interface UserRepoInterface {
  findOne(criteria: Partial<UserModelInterface>): Promise<UserModelInterface | null>;
}
