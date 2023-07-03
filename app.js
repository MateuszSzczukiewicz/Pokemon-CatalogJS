class PokemonCatalog {
  constructor() {
    this.content = document.getElementById("catalog-content");
    this.catalogButton = document.getElementById("catalog-button");
    this.searchInput = document.getElementById("search-input");
    this.cardList = [];
    this.API_ID = ["xy1-1", "swsh4-25"];
    this.searchCard = this.searchCard.bind(this);
    this.addCard = this.addCard.bind(this);
    this.searchInput.addEventListener("input", this.searchCard);
    this.catalogButton.addEventListener("click", this.addCard);
    document.addEventListener("DOMContentLoaded", this.addCard);
  }

  getRandomApiUrl() {
    const randomIndex = Math.floor(Math.random() * this.API_ID.length);
    const selectedId = this.API_ID[randomIndex];
    return `https://api.pokemontcg.io/v2/cards/${selectedId}`;
  }

  async getCard() {
    try {
      const response = await fetch(this.getRandomApiUrl());
      const data = await response.json();
      this.cardList.push(data.data);
      console.log(this.cardList);
    } catch (err) {
      console.log(err);
    }
  }

  async addCard() {
    const cardCount = 4;
    for (let i = 0; i < cardCount; i++) {
      await this.getCard();
    }
    this.renderCard();
  }

  renderCard() {
    const fragment = document.createDocumentFragment();
    this.content.innerHTML = "";
    this.cardList.forEach(
      ({ name, number, images, supertype, subtypes, rarity }) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card">
          <div class="card__header">
              <h2 class="card__text">${name}</h2>
              <p class="card__text card__text-right">Nr.${number}</p>
          </div>
          <div class="description">
              <img src="${images.small}" alt="${name}" class="card-img-top">
              <p class="card__text"><b>Supertype: </b>${supertype}</p>
              <p class="card__text"><b>Subtype: </b>${subtypes}</p>
              <p class="card__text"><b>Rarity: </b>${rarity}</p>
          </div>
        </div>
        `;
        fragment.appendChild(div);
      }
    );
    this.content.appendChild(fragment);
  }

  searchCard(e) {
    const value = e.target.value.toLowerCase();
    const removedCards = [];

    for (let i = this.cardList.length - 1; i >= 0; i--) {
      const card = this.cardList[i];
      const name = card.name.toLowerCase();
      const isVisible = name.includes(value);
      if (!isVisible) {
        removedCards.push(this.cardList.splice(i, 1)[0]);
      }
    }

    for (const removedCard of removedCards) {
      const name = removedCard.name.toLowerCase();
      const isVisible = name.includes(value);
      if (isVisible) {
        this.cardList.push(removedCard);
      }
    }

    this.renderCard();
  }
}

const pokemonCatalog = new PokemonCatalog();
