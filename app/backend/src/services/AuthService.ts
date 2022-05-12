import { UserModelInterface, UserRepo } from '../interfaces/user';

export default class AuthService {
  protected userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  public async verifyCredentials(
    email: UserModelInterface['email'],
    password: UserModelInterface['password'],
  ): Promise<void> {
    const user = await this.userRepo.findOne({ email });

    if (!user || user.password !== password) {
      throw new Error('Incorrect email or password');
    }
  }
}
