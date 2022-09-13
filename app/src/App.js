import React from 'react';
import { useEffect, useState } from 'react';
import Chart from './components/Chart';
import Loading from './components/Loading';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Forcast from './components/Forcast';
import Error from './components/Error';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [measurements, setMeasurements] = useState({});
  const [field, setField] = useState("field1");

  const fetchMeasurements = async () => {
    setIsLoading(true);
    const response = await fetch("/measurements")
    const data = await response.json()
    setMeasurements(data)
    setIsLoading(false)
  };

  // retriave the data after we render the view
  useEffect(() => {
    fetchMeasurements();
  }, []);

  // call the function "fetchMeasurments" every 15 minutes
  setInterval(fetchMeasurements, 900000);

  // if we are fetching the data from Thinkspeak display the LOADING view
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
      <Forcast></Forcast>
      <ButtonGroup vertical className='btns'>
        <Button onClick={() => setField("field1")}>temperature </Button>
        <Button onClick={() => setField("field2")} >humidity</Button>
        <Button onClick={() => setField("field3")}>soil moisture</Button>
        <Button onClick={() => setField("field4")}>light intensity</Button>
      </ButtonGroup>
      <Chart measurements={measurements} field={field} />
    </main>
  </>
};
export default App