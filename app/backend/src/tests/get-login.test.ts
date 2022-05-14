import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import UserModel from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /login/validate', () => {
  let response: Response;

  const user = {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  };

  describe('If the request header contains a valid token', () => {
    let validToken: string;

    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(user as UserModel);

      response = await chai
      .request(app)
      .post('/login')
        .send({ email: user.email, password: user.password });

      validToken = response.body.token;
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    beforeEach(async () => {
      response = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', validToken)
        .send();
    });

    it('The response status code should be 200', async () => {
      expect(response.status).to.equal(200);
    });

    it('The response body should be a string', async () => {
      expect(response.body).to.be.a('string');
    });

    it('The response body should contain the user role', async () => {
      expect(response.body).to.be.equal(user.role);
    });
  });
});
