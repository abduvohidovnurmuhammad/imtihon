const bkm = document.querySelector(".bookmark__inner");
const localData = JSON.parse(localStorage.getItem("data"));
const total = document.querySelector(".js-total");

const localId = JSON.parse(localStorage.getItem("id"));

let numberArr = [1];

for (let i = 0; i < localId.length; i++) {
  function getData() {
    fetch(`https://fakestoreapi.com/products/${localId[i]}`)
      .then((response) => response.json())
      .then((data) => {
        if (localId[i] == data.id) {
          const li = document.createElement("li");
          li.className = "item";

          const btn = document.createElement("button");
          btn.className = "button";
          btn.id = data.id;
          btn.textContent = "x";

          const img = document.createElement("img");
          img.className = "image";
          img.src = data.image;

          const title = document.createElement("p");
          title.className = "title";
          title.textContent = data.title;

          const div = document.createElement("div");
          div.className = "numberDiv";

          const minus = document.createElement("span");
          minus.className = "minus";
          minus.textContent = "-";

          const number = document.createElement("span");
          number.className = "number";
          number.textContent = numberArr.length;

          const plus = document.createElement("span");
          plus.className = "plus";
          plus.textContent = "+";

          function plusFunc() {
            numberArr.length++;
            number.textContent = numberArr.length;
            price.textContent = `$${(+data.price * 0.76 * numberArr.length).toFixed(
              2
            )}`
          }

          plus.addEventListener("click", () => {
            plusFunc()
          });
          
          function minusfunc() {
            numberArr.length--;
            number.textContent = numberArr.length;
            price.textContent = `$${(+data.price * 0.76 * numberArr.length).toFixed(
              2
            )}`
          }

          minus.addEventListener("click", () => {
            minusfunc();
          });

          const price = document.createElement("p");
          price.className = "price";
          price.textContent = `$${(+data.price * 0.76).toFixed(2)}`;

          const priceTwo = document.createElement("p");
          priceTwo.className = "priceTwo";
          priceTwo.textContent = `$${(+data.price * 0.76).toFixed(2)}`;

          const arr = localId;

          btn.addEventListener("click", (e) => {
            if (e.currentTarget.id == data.id) {
              li.style.display = "none";

              arr.map((item) => {
                if (e.currentTarget.id == item) {
                  arr.pop(item);
                  console.log(arr);
                  localStorage.setItem("id", JSON.stringify(arr));
                }
              });
            }
          });

          total.textContent = `$${data.price}`

          div.append(minus, number, plus);
          li.append(btn, img, title, price, div, priceTwo);
          bkm.append(li);
        }
      });
  }
  getData();
}
