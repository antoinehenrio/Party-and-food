process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Ingredient = require('../server/models/modeleIngredient');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();

chai.use(chaiHttp)

describe('Ingredients', () => {
    beforeEach((done) => {
        Ingredient.deleteMany({}, (err) => {
            done();
        })
    })

    describe('/GET ingredient', () => {
        it('it should GET all the ingredients', (done) => {
          chai.request(server)
              .get('/api/ingredient/get')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.equal({ingredient: []});
                done();
              });
        });
    });
    
    describe('/POST ingredient', () => {
        it('it should POST an ingredient', (done) => {
            let ingredient = {
                nomIngredient: "Pâtes"
            }
            chai.request(server)
                .post('/api/ingredient/create')
                .send(ingredient)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: "Ingrédient créé avec succès"})
            });

            chai.request(server)
                .get('/api/ingredient/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'ingredient[0].nomIngredient' : "Pâtes"});
                    done();
            })
        });
    })

    describe('/GET/:name ingredient', () => {
        it('it should GET a ingredient by name', (done) => {
            let ingredient = new Ingredient({
                nomIngredient: "Pâtes"
            })
            ingredient.save((err, ingredient) => {
                chai.request(server)
                .get(encodeURI('/api/ingredient/get/' + ingredient.nomIngredient))
                .send(ingredient)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'ingredient[0].nomIngredient' : "Pâtes"});
                    done();
                })
            })
        })
    })

    describe('/PUT/:id ingredient', () => {
        it('it should UPDATE a groupe by id', (done) => {
            let ingredient = new Ingredient({
                nomIngredient: "Pâtes"
            })
            ingredient.save((err, ingredient) => {
                chai.request(server)
                .put(encodeURI('/api/ingredient/update/' + ingredient.idIngredient))
                .send({nomIngredient: "Carbo"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: 'Ingrédient modifié avec succès'})
                })

                chai.request(server)
                .get('/api/ingredient/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.nested.include({'ingredient[0].nomIngredient' : "Carbo"});
                    done();
                })
            })
        })
    })

    describe('/DELETE/:id ingredient', () => {
        it('it should DELETE an ingredient by id', (done) => {
            let ingredient = new Ingredient({
                nomIngredient: "Pâtes"
            })
            ingredient.save((err, ingredient) => {
                chai.request(server)
                .delete(encodeURI('/api/ingredient/remove/' + ingredient.idIngredient))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.include({message: 'Ingrédient supprimé avec succès'})
                })

                chai.request(server)
                .get('/api/ingredient/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.deep.equal({ingredient: []});
                    done();
                })
            })
        })
    })
})

