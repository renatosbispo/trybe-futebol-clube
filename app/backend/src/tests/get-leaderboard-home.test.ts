import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard/home', () => {
  let response: Response;

  const expectedLedearboard = [
    {
      name: 'Santos',
      totalPoints: 9,
      totalGames: 3,
      totalVictories: 3,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 9,
      goalsOwn: 3,
      goalsBalance: 6,
      efficiency: 100,
    },
    {
      name: 'Palmeiras',
      totalPoints: 7,
      totalGames: 3,
      totalVictories: 2,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 10,
      goalsOwn: 5,
      goalsBalance: 5,
      efficiency: 77.78,
    },
    {
      name: 'Corinthians',
      totalPoints: 6,
      totalGames: 2,
      totalVictories: 2,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 6,
      goalsOwn: 1,
      goalsBalance: 5,
      efficiency: 100,
    },
    {
      name: 'Grêmio',
      totalPoints: 6,
      totalGames: 2,
      totalVictories: 2,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 4,
      goalsOwn: 1,
      goalsBalance: 3,
      efficiency: 100,
    },
    {
      name: 'Real Brasília',
      totalPoints: 6,
      totalGames: 2,
      totalVictories: 2,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 2,
      goalsOwn: 0,
      goalsBalance: 2,
      efficiency: 100,
    },
    {
      name: 'São Paulo',
      totalPoints: 4,
      totalGames: 2,
      totalVictories: 1,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 4,
      goalsOwn: 1,
      goalsBalance: 3,
      efficiency: 66.67,
    },
    {
      name: 'Internacional',
      totalPoints: 4,
      totalGames: 3,
      totalVictories: 1,
      totalDraws: 1,
      totalLosses: 1,
      goalsFavor: 4,
      goalsOwn: 6,
      goalsBalance: -2,
      efficiency: 44.44,
    },
    {
      name: 'Botafogo',
      totalPoints: 4,
      totalGames: 3,
      totalVictories: 1,
      totalDraws: 1,
      totalLosses: 1,
      goalsFavor: 2,
      goalsOwn: 4,
      goalsBalance: -2,
      efficiency: 44.44,
    },
    {
      name: 'Ferroviária',
      totalPoints: 3,
      totalGames: 2,
      totalVictories: 1,
      totalDraws: 0,
      totalLosses: 1,
      goalsFavor: 3,
      goalsOwn: 2,
      goalsBalance: 1,
      efficiency: 50,
    },
    {
      name: 'Napoli-SC',
      totalPoints: 2,
      totalGames: 2,
      totalVictories: 0,
      totalDraws: 2,
      totalLosses: 0,
      goalsFavor: 2,
      goalsOwn: 2,
      goalsBalance: 0,
      efficiency: 33.33,
    },
    {
      name: 'Cruzeiro',
      totalPoints: 1,
      totalGames: 2,
      totalVictories: 0,
      totalDraws: 1,
      totalLosses: 1,
      goalsFavor: 2,
      goalsOwn: 3,
      goalsBalance: -1,
      efficiency: 16.67,
    },
    {
      name: 'Flamengo',
      totalPoints: 1,
      totalGames: 2,
      totalVictories: 0,
      totalDraws: 1,
      totalLosses: 1,
      goalsFavor: 1,
      goalsOwn: 2,
      goalsBalance: -1,
      efficiency: 16.67,
    },
    {
      name: 'Minas Brasília',
      totalPoints: 1,
      totalGames: 3,
      totalVictories: 0,
      totalDraws: 1,
      totalLosses: 2,
      goalsFavor: 3,
      goalsOwn: 6,
      goalsBalance: -3,
      efficiency: 11.11,
    },
    {
      name: 'Avaí/Kindermann',
      totalPoints: 1,
      totalGames: 3,
      totalVictories: 0,
      totalDraws: 1,
      totalLosses: 2,
      goalsFavor: 3,
      goalsOwn: 7,
      goalsBalance: -4,
      efficiency: 11.11,
    },
    {
      name: 'São José-SP',
      totalPoints: 0,
      totalGames: 3,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 3,
      goalsFavor: 2,
      goalsOwn: 5,
      goalsBalance: -3,
      efficiency: 0,
    },
    {
      name: 'Bahia',
      totalPoints: 0,
      totalGames: 3,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 3,
      goalsFavor: 0,
      goalsOwn: 4,
      goalsBalance: -4,
      efficiency: 0,
    },
  ];

  const allMatches = [
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: 1,
    },
    {
      id: 42,
      homeTeam: 6,
      homeTeamGoals: 1,
      awayTeam: 1,
      awayTeamGoals: 0,
      inProgress: 1,
    },
    {
      id: 43,
      homeTeam: 11,
      homeTeamGoals: 0,
      awayTeam: 10,
      awayTeamGoals: 0,
      inProgress: 1,
    },
    {
      id: 44,
      homeTeam: 7,
      homeTeamGoals: 2,
      awayTeam: 15,
      awayTeamGoals: 2,
      inProgress: 1,
    },
    {
      id: 45,
      homeTeam: 5,
      homeTeamGoals: 1,
      awayTeam: 3,
      awayTeamGoals: 1,
      inProgress: 1,
    },
    {
      id: 46,
      homeTeam: 4,
      homeTeamGoals: 1,
      awayTeam: 12,
      awayTeamGoals: 1,
      inProgress: 1,
    },
    {
      id: 47,
      homeTeam: 8,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 2,
      inProgress: 1,
    },
    {
      id: 48,
      homeTeam: 13,
      homeTeamGoals: 1,
      awayTeam: 2,
      awayTeamGoals: 1,
      inProgress: 1,
    },
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 2,
      homeTeam: 9,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 3,
      homeTeam: 4,
      homeTeamGoals: 3,
      awayTeam: 11,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 4,
      homeTeam: 3,
      homeTeamGoals: 0,
      awayTeam: 2,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 5,
      homeTeam: 7,
      homeTeamGoals: 1,
      awayTeam: 10,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 6,
      homeTeam: 5,
      homeTeamGoals: 1,
      awayTeam: 13,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 7,
      homeTeam: 12,
      homeTeamGoals: 2,
      awayTeam: 6,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 8,
      homeTeam: 15,
      homeTeamGoals: 0,
      awayTeam: 1,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 9,
      homeTeam: 1,
      homeTeamGoals: 0,
      awayTeam: 12,
      awayTeamGoals: 3,
      inProgress: 0,
    },
    {
      id: 10,
      homeTeam: 2,
      homeTeamGoals: 0,
      awayTeam: 9,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 11,
      homeTeam: 13,
      homeTeamGoals: 1,
      awayTeam: 3,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 12,
      homeTeam: 6,
      homeTeamGoals: 0,
      awayTeam: 4,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 13,
      homeTeam: 8,
      homeTeamGoals: 2,
      awayTeam: 5,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 14,
      homeTeam: 14,
      homeTeamGoals: 2,
      awayTeam: 16,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 15,
      homeTeam: 10,
      homeTeamGoals: 0,
      awayTeam: 15,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 16,
      homeTeam: 11,
      homeTeamGoals: 0,
      awayTeam: 7,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 17,
      homeTeam: 1,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 3,
      inProgress: 0,
    },
    {
      id: 18,
      homeTeam: 12,
      homeTeamGoals: 4,
      awayTeam: 5,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 19,
      homeTeam: 11,
      homeTeamGoals: 2,
      awayTeam: 2,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 20,
      homeTeam: 7,
      homeTeamGoals: 0,
      awayTeam: 9,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 21,
      homeTeam: 6,
      homeTeamGoals: 3,
      awayTeam: 13,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 22,
      homeTeam: 4,
      homeTeamGoals: 3,
      awayTeam: 3,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 23,
      homeTeam: 15,
      homeTeamGoals: 2,
      awayTeam: 16,
      awayTeamGoals: 3,
      inProgress: 0,
    },
    {
      id: 24,
      homeTeam: 10,
      homeTeamGoals: 2,
      awayTeam: 14,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 25,
      homeTeam: 2,
      homeTeamGoals: 0,
      awayTeam: 6,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 26,
      homeTeam: 13,
      homeTeamGoals: 1,
      awayTeam: 1,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 27,
      homeTeam: 5,
      homeTeamGoals: 1,
      awayTeam: 15,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 28,
      homeTeam: 16,
      homeTeamGoals: 3,
      awayTeam: 7,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 29,
      homeTeam: 9,
      homeTeamGoals: 0,
      awayTeam: 4,
      awayTeamGoals: 4,
      inProgress: 0,
    },
    {
      id: 30,
      homeTeam: 3,
      homeTeamGoals: 0,
      awayTeam: 12,
      awayTeamGoals: 4,
      inProgress: 0,
    },
    {
      id: 31,
      homeTeam: 8,
      homeTeamGoals: 2,
      awayTeam: 10,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 32,
      homeTeam: 14,
      homeTeamGoals: 5,
      awayTeam: 11,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 33,
      homeTeam: 1,
      homeTeamGoals: 1,
      awayTeam: 16,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 34,
      homeTeam: 9,
      homeTeamGoals: 3,
      awayTeam: 6,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 35,
      homeTeam: 10,
      homeTeamGoals: 1,
      awayTeam: 5,
      awayTeamGoals: 3,
      inProgress: 0,
    },
    {
      id: 36,
      homeTeam: 2,
      homeTeamGoals: 0,
      awayTeam: 7,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 37,
      homeTeam: 15,
      homeTeamGoals: 0,
      awayTeam: 13,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 38,
      homeTeam: 14,
      homeTeamGoals: 2,
      awayTeam: 4,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 39,
      homeTeam: 3,
      homeTeamGoals: 2,
      awayTeam: 11,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 40,
      homeTeam: 12,
      homeTeamGoals: 4,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: 0,
    },
  ];

  const allTeams = [
    { id: 1, teamName: 'Avaí/Kindermann' },
    { id: 2, teamName: 'Bahia' },
    { id: 3, teamName: 'Botafogo' },
    { id: 4, teamName: 'Corinthians' },
    { id: 5, teamName: 'Cruzeiro' },
    { id: 6, teamName: 'Ferroviária' },
    { id: 7, teamName: 'Flamengo' },
    { id: 8, teamName: 'Grêmio' },
    { id: 9, teamName: 'Internacional' },
    { id: 10, teamName: 'Minas Brasília' },
    { id: 11, teamName: 'Napoli-SC' },
    { id: 12, teamName: 'Palmeiras' },
    { id: 13, teamName: 'Real Brasília' },
    { id: 14, teamName: 'Santos' },
    { id: 15, teamName: 'São José-SP' },
    { id: 16, teamName: 'São Paulo' },
  ];

  before(async () => {
    sinon
      .stub(MatchModel, 'findAll')
      .resolves(allMatches as unknown as MatchModel[]);

    sinon
      .stub(TeamModel, 'findAll')
      .resolves(allTeams as unknown as TeamModel[]);
  });

  after(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findAll as sinon.SinonStub).restore();
  });

  beforeEach(async () => {
    response = await chai.request(app).get('/leaderboard/home');
  });

  it('The response status code should be 200', () => {
    expect(response.status).to.be.equal(200);
  });

  it('The response body should be an array', () => {
    expect(response.body).to.be.an('array');
  });

  it('The response body should contain the leaderboard', () => {
    expect(response.body).to.be.deep.equal(expectedLedearboard);
  });
});