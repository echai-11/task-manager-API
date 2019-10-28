const request = require("supertest")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const app = require("../src/app")
const User = require("../src/models/user")

const userOneId= new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name:"potato",
    email: "potato@potato.com",
    password: "friedpotatoes!",
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.JWT_ENV)
    }]
}
beforeEach(async()=>{
    await User.deleteMany()
    await new User(userOne).save()
})

test("Should sign up new user",async()=>{
    await request(app)
    .post('/users')
    .send({
        name: "lizzie",
        email: "lizzie@example.com",
        password: "notPW2019"
    })
    .expect(201)
})
test("Should login existing user", async()=>{
    await request(app)
    .post('/users/login')
    .send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)
})

test("Should not login non-existing user", async()=>{
    await request(app)
    .post('/users/login')
    .send({
        email: "chocolateball@cake.com",
        password: "zzzx"
    })
    .expect(400)
})

test('Should get profile for user', async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})