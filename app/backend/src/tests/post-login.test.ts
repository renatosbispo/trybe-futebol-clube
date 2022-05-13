import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import UserModel from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  let response: Response;

  const existingUser = {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  };

  before(async () => {
    sinon.stub(UserModel, 'findOne').resolves(existingUser as UserModel);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  describe('If the request body contains the correct email and password of an existing user', () => {
    beforeEach(async () => {
      response = await chai
        .request(app)
        .post('/login')
        .send({ email: existingUser.email, password: existingUser.password });
    });

    it('The response status code should be 200', async () => {
      expect(response.status).to.equal(200);
    });

    it('The response body should be an object', async () => {
      expect(response.body).to.be.an('object');
    });

    it('The response body should contain the user data and a valid JWT token', async () => {
      const { password, ...existingUserWithoutPassword } = existingUser;
      const token = response.body.token;
      const secret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

      expect(response.body.user).to.be.deep.equal(existingUserWithoutPassword);
      expect(token).to.be.a('string');
      expect(() => jwt.verify(token, secret)).to.not.throw();
    });
  });
});
