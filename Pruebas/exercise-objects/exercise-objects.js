"use strict";

//Create a class "Product" with a name and price;
//Create an array with al least 4 products;
//Order that array by product's name and show it;
//Order that array by product's price and show it;

// a.sort((p1,p2 => ));

class Product {
    name;
    price;

  constructor(name = "", price = 0) {
    this.name = name;
    this.price = price;
  }
}

let products = [
    new Product("Pop harry potter", 6.8), 
    new Product("Manga Jujutsu Kaisen", 4.6),
    new Product("Ring of power", 2.2),
    new Product("Elderberry wand", 2.8),
    new Product("Product 5", 10),
];
console.log(products);

let productPrice = [...products];
productPrice.sort((p1,p2) => p1.price - p2.price);
console.log(productPrice);

let productsName = [...products];
productsName.sort((p1,p2) => p1.name - p2.name);
console.log(productsName);
