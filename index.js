const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require(`./config/${process.env.Node_ENV || 'local'}`);

const routes = require('./server/routes');
const middlewares = require('./server/middlewares');
const { headers } = require('./server/shared/constants');
// const getUserId = require('./server/utils/getUserId');
// const gstinDetails = require('./server/interface/gstin.interface');

const app = express();
const http = require('http').Server(app);
const port = config.port;
mongoose.Promise = global.Promise;

const component = "index";

const options = {
	useNewUrlParser: true,
	// autoIndex: false, // Don't build indexes
	// reconnectTries: 100, // Never stop trying to reconnect
	// reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useUnifiedTopology: true
};

const corsOptions = {
  exposedHeaders: [headers.session, headers.userId],
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

mongoose.connect(config.connectionString, options)
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => { 
    console.log(`Can not connect to the database ${err}`);
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors(corsOptions));

app.use('/api/users', middlewares.addRequestId, routes.usersRouter);
app.use('/api/profile', middlewares.addRequestId, middlewares.validateSession, routes.profileRouter);
app.use('/api/gstin', middlewares.addRequestId, middlewares.validateSession, routes.gstinRouter);
// app.use('/api/user/docs', getUserId, routes.docsRouter);
// app.use('/api/client', getUserId, routes.clientRouter);
// app.use('/api/gstinInfo', getUserId, gstinDetails.getCompanyInfo);


// Create link to Vue build directory
let distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use('/*', (req, res, next)=>{
	res.sendFile(distDir);
});

http.listen(port, ()=>{
    console.log("Server up and running on port ", port);
});