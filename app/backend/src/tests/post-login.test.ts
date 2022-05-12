import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
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

    it('The response body should be an object and contain the user data', async () => {
      const { password, ...existingUserWithoutPassword } = existingUser;

      expect(response.body.user).to.be.an('object');
      expect(response.body.user).to.be.deep.equal(existingUserWithoutPassword);
    });
  });
});
