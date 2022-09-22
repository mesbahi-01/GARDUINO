import React, { useEffect, useState } from "react"
import sunRise from "../images/sunRise.png"
import sunSet from "../images/sunSet.png"
import temperatur_ from "../images/temperatur.png"
import Button from '@mui/material/Button'
import time from '../images/time.png'
import SendIcon from '@mui/icons-material/Send'
import humidity_ from '../images/humidity.png'
import { format } from 'date-fns'

const Forcast = ({ weather_data }) => {
    const { sunSet_, sunRise_, humidity, feels_like } = weather_data;
    const [currentTime, setCurrentTime] = useState(() => format(new Date(), "p"));
    const [color, setColor] = useState("primary");

    // send a Text message to the arduino 
    const sendText = () => {
        fetch("/api/send-text")
            .then(res => {
                if (res.status >= 200 && res.status <= 299) {
                    setColor("success")
                    setTimeout(() => setColor("primary"), 3000)
                }
                else {
                    setColor("error")
                    setTimeout(() => setColor("primary"), 3000)
                }
                console.log(res);
            })
            .catch((err) => {
                alert('Something went wrong please try again')
                console.log(err)
            })
    }

    // update the locale time every minute 

    useEffect(() => {
        const timerID = setInterval(() => {
            setCurrentTime(() => format(new Date(), "p"));
        }, 59000);
        return () => clearInterval(timerID);
    }, []);

    return (
        <header className="item1">
            <img src={time} alt="" className="time_img" />
            <span className="time">{currentTime}</span>
            <img src={temperatur_} alt="" />
            <span className="comment">Feels Like {feels_like}°C</span>
            <img src={humidity_} alt="" />
            <span className='humidity'>humidity {humidity}%</span>
            <img src={sunRise} alt="" className="sun_rise_set" />
            <span>{sunRise_}</span>
            <img src={sunSet} alt="" className="sun_rise_set" />
            <span>{sunSet_}</span>
            <Button variant="contained" size='small' onClick={sendText} endIcon={<SendIcon fontSize='small' />} color={color}>
                Send
            </Button>
        </header>
    )
}
export default Forcast;