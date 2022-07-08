// ================== Package Imports ==================
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
var cors = require('cors');

// ================== Initialise App ==================
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ================== Functions ==================
const validateRequest = async(authToken, twilioSignature, url, params) => {
  const validRequest = await twilio.validateRequest(authToken, twilioSignature, url, params)
  console.log(validRequest)
}

// ================== Endpoints ==================
// EP1: Sense check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Alive!' });
});

// EP2: Twilio Signature check
app.post('/signatureCheck', (req, res) => {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioSignature = req.headers['x-twilio-signature'];
  const url = 'https://mmarshall.eu.ngrok.io/signatureCheck';
  const params = req.body;
  validateRequest(authToken, twilioSignature, url, params)
  res.status(200)
});

module.exports = app;
