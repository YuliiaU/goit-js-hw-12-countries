const BASE_URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountries(searchQuery) {

  return fetch(`${BASE_URL}/name/${searchQuery}`)
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("Error fetching data");
  });
}