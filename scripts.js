window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const OpenWeatherMap = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
      exclude=hourly,daily&appid=7f7408bc4439da90460dedfbf9623ae9&units=imperial`;

      fetch(OpenWeatherMap)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.current;
          //Set DOM elements form the api
          temperatureDegree.textContent = temp;

          const { description } = data.current.weather[0];
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.timezone;

          //Formula for Celsius
          let celsius = (temp - 32) * (5 / 9);

          //Change to Celsius
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }
});
