const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/user")
const {userOneId, userOne, setupDB} = require("./fixtures/db")

beforeEach(setupDB)

test("Should sign up new user",async()=>{
   const response = await request(app)
    .post('/users')
    .send({
        name: "lizzie",
        email: "lizzie@example.com",
        password: "notPW2019"
    })
    .expect(201)
    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull()
    
    //Assertions about response
    expect(response.body).toMatchObject({
        user:{
            name: "lizzie",
            email: "lizzie@example.com"
        },
        token: user.tokens[0].token
    })
})
test("Should login existing user", async()=>{
    const response = await request(app)
    .post('/users/login')
    .send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token)
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

test('Should get profile for user', async()=> {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
test('Should not get profile for unauthenticated user', async()=> {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})
test('Should delete account for user', async()=> {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()

})
test('Should not delete account for unauthenticated user', async()=> {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload image ', async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/weather.png')
    .expect(200)
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})
test("should update valid user fields", async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        email:"potatoes@potatoes.com"
    })
    .expect(200)
    const user = await User.findById(userOneId);
    expect(user.email).toEqual('potatoes@potatoes.com');
})
test("should not update invalid user fields", async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: "yangon"
    })
    .expect(400)
})

