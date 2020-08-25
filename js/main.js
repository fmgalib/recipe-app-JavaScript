const searchForm = document.querySelector(".search");
const searchResDiv = document.querySelector(".results");
let searchQuery = "";
const App_Id = "9a6e4156";
const App_Key = "391c5a5c1a1eb301710c9542a1c073ea";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?app_id=${App_Id}&app_key=${App_Key}&q=pizza`;
  const response = await fetch(baseURL);
  const data = await response.json();
  // generateHTML(data.hits);
  console.log(data);
}
