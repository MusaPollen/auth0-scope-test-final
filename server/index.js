const express = require('express');
const cors = require('cors');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
require('dotenv').config()

const app = express();
// const port = process.env.PORT || 5000;  // Default port is 5000
const port = 5000;

const jwtCheck = auth({
  audience: 'http://localhost:5000/api/',
  issuerBaseURL: 'https://dev-clkrligodugy76hh.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// Middleware to handle JSON request bodies
app.use(express.json());
app.use(cors());  // Use CORS middleware

// shift alt down arrow to duplicate
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXapi routes
app.get('/api/', (req, res) => {
  res.send('Hello from a public endpoint');
});
app.get('/api/test/', (req, res) => {
  res.send(process.env.SECRET_CRUSH);
});
app.get('/api/private/', jwtCheck, function (req, res) {
  //console.log("Payload", req?.auth?.payload?.permissions)// added by doha for testing
  // const userPermissions = req?.auth?.payload?.permissions || []; // doha. 

  res.send('Hello from a private endpoint');
});
const checkScopes = requiredScopes('read:lists');
app.get('/api/private-scoped/', jwtCheck, checkScopes, function (req, res) {
  res.send('Hello from a private endpoint! You need to be authenticated and have a scope of read:lists to see this.');
});
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXapi routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});