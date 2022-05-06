import { Request, Response, NextFunction } from 'express';

export default class LoginController {
  public async login(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    res.status(200).end();
  }
}
