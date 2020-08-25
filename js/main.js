const searchForm = document.querySelector(".search");
const searchResults = document.querySelector(".results__list");
let searchQuery = "";
const App_Id = "9a6e4156";
const App_Key = "391c5a5c1a1eb301710c9542a1c073ea";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?app_id=${App_Id}&app_key=${App_Key}&q=pizza&to=30`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}
function generateHTML(results) {
  let markup = "";
  results.map((result) => {
    markup += `
      <li>
          <a class="results__link" href="#${result.recipe.uri}">
              <figure class="results__fig">
                  <img src="${result.recipe.image}" alt="Test">
              </figure>
              <div class="results__data">
                  <h4 class="results__name">${result.recipe.label}</h4>
                  <p class="results__author">${result.recipe.source}</p>
              </div>
          </a>
      </li>

    `;
  });
  searchResults.innerHTML = markup;
}
