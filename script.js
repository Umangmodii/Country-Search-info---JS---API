
    // Fetch data from API and create cards
    async function fetchData() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryCards = document.getElementById('countryCards');

        data.forEach(country => {
          const card = createCard(country);
          countryCards.appendChild(card);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Create a card for a country
    function createCard(country) {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-3');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card', 'h-100');

      const cardImg = document.createElement('img');
      cardImg.classList.add('card-img-top');
      cardImg.src = country.flags.png;
      cardImg.alt = `${country.name.common} Flag`;

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = country.name.common;

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = `Capital: ${country.capital}`;

      const cardRegion = document.createElement('p');
      cardRegion.classList.add('card-text');
      cardRegion.textContent = `Region: ${country.region}`;

      const cardLanguage = document.createElement('p');
      cardLanguage.classList.add('card-text');
      cardLanguage.textContent = `Language: ${Object.values(country.languages).join(', ')}`;

      const cardPopulation = document.createElement('p');
      cardPopulation.classList.add('card-text');
      cardPopulation.textContent = `Population: ${country.population.toLocaleString()}`;

cardBody.appendChild(cardImg);
cardBody.appendChild(cardTitle);
cardBody.appendChild(cardText);
cardBody.appendChild(cardRegion);
cardBody.appendChild(cardLanguage);
cardBody.appendChild(cardPopulation);
card.appendChild(cardBody);

return card;
}

// Filter country cards based on search input
function filterCards(searchInput) {
const countryCards = document.getElementById('countryCards');
const cards = countryCards.querySelectorAll('.col-md-4');

cards.forEach(card => {
  const countryName = card.querySelector('.card-title').textContent.toLowerCase();
  const countryCapital = card.querySelectorAll('.card-text')[0].textContent.toLowerCase();
  const countryRegion = card.querySelectorAll('.card-text')[1].textContent.toLowerCase();
  const countryLanguage = card.querySelectorAll('.card-text')[2].textContent.toLowerCase();
  const countryPopulation = card.querySelectorAll('.card-text')[3].textContent.toLowerCase();

  if (countryName.includes(searchInput.toLowerCase()) || countryCapital.includes(searchInput.toLowerCase()) || countryRegion.includes(searchInput.toLowerCase()) || countryLanguage.includes(searchInput.toLowerCase()) || countryPopulation.includes(searchInput.toLowerCase())) {
    card.style.display = 'block'; // Show card
  } else {
    card.style.display = 'none'; // Hide card
  }
});
}

// Call fetchData function when the page loads
window.onload = fetchData;

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', function (event) {
event.preventDefault(); // Prevent default form submission
const searchInput = document.getElementById('searchInput').value;
filterCards(searchInput);
});
