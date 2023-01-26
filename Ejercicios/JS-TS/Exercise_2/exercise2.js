"use strict";

// Complete the exercise
import {
  fillDays,
  readImage,
  form,
  imgPrev,
  checkAndInsert
} from "./inc/functions.inc.js";

//#region Events
imgPrev();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = form.name.value.trim();
  let description = form.description.value.trim();
  let cuisine = form.cuisine.value.trim();
  let openingDays = fillDays(form);
  let phone = form.phone.value;
  let image = readImage(document.getElementById("image"));

  checkAndInsert(name,description,cuisine,openingDays,phone,image);
});
//#endregion
