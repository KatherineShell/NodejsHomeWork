const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const { it } = require('mocha');

const expect = chai.expect;
let repoName = 'nodejs-express';

chai.use(chaiHttp);

it('Получение массива репозиториев', (done) => {
    chai.request(server)
        .get('/api/repos')
        .end((err, res) => {
            let data = res.body.repos;

            expect(res).to.have.status(200);
            expect(data).to.be.a('array');
            expect(data.some(name => name.includes(repoName))).to.be.true;
            done();
        });
});

it('Получение веток репозитория', (done) => {
    chai.request(server)
        .get('/api/branches/' + repoName)
        .end((err, res) => {
            let data = res.body.branches;

            expect(res).to.have.status(200);
            expect(data).to.be.a('array');
            expect(data.some(name => name.includes('master'))).to.be.true;
            done();
        });
});

it('Получение контента репозитория', (done) => {
    chai.request(server)
        .get('/api/repos/' + repoName)
        .end((err, res) => {
            let data = res.body.files;

            expect(res).to.have.status(200);
            expect(data).to.be.a('array');
            expect(data.some(name => name.includes('dist'))).to.be.true;
            done();
        });
});

it('Получение контента вложенной папки репозитория', (done) => {
    chai.request(server)
        .get('/api/repos/' + repoName + '/tree/react/scss')
        .end((err, res) => {
            let data = res.body.files;

            expect(res).to.have.status(200);
            expect(data).to.be.a('array');
            expect(data.some(name => name.includes('Footer'))).to.be.true;
            done();
        });
});

it('Получение контента файла', (done) => {
    chai.request(server)
        .get('/api/repos/' + repoName + '/blob/master/dist/mobile.css')
        .end((err, res) => {
            let data = res.body.fileData;

            expect(res).to.have.status(200);
            expect(data).to.be.a('string');
            expect(data.includes('color')).to.be.true;
            done();
        });
});

it('Получение коммитов репозитория', (done) => {
    chai.request(server)
        .get('/api/repos/' + repoName + '/commits/master/')
        .end((err, res) => {
            let data = res.body.commits;

            expect(res).to.have.status(200);
            expect(data).to.be.a('array');
            done();
        });
});

it('Получение коммитов репозитория постранично', (done) => {
    let pageSize = 2;

    chai.request(server)
        .get('/api/repos/' + repoName + '/commits/master/' + pageSize + '/1')
        .end((err, res) => {
            let data = res.body.commits;

            expect(res).to.have.status(200);
            expect(data).to.be.a('array');
            expect(data).to.have.length.lessThan(pageSize + 1);
            done();
        });
});

it('Клонирование репозитория', (done) => {
    chai.request(server)
        .post('/api/repos')
        .send({
            'url': 'https://github.com/KatherineShell/JSHomeWork'
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
});

it('Удаление репозитория', (done) => {
    chai.request(server)
        .delete('/api/repos/JSHomeWork')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
});