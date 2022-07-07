import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import register from './controllers/register.js'
import signin from './controllers/signin.js'
import profile from './controllers/profile.js'
import image from './controllers/image.js'
const PORT = process.env.PORT || 3001

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '',
    database: 'Smart-brain'
  }
})

db.select('*')
  .from('users')
  .then((data) => {
    console.log(data)
  })

const app = express()

app.use(cors())

// Parse request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

app.get('/', (req, res) => {
  res.send('Success')
})

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
