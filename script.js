books = [];
cartArray = [];
const getBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((responseObj) => {
      if (responseObj.ok) {
        return responseObj.json();
      }
    })
    .then((booksArray) => {
      const booksrow = document.getElementById("booksrow");
      booksArray.forEach((book, i) => {
        books = booksArray;
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `<div class="card h-100">
        <img src="${book.img}" class="card-img-top" alt="book image">
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">${book.price}£</a>
            <div>
                 
                 <button class="btn btn-success" onclick="addToCart(${i})">AGGIUNGI</button>
             </div>
        </div>
    </div>`;
        booksrow.appendChild(col);
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const createCart = function () {
  const cart = document.getElementById("cart");
  cart.innerHTML = "";
  cartArray.forEach((book, i) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.classList.add("d-flex");
    li.classList.add("justify-content-between");
    li.innerText = `${book.title} - ${book.price}`;
    const deleteCartElement = document.createElement("button");
    deleteCartElement.classList.add("btn");
    deleteCartElement.classList.add("btn-danger");
    deleteCartElement.classList.add("mx-4");
    deleteCartElement.innerText = "delete";
    deleteCartElement.onclick = function () {
      cartArray.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cartArray));
      createCart();
    };
    li.appendChild(deleteCartElement);
    cart.appendChild(li);
  });
};

const addToCart = function (index) {
  cartArray.push(books[index]);
  createCart();
  localStorage.setItem("cart", JSON.stringify(cartArray));
};

const takeLocalstorageCart = function () {
  const cartOnline = JSON.parse(localStorage.getItem("cart"));
  if (cartOnline !== null) {
    cartArray = cartOnline;
    createCart();
  }
};

getBooks();
takeLocalstorageCart();
