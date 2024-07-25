const API_KEY = "12deac2c7d7346228a782ab0a8df7f81";
const apiUrl = "https://newsapi.org/v2/everything?q=";
const corsAnywhereUrl = "https://chronicle-connect.onrender.com/";
const url = `${corsAnywhereUrl}${apiUrl}`;
window.addEventListener("load", () => fetchNews("India"));
function reload() {
  window.location.reload();
}
let currentPage;
const onPageClick = (id) => {
  // Your logic for handling the click event with the given ID
  const currentPage = id.innerHTML;
  if (currentPage == "next") {
    for (var i = 1; i < 6; i++) {
      var c = document.getElementById(i).innerHTML;
      console.log(c);

      var newValue = parseInt(c, 10) + 1;

      document.getElementById(i).innerHTML = newValue;
    }
  } else if (currentPage == "prev") {
    for (var i = 1; i < 6; i++) {
      var c = document.getElementById(i).innerHTML;
      console.log(c);
      var numericValue = parseInt(c, 10);
      var newValue = numericValue - 1;
      document.getElementById(i).innerHTML = newValue;
    }
  } else fetchNews1(currentPage);
};
async function fetchNews1(currentPage) {
  console.log("API IS CALLED", currentPage);
  const res = await fetch(
    `${url}${"India"}&page=${currentPage}&pageSize=${10}&apiKey=${API_KEY}`
  );
  const data = await res.json();
  bindData(data.articles);
}

async function fetchNews(query) {
  console.log("API IS CALLED");
  const res = await fetch(`${url}${query}&pageSize=${10}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("news-template-card");
  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news_img");
  const newsDesc = cardClone.querySelector("#news-desc");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name}.${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-input");
searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
