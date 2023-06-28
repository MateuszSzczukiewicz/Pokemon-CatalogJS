const content = document.getElementById("catalog-content");
const catalogButton = document.getElementById("catalog-button");
const search = document.getElementById("search-input");
const API_KEY = "cc4a5f02-6fa6-41fb";
const API_ID = ["xy1-1", "swsh4-25"];
const API_URL = `https://api.pokemontcg.io/v2/cards/${
  API_ID[Math.floor(Math.random() * API_ID.length)]
}`;

const cardApi = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    const cardData = await response.json();
    const cardName = cardData.data.name;
    const cardNr = cardData.data.number;
    const cardImage = cardData.data.images.small;
    const cardSupertype = cardData.data.supertype;
    const cardSubtype = cardData.data.subtypes[0];
    const cardRarity = cardData.data.rarity;
    return {
      cardName,
      cardNr,
      cardImage,
      cardSupertype,
      cardSubtype,
      cardRarity,
    };
  } catch (error) {
    console.error(error);
  }
};

const renderCard = async () => {
  try {
    const data = await cardApi();
    const card = `
    <div class="card">
      <div class="card__header">
          <h2 class="card__text">${data.cardName}</h2>
          <p class="card__text card__text-right">Nr.${data.cardNr}</p>
      </div>
      <div class="description">
          <img src="${data.cardImage}" alt="${data.cardName}" class="card-img-top">
          <p class="card__text"><b>Supertype: </b>${data.cardSupertype}</p>
          <p class="card__text"><b>Subtype: </b>${data.cardSubtype}</p>
          <p class="card__text"><b>Rarity: </b>${data.cardRarity}</p>
      </div>
    </div>
      `;
    for (let i = 0; i <= 3; i++) {
      content.innerHTML += card;
    }
    return card;
  } catch (error) {
    console.error(error);
  }
};

const searchCard = async (e) => {
  try {
    const cards = document.querySelectorAll(".card");
    const value = e.target.value;

    for (let i = 0; i <= cards.length; i++) {
      const card = cards[i];
      const data = await cardApi();
      const isVisible = data.cardName
        .toLowerCase()
        .includes(value.toLowerCase());
      card.style.display = isVisible ? "block" : "none";
    }
  } catch (error) {
    console.error(error);
  }
};

search.addEventListener("input", searchCard);
document.addEventListener("DOMContentLoaded", renderCard);
catalogButton.addEventListener("click", renderCard);
