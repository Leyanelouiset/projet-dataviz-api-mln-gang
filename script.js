//const airQuality = fetch(`https://api.waqi.info/feed/${city}/?token=d3e053b50d1e553a6dcbbcb72a09af72a9f54878`)
let inputCity = document.querySelector("#valeurCity");
let bouton = document.querySelector("#valider");
let polution = document.querySelector("#container");
let city = "";

bouton.addEventListener("click", () => {
  city = inputCity.value;
  console.log("test", city);
  getAirQuality(city);
  getWaterQuality(city);
  getElectricQuality(city);
});

async function getAirQuality() {
  const airQuality = await fetch(
    `https://api.waqi.info/feed/${city}/?token=d3e053b50d1e553a6dcbbcb72a09af72a9f54878`
  );
  const indexAir = await airQuality.json();
  console.log("test air", indexAir.data.aqi);
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

async function getWaterQuality() {
  const waterQuality = await fetch(
    `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?nom_commune=${city}`
  );
  const indexEau = await waterQuality.json();
  console.log("test eau", indexEau.data[0].conformite_limites_bact_prelevement);
  if (
    indexEau.data[0].conformite_limites_bact_prelevement == "C" &&
    indexEau.data[0].conformite_limites_pc_prelevement == "C" &&
    indexEau.data[0].conformite_references_bact_prelevement == "C" &&
    indexEau.data[0].conformite_references_pc_prelevement == "C"
  ) {
    polution.innerText = "Eau conforme !!";
  } else {
    polution.innerText = "Eau non potable !!";
  }
}
async function getElectricQuality(city) {
  console.log("je suis dans getElectricQuality");
  const url = `https://opendata.agenceore.fr/api/explore/v2.1/catalog/datasets/conso-elec-gaz-annuelle-par-secteur-dactivite-agregee-commune/records?limit=20&refine=libelle_commune%3A${city}`;
  console.log("url", url);
  const indexElectric = await fetch(url);
  const electric = await indexElectric.json();
  console.log(
    "je suis dans getElectricQuality, je regarde electric:",
    electric.results[0].consototale
  );
}
