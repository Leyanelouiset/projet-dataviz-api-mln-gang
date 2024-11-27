//const airQuality = fetch(`https://api.waqi.info/feed/${city}/?token=d3e053b50d1e553a6dcbbcb72a09af72a9f54878`)
let inputCity = document.querySelector("#valeurCity");
let bouton = document.querySelector("#valider");
let city = "";

bouton.addEventListener("click", () => {
  city = inputCity.value;
  console.log("test", city);
  getAirQuality(city);
});

async function getAirQuality() {
  const airQuality = await fetch(`https://api.waqi.info/feed/${city}/?token=d3e053b50d1e553a6dcbbcb72a09af72a9f54878`);
  const indexAir = await airQuality.json();
  console.log("test API", indexAir);
}
//let result =getAirQuality()
