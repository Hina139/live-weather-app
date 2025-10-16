// Select elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCondition");
const tempCard = document.getElementById("temperature");
const windCard = document.getElementById("wind");
const overlay = document.querySelector(".overlay");

// Your WeatherAPI key
const apiKey = "b011c70353734d4a83f104428251510"; // replace if needed

// Function to fetch weather
async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return alert("Please enter a city!");

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      alert(data.error.message);
      return;
    }

    // Update cards
    weatherCard.innerText = data.current.condition.text;
    tempCard.innerText = `${data.current.temp_c} °C`;
    windCard.innerText = `${data.current.wind_kph} km/h`;

    // Dynamic background based on weather type
    const temp = data.current.temp_c;
    const condition = data.current.condition.text.toLowerCase();

    if (condition.includes("rain")) {
      overlay.style.backgroundColor = "rgba(0,0,80,0.6)";
    } else if (condition.includes("snow") || temp < 10) {
      overlay.style.backgroundColor = "rgba(0,120,255,0.5)";
    } else if (condition.includes("clear") && temp > 25) {
      overlay.style.backgroundColor = "rgba(255,180,0,0.5)";
    } else if (condition.includes("cloud")) {
      overlay.style.backgroundColor = "rgba(100,100,100,0.5)";
    } else {
      overlay.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong! Check your API key or internet.");
  }
}

// Event listener
searchBtn.addEventListener("click", getWeather);

// Optional: press Enter to search
cityInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") getWeather();
});
