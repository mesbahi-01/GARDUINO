//Dependencies: 
//yarn add express cors twilio 

const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const dotenv = require('dotenv').config();

//twilio requirements -- Texting API 

const client = new twilio(dotenv.parsed.TWILIO_ACCOUNT_SID, dotenv.parsed.TWILIO_AUTH_TOKEN);
const app = express(); //alias

app.use(cors()); //Blocks browser from restricting any data

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
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
