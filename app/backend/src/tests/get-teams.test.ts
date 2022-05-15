import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  let response: Response;

  const teams = [
    {
      id: 1,
      teamName: 'Avaí/Kindermann',
    },
    {
      id: 2,
      teamName: 'Bahia',
    },
    {
      id: 3,
      teamName: 'Botafogo',
    },
    {
      id: 4,
      teamName: 'Corinthians',
    },
    {
      id: 5,
      teamName: 'Cruzeiro',
    },
    {
      id: 6,
      teamName: 'Ferroviária',
    },
    {
      id: 7,
      teamName: 'Flamengo',
    },
    {
      id: 8,
      teamName: 'Grêmio',
    },
    {
      id: 9,
      teamName: 'Internacional',
    },
    {
      id: 10,
      teamName: 'Minas Brasília',
    },
    {
      id: 11,
      teamName: 'Napoli-SC',
    },
    {
      id: 12,
      teamName: 'Palmeiras',
    },
    {
      id: 13,
      teamName: 'Real Brasília',
    },
    {
      id: 14,
      teamName: 'Santos',
    },
    {
      id: 15,
      teamName: 'São José-SP',
    },
    {
      id: 16,
      teamName: 'São Paulo',
    },
  ];

  before(async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
  });

  after(() => {
    (TeamModel.findAll as sinon.SinonStub).restore();
  });

  beforeEach(async () => {
    response = await chai.request(app).get('/teams');
  });

  it('The response status code should be 200', () => {
    expect(response.status).to.be.equal(200);
  });

  it('The response body should an array', () => {
    expect(response.body).to.be.an('array');
  });

  it('The response body should contain a list of all teams', () => {
    expect(response.body).to.be.deep.equal(teams);
  });
});
