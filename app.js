const cors = require('cors')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const { appTime, globalError } = require('./middlewares/middleware')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
require('dotenv').config()

const Admin = require('./models/adminModel')

const createAdmin = async function () {
  const admin = await Admin.create({
    username: 'admin',
    password: '123',
    role: 'admin'
  })
}

// createAdmin()

const app = express()

const store = new MongoDBSession({
  uri: process.env.DATABASE_SESSION,
  collection: 'sessions'
})
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  session({
    secret: 'my screct',
    resave: false,
    saveUninitialized: false,
    store: store
  })
)
app.use(methodOverride('_method'))

app.use(morgan('dev'))
app.use(cors())
app.use(express.static(`${__dirname}/public`))
app.set('view engine', 'ejs')

// Customs Middleware
app.use(appTime)
app.use(compression())

// const adminRoutes = require('./routes/adminRoutes')
// const blogRoutes = require('./routes/blogRoutes')
// const adminCrudRoutes = require('./routes/adminCrudRoutes')
// const nodeMailerRoutes = require('./routes/nodemailer')
app.use('/admin', require('./routes/adminRoutes'))
app.use('/blog', require('./routes/blogRoutes'))
app.use('/dashboard', require('./routes/adminCrudRoutes'))
app.use('/', require('./routes/nodemailer'))

app.get('/', (req, res) => {
  res.status(200).render('index', {
    title: "Tolu's personal page",
    time: req.time,
    isAuthenticated: false
  })
})

app.get('*', (req, res) => {
  res.status(200).render('404', {
    title: '404 Page',
    time: req.time,
    isAuthenticated: false
  })
})

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(c => console.log('DATABASE connection successfull'))
  .catch(() => console.log('not connected to db'))

app.use(globalError)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
