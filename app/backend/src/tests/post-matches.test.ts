import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /matches', () => {
  it('Placeholder test', () => {
    expect(true).to.be.equal(true);
  });
});
