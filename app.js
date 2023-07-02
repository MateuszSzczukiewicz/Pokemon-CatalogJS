const content = document.getElementById("catalog-content");
const catalogButton = document.getElementById("catalog-button");
const searchInput = document.getElementById("search-input");

let cardList = [];

const API_KEY = "cc4a5f02-6fa6-41fb";
const API_ID = ["xy1-1", "swsh4-25"];

const getRandomApiUrl = () => {
  const randomIndex = Math.floor(Math.random() * API_ID.length);
  const selectedId = API_ID[randomIndex];
  return `https://api.pokemontcg.io/v2/cards/${selectedId}`;
};

const renderCard = () => {
  const fragment = document.createDocumentFragment();
  cardList.forEach(({ name, number, images, supertype, subtype, rarity }) => {
    const div = document.createElement("div");
    div.classList.add("beer");
    div.innerHTML = `
        <div class="card">
          <div class="card__header">
              <h2 class="card__text">${name}</h2>
              <p class="card__text card__text-right">Nr.${number}</p>
          </div>
          <div class="description">
              <img src="${images.small}" alt="${name}" class="card-img-top">
              <p class="card__text"><b>Supertype: </b>${supertype}</p>
              <p class="card__text"><b>Subtype: </b>${subtype}</p>
              <p class="card__text"><b>Rarity: </b>${rarity}</p>
          </div>
        </div>
        </div>
        `;
    fragment.appendChild(div);
  });
  content.innerHTML = "";
  content.appendChild(fragment);
};

const getCard = async () => {
  try {
    const response = await fetch(getRandomApiUrl());
    const data = await response.json();
    cardList.push(data.data);
    console.log(cardList);
  } catch (err) {
    console.log(err);
  }
};

const addCard = async () => {
  for (let i = 0; i <= 3; i++) {
    await getCard();
  }
  renderCard();
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

searchInput.addEventListener("input", searchCard);
document.addEventListener("DOMContentLoaded", addCard);
catalogButton.addEventListener("click", addCard);
