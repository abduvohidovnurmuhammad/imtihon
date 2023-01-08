const boxCards = document.querySelector(".product__cards");
const elCards = document.querySelector(".js-cards");
const btn = document.querySelector(".product__btn");
const product__list = document.querySelector(".product__list");
const ul = document.createElement("ul");
const All = document.querySelector(".product__list__all");
const elBasketNum = document.querySelector(".js-number");

let category = [];
let parrentArr = [];

All.addEventListener("click", (e) => {
  category = [];
  category.push(``);
  getData();
});

try {
  function getData() {
    fetch(`https://fakestoreapi.com/products/${category.toString()}`)
      .then((response) => response.json())
      .then((data) => renderArr(data));
  }
  getData();

  fetch(`https://fakestoreapi.com/products/categories`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = item;
        li.append(btn);

        btn.addEventListener("click", (e) => {
          function get() {
            category = [];
            category.push(`category/${e.target.textContent}`);
            getData();
          }

          get();
        });

        product__list.append(li);
      });
    });
} catch (error) {
  console.error(error);
}

function renderArr(data) {
  localStorage.setItem("data", JSON.stringify(data))
  elCards.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let newItem = document.createElement("li");
    newItem.classList.add("product__cards-item");
    newItem.id = element.id;

    let newHover = document.createElement("div");
    newHover.classList.add("product__hover");

    let newCircleOne = document.createElement("span");
    newCircleOne.classList.add("product__circle");

    let newCircleTwo = document.createElement("span");
    newCircleTwo.classList.add("product__circle");

    let newLike = document.createElement("img");
    newLike.className = "product__like";
    newLike.src = "../img/heart-oncheck.png";

    let newLikeCheck = document.createElement("img");
    newLikeCheck.className = "product__like check";
    newLikeCheck.src = "../img/heart-check.png";

    let newBasket = document.createElement("img");
    newBasket.className = "product__basket";
    newBasket.src = "../img/cart-oncheck.png";

    let newBasketCheck = document.createElement("img");
    newBasketCheck.className = "product__basket check";
    newBasketCheck.src = "../img/cart-check.png";

    newCircleOne.addEventListener("click", () => {
      newLike.classList.toggle("check");
      newLikeCheck.classList.toggle("check");
    });

    newCircleTwo.addEventListener("click", () => {
      newBasket.classList.toggle("check");
      newBasketCheck.classList.toggle("check");
    });

    newCircleTwo.addEventListener("click", (evt) => {
      if (newBasket.className == "product__basket check") {
        let parrentId = evt.target.parentNode.parentNode.parentNode.id;
        parrentArr.push(parrentId);
        localStorage.setItem("id", JSON.stringify(parrentArr))
        elBasketNum.textContent = parrentArr.length;
      } else {
        parrentArr.length--;
        elBasketNum.textContent = parrentArr.length;
      }
    });

    let newImg = document.createElement("img");
    newImg.classList.add("product__img");
    newImg.src = element.image;

    let newDiv = document.createElement("div");
    newDiv.classList.add("product__content");

    let newText = document.createElement("p");
    newText.textContent = element.title;
    newText.classList.add("product__text");

    let newRate = document.createElement("div");
    newRate.classList.add("product__star");

    let newRateOne = document.createElement("p");
    newRateOne.className = `fa fa-star ${
      Math.round(+element.rating.rate) >= 1 ? "checked" : ""
    }`;

    let newRateTwo = document.createElement("p");
    newRateTwo.className = `fa fa-star ${
      Math.round(+element.rating.rate) >= 2 ? "checked" : ""
    }`;

    let newRateThere = document.createElement("p");
    newRateThere.className = `fa fa-star ${
      Math.round(+element.rating.rate) >= 3 ? "checked" : ""
    }`;

    let newRateFour = document.createElement("p");
    newRateFour.className = `fa fa-star ${
      Math.round(+element.rating.rate) >= 4 ? "checked" : ""
    }`;

    let newRateFive = document.createElement("p");
    newRateFive.className = `fa fa-star ${
      Math.round(+element.rating.rate) >= 5 ? "checked" : ""
    }`;

    let newPriceBox = document.createElement("div");

    let newPrice = document.createElement("span");
    newPrice.textContent = (+element.price * 0.76).toFixed(2);
    newPrice.classList.add("product__price");

    let newPriceDel = document.createElement("del");
    newPriceDel.textContent = `$${element.price}`;
    newPriceDel.classList.add("product__price-del");

    let newPricePercentage = document.createElement("span");
    newPricePercentage.textContent = "24% Off";
    newPricePercentage.classList.add("product__percentage");

    newPriceBox.append(newPrice, newPriceDel, newPricePercentage);
    newRate.append(
      newRateOne,
      newRateTwo,
      newRateThere,
      newRateFour,
      newRateFive
    );
    newDiv.append(newText, newRate, newPriceBox);
    newCircleOne.append(newLike, newLikeCheck);
    newCircleTwo.append(newBasket, newBasketCheck);
    newHover.append(newCircleOne, newCircleTwo);
    newItem.append(newHover, newImg, newDiv);
    elCards.appendChild(newItem);
  }
}

// search

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.querySelector('.product__search');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("p")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

btn.addEventListener("click", ()=>{

  myFunction()
})

