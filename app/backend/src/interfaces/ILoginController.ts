import { RequestHandler } from 'express';

export default interface ILoginController {
  login: RequestHandler;
}
