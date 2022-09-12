//Dependencies: 
//yarn add express cors twilio 

const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();
/* const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public'))) */
//twilio requirements -- Texting API 
const client = new twilio(dotenv.parsed.TWILIO_ACCOUNT_SID, dotenv.parsed.TWILIO_AUTH_TOKEN);
const app = express(); //alias

app.use(express.static('public'))
app.use(cors()); //Blocks browser from restricting any data
app.get('/', (req, res) => {
    res.sendFile("./public/index.html", { root: __dirname })
})
app.get('/send-text', (req, res) => {
    client.messages.create({
        body: 'START',
        to: dotenv.parsed.CART_SIM_NUMBER,  // Text this number
        from: dotenv.parsed.TWILIO_PHONE_NUMBER // From a valid Twilio number
    }).then((message) => {
        console.log(message);
        if (message.status == 'queued') {
            res.status(200).send();
        } else {
            res.status(301).send();
        }
    })
})

app.get('/weather/:latlon', async (request, response) => {
    const latlon = request.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];

    const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
    const OPENWEATHER_API_URL = process.env.OPENWEATHER_API_URL;
    const weather_url = `${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    response.json(weather_data);
});
app.get('/measurements', async (request, response) => {

    const THINGHSPEAK_URL = process.env.THINGHSPEAK_URL;
    const THINGHSPEAK_API_KEY = process.env.THINGHSPEAK_API_KEY;
    const thingspeak_url = `${THINGHSPEAK_URL}api_key=${THINGHSPEAK_API_KEY}&results=6`;
    const thinkspeak_response = await fetch(thingspeak_url);
    const data = await thinkspeak_response.json();

    response.json(data);
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
