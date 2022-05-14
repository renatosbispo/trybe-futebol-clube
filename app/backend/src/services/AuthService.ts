import jwt, { SignOptions } from 'jsonwebtoken';
import { UserModelInterface, UserRepo } from '../interfaces/user';
import TokenPayloadInterface from '../interfaces/auth/TokenPayload.interface';

export default class AuthService {
  protected jwtSecret: string;

  protected userRepo: UserRepo;

  constructor(userRepo: UserRepo, jwtSecret: string) {
    this.jwtSecret = jwtSecret;
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

  public generateToken(payload: TokenPayloadInterface): string {
    const jwtConfig: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '12h',
    };

    const token = jwt.sign(payload, this.jwtSecret, jwtConfig);

    return token;
  }
}
