//const airQuality = fetch(`https://api.waqi.info/feed/${city}/?token=d3e053b50d1e553a6dcbbcb72a09af72a9f54878`)
let inputCity = document.querySelector("#valeurCity");
let bouton = document.querySelector("#valider");
let polution = document.querySelector("#container");
let city = "";

bouton.addEventListener("click", () => {
  city = inputCity.value;
  console.log("test", city);
  getAirQuality(city);
});

async function getAirQuality() {
  const airQuality = await fetch(
    `https://api.waqi.info/feed/${city}/?token=d3e053b50d1e553a6dcbbcb72a09af72a9f54878`
  );
  const indexAir = await airQuality.json();
  console.log("test API", indexAir.data.aqi);
  if (indexAir.data.aqi <= 100) {
    polution.style.width = "60px";
    polution.style.height = "100px";
    polution.style.backgroundColor = "green";
  } else if (indexAir.data.aqi <= 200) {
    polution.style.width = "60px";
    polution.style.height = "100px";
    polution.style.backgroundColor = "red";
  } else if (indexAir.data.aqi > 200) {
    polution.style.width = "60px";
    polution.style.height = "100px";
    polution.style.backgroundColor = "purple";
  }
}
