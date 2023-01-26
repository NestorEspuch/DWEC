"use strict";

export let form = document.getElementById("newRestaurant");

export function fillDays(form) {
  let array = Array.from(form.days)
    .filter((i) => i.checked)
    .map((i) => i.value);

  let finalArray = [];
  let cont = 0;
  array.forEach((e) => {
    switch (e) {
      case "1":
        finalArray[cont] = "Mo";
        break;
      case "2":
        finalArray[cont] = "Tu";
        break;
      case "3":
        finalArray[cont] = "We";
        break;
      case "4":
        finalArray[cont] = "Th";
        break;
      case "5":
        finalArray[cont] = "Fr";
        break;
      case "6":
        finalArray[cont] = "Sa";
        break;
      case "0":
        finalArray[cont] = "Su";
        break;
    }
    cont++;
  });
  return finalArray.toString();
}

export function readImage() {
  let file = document.querySelector("#image");

  let file2 = file.files;
  if (!file2 || !file2.length) {
    return "";
  }

  let firstFile = file2[0];
  let objectURL = URL.createObjectURL(firstFile);
  return objectURL;
}

function changeToTrue(e) {
  if (
    !e.classList.contains("is-valid") &&
    !e.classList.contains("is-invalid")
  ) {
    e.classList.add("is-valid");
  } else {
    if (e.classList.contains("is-invalid")) {
      e.classList.add("is-valid");
      e.classList.remove("is-invalid");
    }
  }
}

function changeToFalse(e) {
  if (
    !e.classList.contains("is-valid") &&
    !e.classList.contains("is-invalid")
  ) {
    e.classList.add("is-invalid");
  } else {
    if (e.classList.contains("is-valid")) {
      e.classList.add("is-invalid");
      e.classList.remove("is-valid");
    }
  }
}

function checkName(name) {
  let pattern = new RegExp("^[a-zA-Z ]+$");
  if (name.length < 1) {
    changeToFalse(form.name);
    return false;
  } else {
    if (pattern.test(name)) {
      changeToTrue(form.name);
      return true;
    } else {
      changeToFalse(form.name);
      return false;
    }
  }
}

function checkDescription(description) {
  if (description.length < 1) {
    changeToFalse(form.description);
    return false;
  } else {
    if (description !== "") {
      changeToTrue(form.description);
      return true;
    } else {
      changeToFalse(form.description);
      return false;
    }
  }
}

function checkCuisine(cuisine) {
  let pattern = / /;

  if (cuisine.length < 1) {
    changeToFalse(form.cuisine);
    return false;
  } else {
    if (!pattern.test(cuisine)) {
      changeToTrue(form.cuisine);
      return true;
    } else {
      changeToFalse(form.cuisine);
      return false;
    }
  }
}

function checkDays(openingDays) {
  let daysErrorId = document.getElementById("daysError");

  if (openingDays.length < 1) {
    daysErrorId.classList.remove("d-none");
    return false;
  } else {
    daysErrorId.classList.add("d-none");
    return true;
  }
}

function checkPhone(phone) {
  let pattern = new RegExp("^[0-9]{9}$");

  if (pattern.test(phone)) {
    changeToTrue(form.phone);
    return true;
  } else {
    changeToFalse(form.phone);
    return false;
  }
}

function checkImage(image) {
  if (image.length < 1) {
    changeToFalse(form.image);
    return false;
  } else {
    changeToTrue(form.image);
    return true;
  }
}

function checkOpening() {
  let array = Array.from(form.days)
    .filter((i) => i.checked)
    .map((i) => i.value);

  let weekendDay = new Date().getDay();

  if (array.includes(weekendDay.toString())) {
    return true;
  } else {
    return false;
  }
}

function insertRestaurant(
  name,
  description,
  cuisine,
  openingDays,
  phone,
  image
) {
  let container = document.getElementById("placesContainer");
  let div1 = document.createElement("div");
  div1.classList.add("col");
  let div2 = document.createElement("div");
  div2.classList.add("card");
  div2.classList.add("h-100");
  div2.classList.add("sombra");
  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = image;
  div2.appendChild(img);
  let div3 = document.createElement("div");
  div3.classList.add("card-body");
  div2.appendChild(div3);
  let h4 = document.createElement("h4");
  h4.classList.add("card-title");
  h4.append(name);
  div3.appendChild(h4);
  let p = document.createElement("p");
  p.classList.add("card-text");
  p.append(description);
  div3.appendChild(p);
  let div4 = document.createElement("div");
  div4.classList.add("card-text");
  div3.appendChild(div4);
  let small1 = document.createElement("small");
  small1.classList.add("text-muted");
  let strong1 = document.createElement("strong");
  strong1.append("Open: ");
  small1.appendChild(strong1);
  small1.append(openingDays);
  div4.appendChild(small1);
  let span = document.createElement("span");
  span.classList.add("badge");
  span.classList.add("ms-2");
  if (checkOpening()) {
    span.classList.add("bg-success");
    span.append("Open");
  } else {
    span.classList.add("bg-danger");
    span.append("Close");
  }
  div4.appendChild(span);
  let div5 = document.createElement("div");
  div5.classList.add("card-text");
  div3.appendChild(div5);
  let small2 = document.createElement("small");
  small2.classList.add("text-muted");
  div5.appendChild(small2);
  let strong2 = document.createElement("strong");
  strong2.append("Phone: ");
  small2.appendChild(strong2);
  small2.append(phone);
  let div6 = document.createElement("div");
  div6.classList.add("card-footer");
  div2.appendChild(div6);
  let small3 = document.createElement("small");
  small3.classList.add("text-muted");
  small3.append(cuisine);
  div6.appendChild(small3);
  div1.appendChild(div2);
  container.appendChild(div1);
}

export function imgPrev() {
  let file = document.querySelector("#image");
  let preview = document.querySelector("#imgPreview");

  file.addEventListener("change", () => {
    let file2 = file.files;
    if (!file2 || !file2.length) {
      $preview.src = "";
      return;
    }
    let firstFile = file2[0];
    let objectURL = URL.createObjectURL(firstFile);
    preview.src = objectURL;
  });
}

export function checkAndInsert(
  name,
  description,
  cuisine,
  openingDays,
  phone,
  image
) {
  if (
    checkName(name) &&
    checkDescription(description) &&
    checkCuisine(cuisine) &&
    checkDays(openingDays) &&
    checkPhone(phone) &&
    checkImage(image)
  ) {
    insertRestaurant(name, description, cuisine, openingDays, phone, image);
  }
}
