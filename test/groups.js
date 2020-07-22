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
                    res.body.should.to.deep.equal({groupes: []});
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
                    res.body.should.to.deep.include({message: "Groupe créée avec succès"})
            });

            chai.request(server)
                .get('/api/group/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'groupe[0].nomCategorie' : "Algérien"});
                    done();
            })
        });
    })

    describe('/GET/:name categorie', () => {
        it('it should GET a category by name', (done) => {
            let categorie = new Categorie({
                nomCategorie: "Méxicain"
            })
            categorie.save((err, category) => {
                chai.request(server)
                .get(encodeURI('/api/category/get/' + category.nomCategorie))
                .send(category)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'categorie[0].nomCategorie' : "Méxicain"});
                    done();
                })
            })
        })
    })

    describe('/PUT/:id categorie', () => {
        it('it should UPDATE a category by id', (done) => {
            let categorie = new Categorie({
                nomCategorie: "Méxicain"
            })
            categorie.save((err, category) => {
                chai.request(server)
                .put(encodeURI('/api/category/update/' + category.idCategorie))
                .send({nomCategorie: "Algérien"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: 'Catégorie modifiée avec succès'})
                })

                chai.request(server)
                .get('/api/category/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'categorie[0].nomCategorie' : "Algérien"});
                    done();
                })
            })
        })
    })

    describe('/DELETE/:id categorie', () => {
        it('it should DELETE a category by id', (done) => {
            let categorie = new Categorie({
                nomCategorie: "Méxicain"
            })
            categorie.save((err, category) => {
                chai.request(server)
                .delete(encodeURI('/api/category/remove/' + category.idCategorie))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: 'Catégorie supprimée avec succès'})
                })

                chai.request(server)
                .get('/api/category/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.equal({categorie: []});
                    done();
                })
            })
        })
    })
})

