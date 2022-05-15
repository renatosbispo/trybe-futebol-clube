import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  let response: Response;

  const matches = [
    {
      id: 41,
      homeTeam: 'São Paulo',
      homeTeamGoals: '2',
      awayTeam: 'Internacional',
      awayTeamGoals: '0',
      inProgress: 1,
      teamHome: {
        teamName: 'São Paulo',
      },
      teamAway: {
        teamName: 'Internacional',
      },
    },
    {
      id: 42,
      homeTeam: 'Ferroviária',
      homeTeamGoals: '1',
      awayTeam: 'Avaí/Kindermann',
      awayTeamGoals: '0',
      inProgress: 1,
      teamHome: {
        teamName: 'Ferroviária',
      },
      teamAway: {
        teamName: 'Avaí/Kindermann',
      },
    },
    {
      id: 43,
      homeTeam: 'Napoli-SC',
      homeTeamGoals: '0',
      awayTeam: 'Minas Brasília',
      awayTeamGoals: '0',
      inProgress: 1,
      teamHome: {
        teamName: 'Napoli-SC',
      },
      teamAway: {
        teamName: 'Minas Brasília',
      },
    },
  ];

  before(async () => {
    sinon
      .stub(MatchModel, 'findAll')
      .resolves(matches as unknown as MatchModel[]);
  });

  after(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  });

  beforeEach(async () => {
    response = await chai.request(app).get('/matches');
  });

  it('The response status code should be 200', () => {
    expect(response.status).to.be.equal(200);
  });

  it('The response body should be an array', () => {
    expect(response.body).to.be.an('array');
  });

  it('The response body should contain a list of all matches', () => {
    expect(response.body).to.be.deep.equal(matches);
  });
});
