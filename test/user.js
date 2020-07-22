process.env.NODE_ENV = 'test';

let fs = require('fs')
let path = require('path');
let mongoose = require('mongoose');
let User = require('../server/models/modeleUser');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();

let image = fs.readFileSync(path.join(__dirname, 'test.png'))

chai.use(chaiHttp)

describe('User', () => {

    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        })
    })

    describe('/POST user', () => {
        it('it should REGISTER a user with mail', (done) => {
            let user = {
                username: "jourdain.thibaud@gmail.com",
                password: "test"
            }
            chai.request(server)
                .post('/api/user/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.have.property('token')
                    done();
            });
        });
    })

    describe('/POST user', () => {
        it('it should REGISTER a user with phone', (done) => {
            let user = {
                username: "06.49.80.87.46",
                password: "test"
            }
            chai.request(server)
                .post('/api/user/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.have.property('token')
                    done();
            });
        });
    })

    describe('/POST user', () => {
        it('it should NOT REGISTER a user with anything else', (done) => {
            let user = {
                username: "blabla",
                password: "test"
            }
            chai.request(server)
                .post('/api/user/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.to.not.have.property('token')
                    done();
            });
        });
    })

    describe('/POST user', () => {
        it('it should LOGIN a user with email', (done) => {
            let user = new User({
                username: "jourdain.thibaud@gmail.com",
                email: "jourdain.thibaud@gmail.com",
            })

            User.register(user, "test", (err, user) => {
                chai.request(server)
                .post('/api/user/login')
                .send({username: "jourdain.thibaud@gmail.com", password: "test"})
                .end((err, res) => {
                    console.log(res.text)
                    res.should.have.status(200);
                    res.body.should.to.have.property('token')
                    done();
                });
            })
        });
    })

    describe('/POST user', () => {
        it('it should UPDATE a user\'s photo', (done) => {
            let user = new User({
                username: "jourdain.thibaud@gmail.com",
                email: "jourdain.thibaud@gmail.com",
            })

            User.register(user, "test", (err, user) => {
                chai.request(server)
                .post('/api/user/login')
                .send({username: "jourdain.thibaud@gmail.com", password: "test"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.have.property('token')

                    let token = res.body.token

                    chai.request(server)
                    .put('/api/user/update')
                    .set('Authorization', 'bearer ' + token)
                    .send({email: "jourdain.thibaud@gmail.com", photo: image})
                    .end((err, res) => {
                        console.log(res.text)
                        done();
                    })
                });
            })
        });
    })

    /*beforeEach((done) => {
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
    })*/
})

