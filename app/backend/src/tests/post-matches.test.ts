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

  const matchFromDb = {
    id: 1,
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  const matchWithInexistentAwayTeam = {
    homeTeam: 16,
    awayTeam: 12345,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  const matchWithInexistentHomeTeam = {
    homeTeam: 12345,
    awayTeam: 16,
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

  const validMatch = {
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
          .send(validMatch);
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

      it('The response body should contain an error message', () => {
        expect(response.body).to.be.deep.equal({
          message: 'It is not possible to create a match with two equal teams',
        });
      });
    });

    describe('If the request body contains inexistent awayTeam or homeTeam', () => {
      let responseInexistentAwayTeam: Response;
      let responseInexistentHomeTeam: Response;

      beforeEach(async () => {
        responseInexistentAwayTeam = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', token)
        .send(matchWithInexistentAwayTeam);

        responseInexistentHomeTeam = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', token)
          .send(matchWithInexistentHomeTeam);
      });

      it('The response status code should be 404', () => {
        expect(responseInexistentAwayTeam.status).to.be.equal(404);
        expect(responseInexistentHomeTeam.status).to.be.equal(404);
      });

      it('The response body should be an object', () => {
        expect(responseInexistentAwayTeam.body).to.be.an('object');
        expect(responseInexistentHomeTeam.body).to.be.an('object');
      });

      it('The response body should contain an error message', () => {
        expect(responseInexistentAwayTeam.body).to.be.deep.equal({
          message: 'There is no team with such id!',
        });

        expect(responseInexistentHomeTeam.body).to.be.deep.equal({
          message: 'There is no team with such id!',
        });
      });
    });
  });
});
