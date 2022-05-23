import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('PATCH /matches', () => {
  let response: Response;

  let token: string;

  const matchFromDb = {
    id: 1,
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  const validMatch = {
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  const updatedMatch = {
    ...validMatch,
    homeTeamGoals: 4,
    awayTeamGoals: 5,
  };

  before(async () => {
    sinon
      .stub(MatchModel, 'create')
      .resolves(matchFromDb as unknown as MatchModel);

    sinon.stub(MatchModel, 'update').resolves(undefined);

    const loginResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user@user.com', password: 'secret_user' });

    token = loginResponse.body.token;

    await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(validMatch);
  });

  after(() => {
    (MatchModel.create as sinon.SinonStub).restore();
    (MatchModel.update as sinon.SinonStub).restore();
  });

  describe('/matches/:id with content in request body', () => {
    before(async () => {
      response = await chai.request(app).patch('/matches/1').send(updatedMatch);
    });

    it('The response status code should be 200', () => {
      expect(response.status).to.be.equal(200);
    });
  });

  describe('/matches/:id without content in request body', () => {
    before(async () => {
      response = await chai.request(app).patch('/matches/1');
    });

    it('The response status code should be 200', () => {
      expect(response.status).to.be.equal(200);
    });
  });

  describe('/matches/:id/finish', () => {
    before(async () => {
      response = await chai.request(app).patch('/matches/1/finish');
    });

    it('The response status code should be 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('The response body should be an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('The response body should contain a success message', () => {
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });
});
