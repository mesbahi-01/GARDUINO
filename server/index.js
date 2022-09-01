//Dependencies: 
//yarn add express cors twilio 

const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const { response } = require('express');
const dotenv = require('dotenv').config();

//twilio requirements -- Texting API 

const client = new twilio(dotenv.parsed.accountSid, dotenv.parsed.authToken);
const app = express(); //alias

app.use(cors()); //Blocks browser from restricting any data

app.get('/send-text', (req, res) => {
    client.messages.create({
        body: 'START',
        to: dotenv.parsed.reciever,  // Text this number
        from: dotenv.parsed.sender // From a valid Twilio number
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