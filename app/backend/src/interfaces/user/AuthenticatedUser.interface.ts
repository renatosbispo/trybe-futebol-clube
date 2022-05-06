import UserModelInterface from './UserModel.interface';

export default interface AuthenticatedUserInterface {
  user: Omit<UserModelInterface, 'password'>;
  token: string;
}
