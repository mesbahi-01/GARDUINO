# Measure anything, anywhere
Garduino offers a simple way to get real-time measurements for your garden. Now you can measure all the important factors that affect your plants growth with just a few clicks.

## Features section:
### Monitor your plants

Monitor soil moisture, air humidity, air temperature, light intensity and other important environmental factors in your garden. 

### Know what's going on inside and outside

Get detailed information of the measurements made by Garduino , moreover it can provide you a brief weather forecast .

### Work remotely or hands-on

there's no need to worry about watering or fertilizing anymore! the arduino do all the heavy lefting for you ,and even if you want to do that yourself ,easy just click a button or send it a message from your phone .

## Screenshots

![Home page](https://github.com/mesbahi-01/GARDUINO/blob/master/app/src/images/demo_01.jpeg)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`TWILIO_ACCOUNT_SID`
`TWILIO_AUTH_TOKEN`
`TWILIO_PHONE_NUMBER`
`CART_SIM_NUMBER`
`OPENWEATHER_API_KEY`

## To Run Locally

Clone the project

```bash
  git clone https://github.com/mesbahi-01/GARDUINO.git
```

Go to the project directory

```bash
  cd GARDUINO_PROJECT
```
Go to the app directory

```bash
  cd app
```

Install dependencies

```bash
  npm install
```
Start the React app 

```bash
  npm start
```

Go to the server directory

```bash
  cd ../server
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```