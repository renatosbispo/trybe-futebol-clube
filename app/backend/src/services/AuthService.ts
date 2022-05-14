import jwt, { SignOptions } from 'jsonwebtoken';
import { UserModelInterface, UserRepo } from '../interfaces/user';
import TokenPayloadInterface from '../interfaces/auth/TokenPayload.interface';
import ErrorWithCode from '../lib/error-with-code';

export default class AuthService {
  protected jwtSecret: string;

  protected userRepo: UserRepo;

  constructor(userRepo: UserRepo, jwtSecret: string) {
    this.jwtSecret = jwtSecret;
    this.userRepo = userRepo;
  }

  public generateToken(payload: TokenPayloadInterface): string {
    const jwtConfig: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '12h',
    };

    const token = jwt.sign(payload, this.jwtSecret, jwtConfig);

    return token;
  }

  public async verifyCredentials(
    email: UserModelInterface['email'],
    password: UserModelInterface['password'],
  ): Promise<void> {
    const user = await this.userRepo.findOne({ email });

    if (!user || user.password !== password) {
      throw new ErrorWithCode(
        'UNAUTHORIZED_OPERATION',
        'Incorrect email or password',
      );
    }
  }

  public verifyToken(token: string | undefined): TokenPayloadInterface {
    if (!token) {
      throw new ErrorWithCode('TOKEN_NOT_FOUND', 'Token not found');
    }

    try {
      const payload = jwt.verify(token, this.jwtSecret);

      return payload as TokenPayloadInterface;
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new ErrorWithCode(
          'TOKEN_EXPIRED_OR_INVALID',
          'Expired token',
        );
      }

      throw new ErrorWithCode(
        'TOKEN_EXPIRED_OR_INVALID',
        'Invalid token',
      );
    }
  }
}
