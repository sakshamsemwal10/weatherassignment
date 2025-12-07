async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    // Step 1: Convert city name -> latitude & longitude
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        document.getElementById("weatherResult").innerHTML =
            "City not found!";
        return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;

    // Step 2: Fetch weather based on coordinates
    const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const temp = weatherData.current_weather.temperature;
    const wind = weatherData.current_weather.windspeed;

    document.getElementById("weatherResult").innerHTML = `
        <h3>Weather in ${city}</h3>
        <p>🌡 Temperature: <b>${temp}°C</b></p>
        <p>💨 Wind Speed: <b>${wind} km/h</b></p>
    `;
}
