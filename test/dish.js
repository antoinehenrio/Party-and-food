process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Plat = require('../server/models/modelePlat');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();

chai.use(chaiHttp)

describe('Plats', () => {
    beforeEach((done) => {
        Plat.deleteMany({}, (err) => {
            done();
        })
    })

    describe('/GET plat', () => {
        it('it should GET all the dishes', (done) => {
          chai.request(server)
              .get('/api/dish/get')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.equal({plat: []});
                done();
              });
        });
    });
    
    describe('/POST plat', () => {
        it('it should POST a dish', (done) => {
            let plat = {
                nomPlat: "Pâtes carbo"
            }
            chai.request(server)
                .post('/api/dish/create')
                .send(plat)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: "Plat créé avec succès"})
                done();
            });
        });
    })

    describe('/GET/:name plat', () => {
        it('it should GET a dish by name', (done) => {
            let plat = new Plat({
                nomPlat: "Pâtes carbo"
            })
            plat.save((err, plat) => {
                chai.request(server)
                .get(encodeURI('/api/dish/get/' + plat.nomPlat))
                .send(plat)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'plat[0].nomPlat' : "Pâtes carbo"});
                    done();
                })
            })
        })
    })

    describe('/PUT/:id plat', () => {
        it('it should UPDATE a dish by id', (done) => {
            let plat = new Plat({
                nomPlat: "Pâtes carbo"
            })
            plat.save((err, plat) => {
                chai.request(server)
                .put(encodeURI('/api/dish/update/' + plat.idPlat))
                .send({nomPlat: "Kebab"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: 'Plat modifié avec succès'})
                })

                chai.request(server)
                .get('/api/dish/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'plat[0].nomPlat' : "Kebab"});
                    done();
                })
            })
        })
    })

    describe('/DELETE/:id plat', () => {
        it('it should DELETE a dish by id', (done) => {
            let plat = new Plat({
                nomPlat: "Kebab"
            })
            plat.save((err, plat) => {
                chai.request(server)
                .delete(encodeURI('/api/dish/remove/' + plat.idPlat))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: 'Plat supprimé avec succès'})
                })

                chai.request(server)
                .get('/api/dish/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.equal({plat: []});
                    done();
                })
            })
        })
    })
})

