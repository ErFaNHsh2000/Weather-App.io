const bgImg = document.getElementById("BgImage");
const loaders = document.querySelector(".loaders");
const SearchBox = document.querySelector(".SearchBox");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const ResultTable = document.querySelector(".ResultTable");
const place = document.querySelector(".place");
const temperature = document.querySelector(".temperature");
const weatherCondition = document.querySelector(".weatherCondition");
const weatherIcon = document.querySelector(".icon");
const moveDeg = document.querySelector(".moveDeg");
const speed = document.querySelector(".speed");
const clock = document.querySelector(".CurrentClock");
const day = document.querySelector(".CurrentDay");

import Swal from 'sweetalert2'

const keyid = "7ab9259f7605374feefeeb7ceb852905";

btn.addEventListener("click", () => {
  SearchBox.classList.toggle("active");
  input.focus();
});

bgImg.addEventListener("click", () => {
  input.value = "";
  SearchBox.classList.remove("active");
  ResultTable.classList.remove("active");
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    getweather(input.value);
  } else {
    ResultTable.classList.remove("active");
  }
});

async function getweather(CityName) {
  var info = await await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${keyid}`
  ).then((response) => response.json());

  console.log(info);

  setinfo(info);
}

function setinfo(data) {
  if (data["message"]) {
    Swal.fire({
      icon: "error",
      html: "<p>City not found</p>",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown",
      },
    });

    input.value = "";
  } else {
    ResultTable.classList.add("active");
    let currentdate = new Date();
    temp = (data["main"]["temp"] - 273).toFixed(0);
    place.innerHTML = `${data["sys"]["country"]}, ${data["name"]}`;
    temperature.innerHTML = `<span>${temp}&deg;</span>`;
    weatherCondition.innerHTML = `${data["weather"][0]["description"]}`;
    moveDeg.innerHTML = `<i class="wi wi-wind-direction"></i>${data["wind"]["deg"]} deg`;
    speed.innerHTML = `<i class="wi wi-strong-wind"></i>${data["wind"]["speed"]} Km/h`;

    clock.innerHTML =
      (currentdate.getHours() < 10
        ? `0${currentdate.getHours()}`
        : currentdate.getHours()) +
      ":" +
      (currentdate.getMinutes() < 10
        ? `0${currentdate.getMinutes()}`
        : currentdate.getMinutes()) +
      ":" +
      (currentdate.getSeconds() < 10
        ? `0${currentdate.getSeconds()}`
        : currentdate.getSeconds());

    day.innerHTML =
      currentdate.getFullYear() +
      "/" +
      currentdate.getMonth() +
      "/" +
      currentdate.getDate();

    switch (data["weather"][0]["main"]) {
      case "Clouds":
        weatherIcon.innerHTML = `<i class="wi wi-cloudy"></i>`;
        break;
      case "Clear":
        weatherIcon.innerHTML = `<i class="wi wi-day-sunny"></i>`;
        break;
      case "Rain":
        weatherIcon.innerHTML = `<i class="wi wi-rain"></i>`;
        break;
      case "Snow":
        weatherIcon.innerHTML = `<i class="wi wi-snow"></i>`;
        break;
      case "Wind":
        weatherIcon.innerHTML = `<i class="wi wi-cloudy-gusts"></i>`;
        break;
      case "Fog":
        weatherIcon.innerHTML = `<i class="wi wi-fog"></i>`;
        break;
      case "Sleet":
        weatherIcon.innerHTML = `<i class="wi wi-sleet"></i>`;
        break;
      case "Thunderstorm":
        weatherIcon.innerHTML = `<i class="wi wi-thunderstorm"></i>`;
        break;

      default:
        weatherIcon.innerHTML = `<i class="wi wi-cloudy></i>`;
        break;
    }
  }
}
