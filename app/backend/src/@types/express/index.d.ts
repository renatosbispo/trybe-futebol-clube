import TokenPayloadInterface from './interfaces/auth/TokenPayload.interface';

// Taken from: https://stackoverflow.com/a/58788706/17501748
declare global {
  declare namespace Express {
    interface Request {
      tokenPayload: TokenPayloadInterface;
    }
  }
}
