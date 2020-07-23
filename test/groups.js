process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Groupe = require('../server/models/modeleGroupe');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();

chai.use(chaiHttp)

describe('Groupes', () => {
    beforeEach((done) => {
        Groupe.deleteMany({}, (err) => {
            done();
        })
    })

    describe('/GET groupe', () => {
        it('it should GET all the groups', (done) => {
          chai.request(server)
              .get('/api/group/get')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.equal({groupe: []});
                done();
              });
        });
    });
    
    describe('/POST groupe', () => {
        it('it should POST a group', (done) => {
            let groupe = {
                nomGroupe: "Super groupe"
            }
            chai.request(server)
                .post('/api/group/create')
                .send(groupe)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: "Groupe créé avec succès"})
            });

            chai.request(server)
                .get('/api/group/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'groupe[0].nomGroupe' : "Super groupe"});
                    done();
            })
        });
    })

    describe('/GET/:name groupe', () => {
        it('it should GET a groupe by name', (done) => {
            let groupe = new Groupe({
                nomGroupe: "Super groupe"
            })
            groupe.save((err, groupe) => {
                chai.request(server)
                .get(encodeURI('/api/group/get/' + groupe.nomGroupe))
                .send(groupe)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'groupe[0].nomGroupe' : "Super groupe"});
                    done();
                })
            })
        })
    })

    describe('/PUT/:id groupe', () => {
        it('it should UPDATE a groupe by id', (done) => {
            let groupe = new Groupe({
                nomGroupe: "Super groupe"
            })
            groupe.save((err, group) => {
                chai.request(server)
                .put(encodeURI('/api/group/update/' + group.idGroupe))
                .send({nomGroupe: "Mon groupe"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: 'Groupe modifié avec succès'})
                })

                chai.request(server)
                .get('/api/group/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'groupe[0].nomGroupe' : "Mon groupe"});
                    done();
                })
            })
        })
    })

    describe('/DELETE/:id groupe', () => {
        it('it should DELETE a group by id', (done) => {
            let groupe = new Groupe({
                nomGroupe: "Méxicain"
            })
            groupe.save((err, group) => {
                chai.request(server)
                .delete(encodeURI('/api/group/remove/' + group.idGroupe))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: 'Groupe supprimé avec succès'})
                })

                chai.request(server)
                .get('/api/group/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.equal({groupe: []});
                    done();
                })
            })
        })
    })
})

