class PokemonCatalog {
  constructor() {
    this.content = document.getElementById("catalog-content");
    this.catalogButton = document.getElementById("catalog-button");
    this.searchInput = document.getElementById("search-input");
    this.cardList = [];
    this.API_ID = ["xy1-1", "swsh4-25"];
    this.renderCard = this.renderCard.bind(this);
    this.getCard = this.getCard.bind(this);
    this.addCard = this.addCard.bind(this);
    this.searchCard = this.searchCard.bind(this);
    this.searchInput.addEventListener("input", this.searchCard);
    this.catalogButton.addEventListener("click", this.addCard);
    document.addEventListener("DOMContentLoaded", this.addCard);
  }

  getRandomApiUrl = () => {
    const randomIndex = Math.floor(Math.random() * this.API_ID.length);
    const selectedId = this.API_ID[randomIndex];
    return `https://api.pokemontcg.io/v2/cards/${selectedId}`;
  };

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
    for (let i = 0; i <= 3; i++) {
      await this.getCard();
    }
    this.renderCard();
  }

  renderCard() {
    const fragment = document.createDocumentFragment();
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
    this.content.innerHTML = "";
    this.content.appendChild(fragment);
  }

  searchCard(e) {
    try {
      const value = e.target.value;
      const removedCards = [];

      for (let i = this.cardList.length - 1; i >= 0; i--) {
        const card = this.cardList[i];
        const name = card.name;
        const isVisible = name.toLowerCase().includes(value.toLowerCase());
        if (!isVisible) {
          removedCards.push(this.cardList.splice(i, 1)[0]);
        }
      }

      for (const removedCard of removedCards) {
        const name = removedCard.name;
        const isVisible = name.toLowerCase().includes(value.toLowerCase());
        if (isVisible) {
          this.cardList.push(removedCard);
        }
      }

      this.renderCard();
    } catch (error) {
      console.error(error);
    }
  }
}

const pokemonCatalog = new PokemonCatalog();
