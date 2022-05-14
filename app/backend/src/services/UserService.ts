import { UserModelInterface, UserRepo } from '../interfaces/user';

export default class UserService {
  protected userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  public async findByEmail(
    email: UserModelInterface['email'],
  ): Promise<UserModelInterface | null> {
    const user = await this.userRepo.findOne({ email });

    return user;
  }
}
