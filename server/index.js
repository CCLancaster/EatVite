require('dotenv').config()
let cors = require('cors')
let express = require('express')
let expressJwt = require('express-jwt')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')

const app = express();
let rowdyResults = rowdyLogger.begin(app)
const db = require('./models');
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).send({ message: 'Welcome'});
// });

// include my controller
// app.use('/hey', require('./controllers/routes.js'))
// app.use('/auth', require('./controllers/auth.js'))
app.use('/auth', expressJwt({
  secret: process.env.JWT_SECRET
}).unless({ // unless defines exceptions to the rule
  path: [
    { url: '/auth/login', methods: ['POST'] },
    { url: '/auth/signup', methods: ['POST'] }
  ]
}), require('./controllers/auth'))

app.use('/hey', expressJwt({ secret: process.env.JWT_SECRET }), require('./controllers/routes.js'))

// app.get('*', (req, res) => {
//     res.status(404).send({ message: '404 not found'});
// });

app.listen(process.env.PORT || 3000, () => {
    console.log(`🍔your listening to the port ${process.env.PORT || 3000}`)
    rowdyResults.print()
});