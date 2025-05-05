function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (city === "") {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }
 
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "weather.json", true);

  xhr.onload = function () {
    if (this.status === 200) {
      const data = JSON.parse(this.responseText);
      const found = data.cities.find(
        (c) => c.name.toLowerCase() === city.toLowerCase()
      );
      
      if (found) {
        resultDiv.innerHTML = `
            <h3>Weather in ${found.name}</h3>
            <p><strong>Temperature:</strong> ${found.temperature}</p>
            <p><strong>Humidity:</strong> ${found.humidity}</p>
            <p><strong>Condition:</strong> ${found.condition}</p>
          `;
      } else {
        resultDiv.innerHTML = "<p>City not found in local data.</p>";
      }
    }
  };

  xhr.send();
}
