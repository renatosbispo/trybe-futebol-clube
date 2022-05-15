import { UserModelInterface, UserRepoInterface } from '../interfaces/user';

export default class UserService {
  protected userRepo: UserRepoInterface;

  constructor(userRepo: UserRepoInterface) {
    this.userRepo = userRepo;
  }

  public async findByEmail(
    email: UserModelInterface['email'],
  ): Promise<UserModelInterface | null> {
    const user = await this.userRepo.findOne({ email });

    return user;
  }
}
