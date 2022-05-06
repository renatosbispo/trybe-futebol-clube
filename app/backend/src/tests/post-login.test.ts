import * as sinon from 'sinon';
const chai = require('chai');
const chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  let response: Response;

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
  describe('If the request body is valid', () => {
    it('The response status code should be 200', async () => {
      response = await chai.request(app).post('/login');

      expect(response.status).to.equal(200);
    });
  });
});
