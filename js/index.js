const searchForm = document.querySelector(".search");
const resultDiv = document.querySelector(".results");
const searchResults = document.querySelector(".results__list");
const searchField = document.querySelector(".search__field");
const resultLink = document.querySelector(".results__link");
let searchQuery = "";
const App_Id = "9a6e4156";
const App_Key = "391c5a5c1a1eb301710c9542a1c073ea";

// Search Button Clicked
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  clearInput();
  clearResult();
  renderLoader();
  fetchAPI();
});

// Fetch Recipe
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?app_id=${App_Id}&app_key=${App_Key}&q=${searchQuery}&to=30`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
}

// Load Into HTML
function generateHTML(results) {
  let markup = "";
  const createIngredient = (ingredient) => `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__ingredient">
                ${ingredient.text}
            </div>
        </li>`;
  results.map((result) => {
    markup += `
      <li>
          <a class="results__link" href="${result.recipe.url}" target="__blank">
              <figure class="results__fig">
                  <img src="${result.recipe.image}" alt="${
      result.recipe.label
    }">
              </figure>
              <div class="results__data">
                  <h4 class="results__name">${result.recipe.label}</h4>
                  <p class="results__author">${result.recipe.source}</p>
                  <h6 class="info_text">Click to visit website</h6>
              </div>

              <div class="recipe__ingredients">
              <ul class="recipe__ingredient-list">
                ${result.recipe.ingredients
                  .map((el) => createIngredient(el))
                  .join("")}
              </ul>
            </div>      
          </a>
      </li>
      <hr class="hrStyle">
    `;
  });
  clearLoader();
  searchResults.innerHTML = markup;
}

// Clear Search Input
function clearInput() {
  searchField.value = "";
}

// Clear Search Result
function clearResult() {
  searchResults.innerHTML = "";
}

// Loader
const elementString = {
  loader: "loader",
};
function renderLoader() {
  const loader = `
    <div class="${elementString.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  resultDiv.insertAdjacentHTML("afterbegin", loader);
}

// Clear Loader
function clearLoader() {
  const loader = document.querySelector(`.${elementString.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
}
