// Ajout d'un écouteur d'événement pour le bouton de recherche
document.getElementById("searchButton").addEventListener("click", function () {
  // Récupération de l'ID du Pokémon saisi par l'utilisateur
  let pokemonId = document.getElementById("pokemonId").value;

  // Vérification que l'ID est compris entre 1 et 893
  if (pokemonId < 1 || pokemonId > 893) {
    alert("L'ID doit être compris entre 1 et 893");
    return;
  }

  // Requête Fetch pour obtenir les informations du Pokémon
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
    .then((response) => response.json())
    .then((data) => {
      // Récupération des informations en français
      let pokemonName = data.names.find(
        (name) => name.language.name === "fr"
      ).name;
      let captureRate = data.capture_rate;
      let pokemonColor = data.color.name;
      let pokemonFamily = data.genera.find(
        (genus) => genus.language.name === "fr"
      ).genus;
      let pokemonDescription = data.flavor_text_entries.find(
        (entry) => entry.language.name === "fr"
      ).flavor_text;

      // Requête Fetch pour obtenir l'image du Pokémon
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => response.json())
        .then((pokemonData) => {
          let pokemonImage = pokemonData.sprites.front_default;

          // Affichage des informations du Pokémon
          document.getElementById("pokemonInfo").innerHTML = `
                        <div style="border-color: ${pokemonColor};">
                            <img src="${pokemonImage}" alt="${pokemonName}">
                            <h2>${pokemonName}</h2>
                            <p><strong>Taux de capture :</strong> ${captureRate}</p>
                            <p><strong>Famille :</strong> ${pokemonFamily}</p>
                            <p><strong>Description :</strong> ${pokemonDescription}</p>
                        </div>
                    `;
        });
    })
    .catch((error) => {
      console.error("Erreur:", error);
      alert(
        "Une erreur s'est produite lors de la récupération des données du Pokémon."
      );
    });
});
