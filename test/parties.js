process.env.NODE_ENV = 'test';

let fs = require('fs')
let path = require('path');
let mongoose = require('mongoose');
let User = require('../server/models/modeleUser');
let Soiree = require('../server/models/modeleSoiree');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();

let image = fs.readFileSync(path.join(__dirname, 'test.png'))

chai.use(chaiHttp)

describe('User', () => {

    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            
        })

        Soiree.deleteMany({}, (err) => {
            done();
        })
    })

    describe('/GET parties', () => {
        it('it should GET parties by user', (done) => {
            let user1 = new User({
                username: "jourdain.thibaud@gmail.com",
                email: "jourdain.thibaud@gmail.com",
            })

            let user2 = new User({
                username: "blabla@gmail.com",
            })

            User.register(user1, "test", (err, theUser1) => {
                User.register(user2, "test", (err, theUser2) => {
                    new Soiree({
                        descriptionSoiree : "Soirée test",
                        dateSoiree : new Date(),
                        deadline : new Date(),
                        organisateur : theUser1._id,
                        utilisateurs : [theUser1._id, theUser2._id]
                    }).save((err, soiree) => {
                        chai.request(server)
                        .post('/api/user/login')
                        .send({username: "jourdain.thibaud@gmail.com", password: "test"})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.to.have.property('token')

                            let token = res.body.token

                            chai.request(server)
                            .get('/api/party/get')
                            .set('Authorization', 'bearer ' + token)
                            .end((err, res) => {
                                res.body.should.have.nested.property("soiree[0].utilisateurs[1]")
                                done();
                            })
                        })
                    })
                })
            })
        });
    })

    describe('/POST party', () => {
        it('it should POST a party', (done) => {
            let soiree = {
                descriptionSoiree: "Soirée débauche chez Camille",
                dateSoiree: new Date("2020-07-25T18:00:00"),
                adresseSoiree1: "15 rue Charlemagne",
                codePostalSoiree: "76000",
                villeSoiree: "ROUEN"
            }

            let user = new User({
                username: "jourdain.thibaud@gmail.com",
                email: "jourdain.thibaud@gmail.com",
            })

            User.register(user, "test", (err, user) => {
                chai.request(server)
                .post('/api/user/login')
                .send({username: "jourdain.thibaud@gmail.com", password: "test"})
                .end((err, res) => {

                    let token = res.body.token

                    chai.request(server)
                    .post('/api/party/create')
                    .send(soiree)
                    .set('Authorization', 'bearer ' + token)
                    .end((err, res) => {
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.to.deep.include({message: "Soirée créée avec succès"})

                        chai.request(server)
                        .get('/api/party/get')
                        .set('Authorization', 'bearer ' + token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.to.nested.include({'soiree[0].descriptionSoiree' : "Soirée débauche chez Camille"});
                            done();
                        })
                    });
                })
            })

            
        });
    })

    describe('/PUT party', () => {
        it('it should PUT a party', (done) => {
            let soiree = {
                descriptionSoiree: "Soirée débauche chez Camille",
                dateSoiree: new Date(2020, 7, 25, 18, 0, 0),
                adresseSoiree1: "15 rue Charlemagne",
                codePostalSoiree: "76000",
                villeSoiree: "ROUEN"
            }

            let user = new User({
                username: "jourdain.thibaud@gmail.com",
                email: "jourdain.thibaud@gmail.com",
            })

            User.register(user, "test", (err, user) => {
                soiree.organisateur = user._id
                chai.request(server)
                .post('/api/user/login')
                .send({username: "jourdain.thibaud@gmail.com", password: "test"})
                .end((err, res) => {

                    let token = res.body.token

                    new Soiree(soiree).save((err, soiree) => {
                        console.log("error " + err)
                        chai.request(server)
                        .put(encodeURI('/api/party/update/' + soiree._id))
                        .send({descriptionSoiree: "blablabla"})
                        .set('Authorization', 'bearer ' + token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.to.nested.include({'message' : "Soirée modifiée avec succès"});
                                
                            chai.request(server)
                            .get('/api/party/get')
                            .set('Authorization', 'bearer ' + token)
                            .end((err, res) => {
                                res.body.should.to.nested.include({'soiree[0].descriptionSoiree' : "blablabla"});
                                done();
                            })
                        })
                    })
                })
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

