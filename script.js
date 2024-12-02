//const airQuality = fetch(`https://api.waqi.info/feed/${city}/?token=d3e053b50d1e553a6dcbbcb72a09af72a9f54878`)
let inputCity = document.querySelector("#valeurCity");
let bouton = document.querySelector("#valider");
let polution = document.querySelector("#container");
let electricityDiv = document.querySelector("#electricity");
let watercontainer = document.querySelector("#watercontainer");
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
  } else {
    polution.innerHTML = `Données non disponibles pour la ville ${city}en vue de la taille de cette`;
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
    watercontainer.innerText = "Eau conforme !!";
  } else {
    watercontainer.innerText = "Eau non potable !!";
  }
}





async function getElectricQuality(city) {
  console.log("Je suis dans getElectricQuality");

  // URL pour récupérer la consommation d'électricité de la ville
  const url = `https://opendata.agenceore.fr/api/explore/v2.1/catalog/datasets/conso-elec-gaz-annuelle-par-secteur-dactivite-agregee-commune/records?limit=20&refine=libelle_commune%3A${city}`;
  console.log("URL", url);

  // Récupérer les données de l'API
  const indexElectric = await fetch(url);
  const electric = await indexElectric.json();

  // Logue la réponse complète de l'API pour voir sa structure
  console.log("Réponse complète de l'API:", electric);

  // Vérifie si les résultats existent et ont la structure attendue
  if (electric.results && electric.results.length > 0) {
    console.log("Test electricity", electric.results[0].consototale);

    const totalElectricity = electric.results[0].consototale;

    // Vérifier si l'élément est présent dans le DOM
    if (electricityDiv) {
      electricityDiv.innerHTML = `Consommation d'électricité de ${city} : ${totalElectricity} kWh par an`;
    } else {
      console.error("L'élément #electricity n'a pas été trouvé !");
    }
  } else {
    if (electricityDiv) {
      electricityDiv.innerHTML = `Données non disponibles pour la ville ${city}.`;
    }
  }
}
