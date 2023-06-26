const content = document.getElementById("catalog-content");

(async () => {
  try {
    const response = await fetch("https://api.pokemontcg.io/v2/cards/xy1-1", {
      method: "GET",
      headers: {
        "X-Api-Key": "cc4a5f02-6fa6-41fb-92ca-b21087a41ad5",
      },
    });
    const cardData = await response.json();
    const cardId = cardData.data.id;
    const cardName = cardData.data.name;
    const cardNr = cardData.data.number;
    const cardImage = cardData.data.images.small;
    const cardSupertype = cardData.data.supertype;
    const cardSubtype = cardData.data.subtypes[0];
    const cardRarity = cardData.data.rarity;
    console.log(
      cardId,
      cardName,
      cardNr,
      cardImage,
      cardSupertype,
      cardSubtype,
      cardRarity
    );
  } catch (error) {
    console.error(Error);
  }
})();
