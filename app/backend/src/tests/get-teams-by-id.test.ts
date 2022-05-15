import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams/:id', () => {
  let response: Response;

  const team = {
    id: 16,
    teamName: 'São Paulo',
  };

  before(async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(team as TeamModel);
  });

  after(() => {
    (TeamModel.findByPk as sinon.SinonStub).restore();
  });

  beforeEach(async () => {
    response = await chai.request(app).get('/teams/16');
  });

  it('The response status code should be 200', () => {
    expect(response.status).to.be.equal(200);
  });

  it('The response body should be an object', () => {
    expect(response.body).to.be.an('object');
  });

  it('The response body should contain the data about the requested team', () => {
    expect(response.body).to.be.deep.equal(team);
  });
});
