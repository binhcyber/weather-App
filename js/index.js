let search = document.querySelector(".search").value.trim();
let capital = document.querySelector(".capital");
let acb = document.querySelector(".country");
let degree = document.querySelector(".degree");
let sky = document.querySelector(".sky");
let date = document.querySelector(".date");
let visible = document.querySelector(".visible");
let wind = document.querySelector(".wind__desc");
let humidity = document.querySelector(".sun__desc");
let content = document.querySelector(".weather__info");
let body = document.querySelector("body");
document.querySelector(".search").addEventListener("keyup", () => {
  let search = document.querySelector(".search").value.trim();
  if (search === "") {
    getWeather("Ho Chi Minh");
  } else {
    getWeather(search);
  }
});
// Dùng fetch lấy dữ liệu API
function getWeather(search) {
  let geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=950e030c8b60c7670445859d6c9d8f84`;
  fetch(geoApi)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res[0].lat, res[0].lon);
      let { lat, lon } = {
        lat: res[0].lat,
        lon: res[0].lon,
      };
      getLocation(lat, lon);
    });
}
// Dùng fetch kết hợp với với async await
// async function getWeather(search) {
//   let geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=950e030c8b60c7670445859d6c9d8f84`;
//   let data = await fetch(geoApi).then((res) => res.json());
//   console.log(data);
//   let { lat, lon } = {
//     lat: data[0].lat,
//     lon: data[0].lon,
//   };
//   getLocation(lat, lon);
// }
getWeather("Ho Chi Minh");

async function getLocation(lat, lon) {
  // console.log(lat, lon);
  let locationApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=950e030c8b60c7670445859d6c9d8f84`;
  let dataLocation = await fetch(locationApi).then((res) => res.json());
  console.log(dataLocation);
  capital.innerHTML = dataLocation.name;
  acb.innerHTML = dataLocation.sys.country;
  degree.innerHTML = Math.floor(dataLocation.main.temp - 273.15);
  let getDegree = degree.innerHTML;
  sky.innerHTML = dataLocation.weather[0] ? dataLocation.weather[0].main : "";
  visible.innerHTML = dataLocation.visibility + "(m)";
  wind.innerHTML = dataLocation.wind.speed + "(m/s)";
  humidity.innerHTML = dataLocation.main.humidity + "(%)";
  date.innerHTML = new Date().toLocaleString("vi");

  if (getDegree <= 20 && getDegree > 10) {
    body.setAttribute("class", "cool");
  }
  if (getDegree <= 10) {
    body.setAttribute("class", "cold");
  }
  if (getDegree > 20 && getDegree <= 30) {
    body.setAttribute("class", "warm");
  }
  if (getDegree > 30) {
    body.setAttribute("class", "hot");
  }
}
