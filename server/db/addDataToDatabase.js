const fs = require("fs");

fs.readFile("products.json", "utf-8", (err, products) => {
  products = JSON.parse(products);
  products.forEach((product) => {
    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  });
});
