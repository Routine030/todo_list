const { expect } = require('chai');
const supertest = require('supertest');
const db = require('../models/index');
const server = require('../app');

const api = supertest(server);
describe('TEST for todo', () => {
  let testId;
  let testContent;
  let testDate;

  before('before start', async () => {
    const testData = { content: 'practice js' };
    let res;
    try {
      res = await db.todolists.create(testData);
    } catch (err) {
      throw new Error(err);
    }
    testId = res.id;
    testContent = res.content;
    testDate = res.createdAt.toISOString().substr(0, 10);
  });

  // create a new todo test
  it('1)Test create a new todo(POST)', async () => {
    const postreq = { createtodo: 'find job' };
    let res;
    try {
      res = await api.post('/').send(postreq);
    } catch (err) {
      throw new Error(err);
    }
    const entry = res.body[0];
    expect(res.status).to.equal(200);
    expect(entry).to.have.property('id');
    expect(entry.id).to.be.a('number');
    expect(entry).to.have.property('createdAt');
    expect(entry.createdAt).to.be.a('string');
    expect(entry).to.have.property('content');
    expect(entry.content).to.be.a('string');
    expect(entry.content).to.equal('find job');
  });

  it('2)Test create a new todo(POST) with no input data', async () => {
    let res;
    try {
      res = await api.post('/');
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(500);
  });
  it('3)Test create a new todo(POST) with null input data', async () => {
    let res;
    try {
      res = await api.post('/').send('');
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(500);
  });
  // modify a todo test
  it('4)Test update exist todo(PUT)', async () => {
    const putreq = { oriMsg: 'practice js SE6' };
    let res;
    try {
      res = await api.put(`/todo/${testId}`).send(putreq);
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(200);
    expect(res.body).to.equal('ok');
  });
  it('5)Test update non-exist todo(PUT)', async () => {
    const putreq = { oriMsg: 'owl' };
    const serachId = 0;
    let res;
    try {
      res = await api.put(`/todo/${serachId}`).send(putreq);
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(500);
  });
  // delete a todo
  it('6)Test delete exist todo(DELETE)', async () => {
    let res;
    try {
      res = await api.del(`/todo/${testId}`);
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(200);
    expect(res.body).to.equal('ok');
  });
  it('7)Test delete todo(DELETE) with illegal index', async () => {
    const serachId = 'abc';
    let res;
    try {
      res = await api.del(`/todo/${serachId}`);
    } catch (err) {
      throw new Error(err);
    }

    expect(res.status).to.equal(500);
  });
  // recovery a todo
  it('8)Test recovery deleted todo(POST)', async () => {
    let res;
    try {
      res = await api.post(`/todo/${testId}`);
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(200);
    expect(res.body).to.equal('ok');
  });
  it('9)Test recovery deleted todo(POST) with no index', async () => {
    let res;
    try {
      res = await api.post('/todo/');
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(404);
  });
  // display all todos
  it('10)Test show all todo item(GET)', async () => {
    let res;
    let i = 0;
    try {
      res = await api.get('/');
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(200);
    const entries = res.body[0];
    for (i; i < entries.length;) {
      expect(entries[i]).to.have.property('id');
      expect(entries[i].id).to.be.a('number');
      expect(entries[i]).to.have.property('createdAt');
      expect(entries[i].createdAt).to.be.a('string');
      expect(entries[i]).to.have.property('content');
      expect(entries[i].content).to.be.a('string');
      i += 1;
    }
  });
  it('11)Test query todo item by date(GET)', async () => {
    let res;
    let i = 0;
    try {
      res = await api.get(`/todo?date=${testDate}`);
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(200);
    expect(res.body).to.be.instanceof(Array);
    const entries = res.body[0];
    for (i; i < entries.length;) {
      expect(entries[i]).to.be.a('number');
      i += 1;
    }
  });
  it('12)Test query todo item by err type date(GET)', async () => {
    let res;
    try {
      res = await api.get(('/todo?date=').concat('abc'));
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(200);
    expect(res.body).to.be.instanceof(Array);
    expect(res.body).eql([]);
  });
  it('13)Test query todo item by text(GET)', async () => {
    let res;
    let i = 0;
    try {
      res = await api.get(`/todo?text=${testContent}`);
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(200);
    expect(res.body).to.be.instanceof(Array);
    const entries = res.body[0];
    for (i; i < entries.length;) {
      expect(entries[i]).to.be.a('number');
      i += 1;
    }
  });
  it('14)Test query todo item by null content(GET)', async () => {
    let res;
    try {
      res = await api.get('/todo?text=');
    } catch (err) {
      throw new Error(err);
    }
    expect(res.status).to.equal(200);
    expect(res.body).to.be.a('string');
    expect(res.body).eql('');
  });
});
