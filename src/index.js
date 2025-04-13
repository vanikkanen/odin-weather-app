import "./styles.css";
import { convertToCelsius, convertToFahrenheit } from "./tempConversion";

const defaultLocation = "Tampere";

const input = document.querySelector("#location");
const weatherIcon = document.querySelector(".weather-icon");
const weatherTemp = document.querySelector(".weather-temp");
const weatherTime = document.querySelector(".weather-time");
const weatherCondition = document.querySelector(".weather-condition");
const toggleBtn = document.querySelector(".toggle-button");
let celsius = true;

async function getCurrentWeather(location) {
  try {
    clearPage();
    const loadingElement = document.querySelector(".loading");
    loadingElement.textContent = "LOADING...";
    const weatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=NTJQ6DFUHRNRWS36QK9MWYP46&contentType=json`;

    const response = await fetch(weatherAPI, { mode: "cors" });
    const weatherObj = await response.json();
    loadingElement.textContent = "";

    populatePage(weatherObj.currentConditions);
  } catch (error) {
    console.log(error);
  }
}

function clearPage() {
  weatherIcon.innerHTML = "";
  weatherTemp.textContent = "";
  weatherTime.textContent = "";
  weatherCondition.textContent = "";
}

function populatePage(currentConditions) {
  const tempString = !celsius
    ? `${currentConditions.temp} °F`
    : `${convertToCelsius(+currentConditions.temp)} °C`;

  weatherTemp.textContent = tempString;
  weatherTime.textContent = currentConditions.datetime;
  weatherCondition.textContent = currentConditions.conditions;

  const iconName = currentConditions.icon;
  const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/${iconName}.svg`;

  const iconImg = document.createElement("img");
  iconImg.src = iconUrl;
  iconImg.alt = iconName;
  iconImg.width = 64;
  weatherIcon.appendChild(iconImg);
}

document.querySelector(".weather-button").addEventListener("click", () => {
  getCurrentWeather(input.value);
});

toggleBtn.addEventListener("click", () => {
  celsius = !celsius;
  const temp = parseFloat(weatherTemp.textContent);
  console.log(temp);
  const tempString = !celsius
    ? `${convertToFahrenheit(+temp)} °F`
    : `${convertToCelsius(+temp)} °C`;
  if (celsius) {
    toggleBtn.textContent = "°C";
  } else {
    toggleBtn.textContent = "°F";
  }
  weatherTemp.textContent = tempString;
});

getCurrentWeather(defaultLocation);
