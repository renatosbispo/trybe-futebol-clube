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

  const userCredentials = {
    email: 'user@user.com',
    password: 'secret_user',
  };

  describe('If the request body contains the correct email and password of an existing user', () => {
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(user as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    beforeEach(async () => {
      response = await chai.request(app).post('/login').send(userCredentials);
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
          email: userCredentials.email,
          password: `wrong${userCredentials.password}`,
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
        .send(userCredentials);
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

  describe('If the request body is missing the email or the password', () => {
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(user as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    let responseWithoutEmail: Response;
    let responseWithoutPassword: Response;

    beforeEach(async () => {
      responseWithoutEmail = await chai.request(app).post('/login').send({
        password: userCredentials.password,
      });

      responseWithoutPassword = await chai.request(app).post('/login').send({
        email: userCredentials.email,
      });
    });

    it('The response status code should be 400', async () => {
      expect(responseWithoutEmail.status).to.equal(400);
      expect(responseWithoutPassword.status).to.equal(400);
    });

    it('The response body should be an object', async () => {
      expect(response.body).to.be.an('object');
    });

    it('The response body should contain the message "All fields must be filled"', async () => {
      expect(responseWithoutEmail.body.message).to.equal(
        'All fields must be filled'
      );
      expect(responseWithoutPassword.body.message).to.equal(
        'All fields must be filled'
      );
    });
  });
});
