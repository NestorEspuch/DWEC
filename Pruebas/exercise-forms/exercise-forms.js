"use strict";

const form = document.getElementById("form1");
let nom;
let language;
let hobbies;
let food;
let photo;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  nom = form.name.value;
  language = form.language.value;
  
  hobbies = Array.from(form.hobbies)
    .filter((i) => i.checked)
    .map((i) => i.value).toString();

  food = form.food.value;

  console.log(nom);
  console.log(language);
  console.log(hobbies);
  console.log(food);
});
