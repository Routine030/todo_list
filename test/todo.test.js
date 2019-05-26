const { expect } = require('chai');
const supertest = require('supertest');
const db = require('../models/index');
const  server = require('../app');
const api = supertest(server);
describe('TEST for todo', () => {

let test_id;

before('before start', (done)=>{

  let testData={content: 'unit test'}
  db.todolists.create(testData)
  .then((result) => {
          test_id=result.id;
          done();
      });
})

  //create a new todo test
  it('1)Test create a new todo(POST)', (done) => {

    let postreq={ createtodo: 'find job' }
    api.post('/')
      .send(postreq)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        else{
          let entry=res.body[0];
          expect(entry).to.have.property('id');
          expect(entry.id).to.be.a('number');
          expect(entry).to.have.property('createdAt');
          expect(entry.createdAt).to.be.a('string');
          expect(entry).to.have.property('content');
          expect(entry.content).to.be.a('string');
          expect(entry.content).to.equal('find job');
          done();
        }
      });
  });  
    
  it('2)Test create a new todo(POST) with no input data', (done) => {

    api.post('/')
      .expect(500)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        else{
          done();
        }
      });
  });
  it('3)Test create a new todo(POST) with null input data', (done) => {

    api.post('/')
      .send('')
      .expect(500)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        else{
          done();
        }
      });
  });
  //modify a todo test    
  it('4)Test update exist todo(PUT)', (done) => {

    let putreq={ oriMsg: 'practice SE6' }
    api.put('/todo/'+test_id)
      .send(putreq)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        else{
          expect(res.body).to.equal("ok");
          done();
        }
      });
  });
  it('5)Test update non-exist todo(PUT)', (done) => {
    let putreq={ oriMsg: 'owl' }
    let serachId=0;
    api.put('/todo/'+serachId)
      .send(putreq)
      .expect(500)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        else{
          done();
        }
      });
  });
  //delete a todo
  it('6)Test delete exist todo(DELETE)', (done) => {

    api.del('/todo/'+test_id)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        else{
          expect(res.body).to.equal("ok");
          done();
        }
      });
  });
  it('7)Test delete todo(DELETE) with illegal index', (done) => {

    let serachId='abc';
    api.del('/todo/'+serachId)
      .expect(500)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        else{
          done();
        }
      });
  });
  //recovery a todo
  it('8)Test recovery deleted todo(POST)', (done) => {

    api.post('/todo/'+test_id)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        else{
          expect(res.body).to.equal("ok");
          done();
        }
      });
  });
  it('9)Test recovery deleted todo(POST) with no index', (done) => {

    api.post('/todo/')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        else{
          done();
        }
      });
  });  
  //display all todos  
  it('10)Test show all todo item(GET)', (done) => {

    api.get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        else{
          let entries=res.body[0];
          for(var i=0;i<entries.length;i++){
            expect(entries[i]).to.have.property('id');
            expect(entries[i].id).to.be.a('number');
            expect(entries[i]).to.have.property('createdAt');
            expect(entries[i].createdAt).to.be.a('string');
            expect(entries[i]).to.have.property('content');
            expect(entries[i].content).to.be.a('string');
          }
          done();
        }
      });     
  });
});