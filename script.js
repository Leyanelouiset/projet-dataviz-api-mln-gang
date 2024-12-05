//const airQuality = fetch(`https://api.waqi.info/feed/${city}/?token=d3e053b50d1e553a6dcbbcb72a09af72a9f54878`)
let inputCity = document.querySelector("#valeurCity");
let bouton = document.querySelector("#valider");
let polution = document.querySelector("#container");
let electricityDiv = document.querySelector("#electricity");
let watercontainer = document.querySelector("#watercontainer");
let goutte1 = document.querySelector("#goutte1");
let goutte2 = document.querySelector("#goutte2");
let lac = document.querySelectorAll(".lac");
let city = "";
let isLoading = false;

bouton.addEventListener("click", () => {
  city = inputCity.value;
  console.log("test", city);
  fetchScript();
});

function toggleLoader() {
  document.querySelector('.loader-container').classList.toggle('_hide', !isLoading);
}


async function fetchScript() {
  try {
      isLoading = true;
      toggleLoader();
      await getAirQuality(city);
      await getWaterQuality(city);
      await getElectricQuality(city);
  } catch (error) {
      console.error(error);
      return 'error';
  } finally {
      isLoading = false;
      toggleLoader();
  }
}


async function getAirQuality() {
  const airQuality = await fetch(
    `https://api.waqi.info/feed/${city}/?token=d3e053b50d1e553a6dcbbcb72a09af72a9f54878`
  );
  const indexAir = await airQuality.json();
  console.log("test air", indexAir.data.aqi);
  if (indexAir.data.aqi <= 70) {
    document.body.style.background = "linear-gradient(#DCF0F5, #C2E4EC, #A5D7E2)";
  } else if (indexAir.data.aqi <= 120) {
    document.body.style.background = "linear-gradient(#E1DB9C, #CAC9C9)";
  } else if (indexAir.data.aqi > 120) {
    document.body.style.background = "linear-gradient(#708155, #CAC9C9)";
  } else {
    polution.innerHTML = `Données non disponibles sur l'air pour cette ville, ${city}`;
  }
  document.body.style.width = "100vw";
  document.body.style.height = "100vh";
}

async function getWaterQuality() {
  console.log("test eau debut");
  const waterQuality = await fetch(
    `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?nom_commune=${city}`
  );
  const indexEau = await waterQuality.json();
  if (indexEau.count > 0) {
    if (
      indexEau.data[0].conformite_limites_bact_prelevement == "C" &&
      indexEau.data[0].conformite_limites_pc_prelevement == "C" &&
      indexEau.data[0].conformite_references_bact_prelevement == "C" &&
      indexEau.data[0].conformite_references_pc_prelevement == "C"
    ) {
      watercontainer.innerText = "✅✅✅";
      goutte1.style.fill = "#48C5F2";
      goutte2.style.fill = "#48C5F2";
      for (let i = 0; i < lac.length; i++) {
        lac[i].style.fill = "#48C5F2";
      }
    } else {
    goutte1.style.fill = "#398764";
    goutte2.style.fill = "#398764";
        for (let i = 0; i < lac.length; i++) {
          lac[i].style.fill = "#398764";
        }
      watercontainer.innerText = "❌❌❌";
    }
  } else {
    watercontainer.innerText = `Pas de données sur l'eau à cette ville, ${city}`;
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
      electricityDiv.innerHTML = `${city} : 💡${totalElectricity}💡`;
    } else {
      console.error("L'élément #electricity n'a pas été trouvé !");
    }
  } else {
    if (electricityDiv) {
      electricityDiv.innerHTML = `Données non disponibles pour l'électricité de cette ville ${city}.`;
    }
  }
}
