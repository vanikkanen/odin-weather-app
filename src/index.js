import "./styles.css";

const searchLocation = "Tampere";

async function getCurrentWeather(location) {
  try {
    const weatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=NTJQ6DFUHRNRWS36QK9MWYP46&contentType=json`;

    const response = await fetch(weatherAPI, { mode: "cors" });
    const weatherObj = await response.json();
    console.log(weatherObj.currentConditions);
  } catch (error) {
    console.log(error);
  }
}

getCurrentWeather(searchLocation);
