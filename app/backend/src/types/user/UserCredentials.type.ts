import { UserModelInterface } from '../../interfaces/user';

type UserCredentialsType = Pick<UserModelInterface, 'email' | 'password'>;

export default UserCredentialsType;
