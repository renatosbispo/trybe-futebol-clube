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

  const user = {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  };

  describe('If the request body contains the correct email and password of an existing user', () => {
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(user as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    beforeEach(async () => {
      response = await chai
        .request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });
    });

    it('The response status code should be 200', async () => {
      expect(response.status).to.equal(200);
    });

    it('The response body should be an object', async () => {
      expect(response.body).to.be.an('object');
    });

    it('The response body should contain the user data and a valid JWT token', async () => {
      const { password, ...userWithoutPassword } = user;
      const token = response.body.token;
      const secret = fs.readFileSync('jwt.evaluation.key', {
        encoding: 'utf-8',
      });

      expect(response.body.user).to.be.deep.equal(userWithoutPassword);
      expect(token).to.be.a('string');
      expect(() => jwt.verify(token, secret)).to.not.throw();
    });
  });

  describe('If the request body contains the incorrect password of an existing user', () => {
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(user as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    beforeEach(async () => {
      response = await chai
        .request(app)
        .post('/login')
        .send({
          email: user.email,
          password: `wrong${user.password}`,
        });
    });

    it('The response status code should be 401', async () => {
      expect(response.status).to.equal(401);
    });

    it('The response body should be an object', async () => {
      expect(response.body).to.be.an('object');
    });

    it('The response body should contain the message "Incorrect email or password"', async () => {
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('If the request body contains the email of a non-existing user', () => {
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    beforeEach(async () => {
      response = await chai
        .request(app)
        .post('/login')
        .send({
          email: user.email,
          password: user.password,
        });
    });

    it('The response status code should be 401', async () => {
      expect(response.status).to.equal(401);
    });

    it('The response body should be an object', async () => {
      expect(response.body).to.be.an('object');
    });

    it('The response body should contain the message "Incorrect email or password"', async () => {
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });
  });
});
