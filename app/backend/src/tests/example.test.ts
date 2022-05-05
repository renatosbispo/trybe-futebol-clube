import * as sinon from 'sinon';
const chai = require('chai');
const chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/Example';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Suite', () => {
  // let response: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   response = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Test', () => {
    expect(false).to.be.eq(true);
  });
});
