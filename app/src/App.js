import React from 'react';
import { useEffect, useState } from 'react';
import Chart from './components/Chart';
import Loading from './components/Loading';
import Forcast from './components/Forcast';
import Error from './components/Error';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { format } from "date-fns";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [measurements, setMeasurements] = useState({});
  const [field, setField] = useState("field3");
  const [weather_data, setWeatherData] = useState({})
  const custom_button = {
    width: '90vw',
    fontSize: '1rem',
    fontWeight: 'meduim',
    fontFamily: 'Lucida Sans',
    margin: '0px',
    border: '0px solid blue',
  }
  // a function to retrieve data
  const fetchMeasurements = async () => {
    const response = await fetch("api/measurements")
    const data = await response.json()
    setMeasurements(data)
  }
  // to retrive data 
  const fetchWeather = () => {
    // Checking if geolocation is available
    if ("geolocation" in navigator) {
      // get coordinates
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        localStorage.setItem("summerx_lat", lat);
        localStorage.setItem("summerx_long", long);
        localStorage.setItem("summerx_locationPermission", true);
        const weather_api_url = `api/weather/${lat},${long}`
        fetch(weather_api_url)
          .then((res) => res.json())
          .then((res) => {
            const feels_like = parseInt(res.main.feels_like);
            const humidity = parseInt(res.main.humidity);
            const sunRise_ = format(new Date(res.sys.sunrise), 'p');
            const sunSet_ = format(new Date(res.sys.sunset + 47220000), 'p');
            setWeatherData({
              feels_like: feels_like,
              humidity: humidity,
              sunRise_: sunRise_,
              sunSet_: sunSet_
            })

          }).catch((error) => console.log(error))
      })
    } else {
      alert("Unable to get Location permission");
    }
  }
  // a functoin to retriev all the data
  const fetchAllData = () => {
    fetchMeasurements();
    fetchWeather();
  }
  // retriave the data after we render the view
  useEffect(() => {
    fetchAllData();         // update Measurments each 10 minutes
    setTimeout(() => setIsLoading(false), 2000)
    const timerID_1 = setInterval(fetchMeasurements, 60000);
    const timerID_2 = setInterval(fetchWeather, 600000); // update the weather every 10 minutes
    // clear intervals after unmounting
    return () => {
      clearInterval(timerID_1);
      clearInterval(timerID_2);
    }

  }, []);

  //  display the LOADING view in case of fetching the data 
  if (isLoading) {
    return (
      <main className='loading'>
        <Loading />
      </main>
    )
  }

  // if there is an error dispaly the ERROR view
  if (isError) {
    return (
      <main className='loading'>
        <Error />
      </main>
    )
  }

  // display the FORCAST bar + the BUTTONS to change the graphe + the CHART 
  return <>
    <main className="layout" >
      <Forcast weather_data={weather_data}></Forcast>
      <ButtonGroup disableElevation orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
        sx={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button sx={custom_button} onClick={() => setField("field3")}>soil moisture</Button>
        <Button sx={custom_button} onClick={() => setField("field2")}>humidity</Button>
        <Button sx={custom_button} onClick={() => setField("field4")}>light intensity</Button>
        <Button sx={custom_button} onClick={() => setField("field1")}>temperature</Button>
      </ButtonGroup>
      <Chart measurements={measurements} field={field} />
    </main>
  </>
};
export default App