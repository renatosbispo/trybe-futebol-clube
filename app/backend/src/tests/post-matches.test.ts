import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /matches', () => {
  let response: Response;

  let token: string;

  const validMatchFromReq = {
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  const matchWithSameHomeAndAwayTeams = {
    homeTeam: 16,
    awayTeam: 16,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  const matchFromDb = {
    id: 1,
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  before(async () => {
    sinon
      .stub(MatchModel, 'create')
      .resolves(matchFromDb as unknown as MatchModel);

    const loginResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user@user.com', password: 'secret_user' });

    token = loginResponse.body.token;
  });

  after(() => {
    (MatchModel.create as sinon.SinonStub).restore();
  });

  describe('If the header contains a valid JWT token', () => {
    describe('If the request body contains proper match data', () => {
      beforeEach(async () => {
        response = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', token)
          .send(validMatchFromReq);
      });

      it('The response status code should be 201', () => {
        expect(response.status).to.be.equal(201);
      });

      it('The response body should be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('The response body should contain the data from the match created', () => {
        expect(response.body).to.be.deep.equal(matchFromDb);
      });
    });

    describe('If the request body contains awayTeam and homeTeam with same values', () => {
      beforeEach(async () => {
        response = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', token)
          .send(matchWithSameHomeAndAwayTeams);
      });

      it('The response status code should be 401', () => {
        expect(response.status).to.be.equal(401);
      });

      it('The response body should be an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('The response body should contain the data from the match created', () => {
        expect(response.body).to.be.deep.equal({
          message: 'It is not possible to create a match with two equal teams',
        });
      });
    });
  });
});
