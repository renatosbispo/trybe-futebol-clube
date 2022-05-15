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
    },
    {
      id: 42,
      homeTeam: 'Ferroviária',
      homeTeamGoals: '1',
      awayTeam: 'Avaí/Kindermann',
      awayTeamGoals: '0',
      inProgress: 1,
    },
    {
      id: 43,
      homeTeam: 'Napoli-SC',
      homeTeamGoals: '0',
      awayTeam: 'Minas Brasília',
      awayTeamGoals: '0',
      inProgress: 1,
    },
    {
      id: 44,
      homeTeam: 'Flamengo',
      homeTeamGoals: '2',
      awayTeam: 'São José-SP',
      awayTeamGoals: '2',
      inProgress: 1,
    },
    {
      id: 45,
      homeTeam: 'Cruzeiro',
      homeTeamGoals: '1',
      awayTeam: 'Botafogo',
      awayTeamGoals: '1',
      inProgress: 1,
    },
    {
      id: 46,
      homeTeam: 'Corinthians',
      homeTeamGoals: '1',
      awayTeam: 'Palmeiras',
      awayTeamGoals: '1',
      inProgress: 1,
    },
    {
      id: 47,
      homeTeam: 'Grêmio',
      homeTeamGoals: '1',
      awayTeam: 'Santos',
      awayTeamGoals: '2',
      inProgress: 1,
    },
    {
      id: 48,
      homeTeam: 'Real Brasília',
      homeTeamGoals: '1',
      awayTeam: 'Bahia',
      awayTeamGoals: '1',
      inProgress: 1,
    },
    {
      id: 1,
      homeTeam: 'São Paulo',
      homeTeamGoals: '1',
      awayTeam: 'Grêmio',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 2,
      homeTeam: 'Internacional',
      homeTeamGoals: '1',
      awayTeam: 'Santos',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 3,
      homeTeam: 'Corinthians',
      homeTeamGoals: '3',
      awayTeam: 'Napoli-SC',
      awayTeamGoals: '0',
      inProgress: 0,
    },
    {
      id: 4,
      homeTeam: 'Botafogo',
      homeTeamGoals: '0',
      awayTeam: 'Bahia',
      awayTeamGoals: '0',
      inProgress: 0,
    },
    {
      id: 5,
      homeTeam: 'Flamengo',
      homeTeamGoals: '1',
      awayTeam: 'Minas Brasília',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 6,
      homeTeam: 'Cruzeiro',
      homeTeamGoals: '1',
      awayTeam: 'Real Brasília',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 7,
      homeTeam: 'Palmeiras',
      homeTeamGoals: '2',
      awayTeam: 'Ferroviária',
      awayTeamGoals: '2',
      inProgress: 0,
    },
    {
      id: 8,
      homeTeam: 'São José-SP',
      homeTeamGoals: '0',
      awayTeam: 'Avaí/Kindermann',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 9,
      homeTeam: 'Avaí/Kindermann',
      homeTeamGoals: '0',
      awayTeam: 'Palmeiras',
      awayTeamGoals: '3',
      inProgress: 0,
    },
    {
      id: 10,
      homeTeam: 'Bahia',
      homeTeamGoals: '0',
      awayTeam: 'Internacional',
      awayTeamGoals: '2',
      inProgress: 0,
    },
    {
      id: 11,
      homeTeam: 'Real Brasília',
      homeTeamGoals: '1',
      awayTeam: 'Botafogo',
      awayTeamGoals: '0',
      inProgress: 0,
    },
    {
      id: 12,
      homeTeam: 'Ferroviária',
      homeTeamGoals: '0',
      awayTeam: 'Corinthians',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 13,
      homeTeam: 'Grêmio',
      homeTeamGoals: '2',
      awayTeam: 'Cruzeiro',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 14,
      homeTeam: 'Santos',
      homeTeamGoals: '2',
      awayTeam: 'São Paulo',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 15,
      homeTeam: 'Minas Brasília',
      homeTeamGoals: '0',
      awayTeam: 'São José-SP',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 16,
      homeTeam: 'Napoli-SC',
      homeTeamGoals: '0',
      awayTeam: 'Flamengo',
      awayTeamGoals: '0',
      inProgress: 0,
    },
    {
      id: 17,
      homeTeam: 'Avaí/Kindermann',
      homeTeamGoals: '2',
      awayTeam: 'Grêmio',
      awayTeamGoals: '3',
      inProgress: 0,
    },
    {
      id: 18,
      homeTeam: 'Palmeiras',
      homeTeamGoals: '4',
      awayTeam: 'Cruzeiro',
      awayTeamGoals: '2',
      inProgress: 0,
    },
    {
      id: 19,
      homeTeam: 'Napoli-SC',
      homeTeamGoals: '2',
      awayTeam: 'Bahia',
      awayTeamGoals: '2',
      inProgress: 0,
    },
    {
      id: 20,
      homeTeam: 'Flamengo',
      homeTeamGoals: '0',
      awayTeam: 'Internacional',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 21,
      homeTeam: 'Ferroviária',
      homeTeamGoals: '3',
      awayTeam: 'Real Brasília',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 22,
      homeTeam: 'Corinthians',
      homeTeamGoals: '3',
      awayTeam: 'Botafogo',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 23,
      homeTeam: 'São José-SP',
      homeTeamGoals: '2',
      awayTeam: 'São Paulo',
      awayTeamGoals: '3',
      inProgress: 0,
    },
    {
      id: 24,
      homeTeam: 'Minas Brasília',
      homeTeamGoals: '2',
      awayTeam: 'Santos',
      awayTeamGoals: '2',
      inProgress: 0,
    },
    {
      id: 25,
      homeTeam: 'Bahia',
      homeTeamGoals: '0',
      awayTeam: 'Ferroviária',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 26,
      homeTeam: 'Real Brasília',
      homeTeamGoals: '1',
      awayTeam: 'Avaí/Kindermann',
      awayTeamGoals: '0',
      inProgress: 0,
    },
    {
      id: 27,
      homeTeam: 'Cruzeiro',
      homeTeamGoals: '1',
      awayTeam: 'São José-SP',
      awayTeamGoals: '2',
      inProgress: 0,
    },
    {
      id: 28,
      homeTeam: 'São Paulo',
      homeTeamGoals: '3',
      awayTeam: 'Flamengo',
      awayTeamGoals: '0',
      inProgress: 0,
    },
    {
      id: 29,
      homeTeam: 'Internacional',
      homeTeamGoals: '0',
      awayTeam: 'Corinthians',
      awayTeamGoals: '4',
      inProgress: 0,
    },
    {
      id: 30,
      homeTeam: 'Botafogo',
      homeTeamGoals: '0',
      awayTeam: 'Palmeiras',
      awayTeamGoals: '4',
      inProgress: 0,
    },
    {
      id: 31,
      homeTeam: 'Grêmio',
      homeTeamGoals: '2',
      awayTeam: 'Minas Brasília',
      awayTeamGoals: '0',
      inProgress: 0,
    },
    {
      id: 32,
      homeTeam: 'Santos',
      homeTeamGoals: '5',
      awayTeam: 'Napoli-SC',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 33,
      homeTeam: 'Avaí/Kindermann',
      homeTeamGoals: '1',
      awayTeam: 'São Paulo',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 34,
      homeTeam: 'Internacional',
      homeTeamGoals: '3',
      awayTeam: 'Ferroviária',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 35,
      homeTeam: 'Minas Brasília',
      homeTeamGoals: '1',
      awayTeam: 'Cruzeiro',
      awayTeamGoals: '3',
      inProgress: 0,
    },
    {
      id: 36,
      homeTeam: 'Bahia',
      homeTeamGoals: '0',
      awayTeam: 'Flamengo',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 37,
      homeTeam: 'São José-SP',
      homeTeamGoals: '0',
      awayTeam: 'Real Brasília',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 38,
      homeTeam: 'Santos',
      homeTeamGoals: '2',
      awayTeam: 'Corinthians',
      awayTeamGoals: '1',
      inProgress: 0,
    },
    {
      id: 39,
      homeTeam: 'Botafogo',
      homeTeamGoals: '2',
      awayTeam: 'Napoli-SC',
      awayTeamGoals: '0',
      inProgress: 0,
    },
    {
      id: 40,
      homeTeam: 'Palmeiras',
      homeTeamGoals: '4',
      awayTeam: 'Grêmio',
      awayTeamGoals: '1',
      inProgress: 0,
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
