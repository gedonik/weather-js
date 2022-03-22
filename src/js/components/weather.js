"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const apiKey = "295660a830540346bfed82c7b33d2926",
    city = document.querySelector(".weather__city"),
    temperature = document.querySelector(".weather__temp"),
    feel = document.querySelector(".weather__feel"),
    humidity = document.querySelector(".weather__humidity"),
    pressure = document.querySelector(".weather__pressure"),
    icon = document.querySelector(".weather__icon"),
    descr = document.querySelector(".weather__descr"),
    wind = document.querySelector(".weather__wind"),
    searchInpt = document.querySelector(".weather__input"),
    searchBtn = document.querySelector(".weather__btn"),
    langSelect = document.querySelector(".weather__lang"),
    optRu = document.querySelector(".weather__ru");

  const rus = {
    lang: "ru",
    curCity: "Город",
    tempr: "Температура",
    feelsLike: "По ощущениям",
    humidity: "Влажность",
    press: "Давление",
    bar: "рт.ст",
    wind: "Скорость ветра",
    winSpeed: "м/с",
  };

  const eng = {
    lang: "en",
    curCity: "City",
    tempr: "Temperature",
    feelsLike: "Feels like",
    humidity: "Humidity",
    press: "Pressure",
    bar: "bar",
    wind: "Wind speed",
    winSpeed: "m/s",
  };

  let cityNamee = "Prague";
  let language = "eng";

  function weather(cityName, lang) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=${lang.lang}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        city.innerHTML = `${lang.curCity}: ${data.name}`;
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        descr.innerHTML = data.weather[0].description;
        temperature.innerHTML = `${lang.tempr}: ${data.main.temp} &deg;С`;
        feel.innerHTML = `${lang.feelsLike}: ${data.main.feels_like} &deg;С`;
        humidity.innerHTML = `${lang.humidity}: ${data.main.humidity}%`;
        pressure.innerHTML = `${lang.press}: ${Math.floor(
          (data.main.pressure / 133.322) * 100
        )} ${lang.bar}`;
        wind.innerHTML = `${lang.wind}: ${data.wind.speed} ${lang.winSpeed}`;
      })
      .catch((Error) => {
        alert("Error, try other city.");
        throw new Error("Error, try other city.");
      });
  }

  weather(cityNamee, changeLang());

  searchInpt.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      weather(searchInpt.value, changeLang());
      cityNamee = searchInpt.value;
      searchInpt.value = "";
    }
  });

  searchBtn.addEventListener("click", () => {
    weather(searchInpt.value, changeLang());
    cityNamee = searchInpt.value;
    searchInpt.value = "";
  });

  function changeLang() {
    langSelect.addEventListener("change", () => {
      if (!optRu.selected) {
        weather(cityNamee, eng);
        language = eng;
      } else {
        weather(cityNamee, rus);
        language = rus;
      }
    });

    if (language === "eng") {
      return eng;
    } else {
      return rus;
    }
  }
});
