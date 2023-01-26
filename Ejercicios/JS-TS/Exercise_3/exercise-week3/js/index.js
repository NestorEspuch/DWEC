import { RestaurantService } from "./restaurant-service.class.js";
import { checkOpening, fillDays, formValidation } from "./validateForm.js";

let rService = new RestaurantService();

async function getRestaurants() {
  const resp = await rService.getAll();
  return resp.restaurants;
}
const restaurants = await getRestaurants();

async function deleteRestaurant(restaurant, div) {
  if (confirm("Are you sure you want to delete this restaurant?")) {
    await rService.delete(restaurant.id);
    div.remove();
  }
}

let container = document.getElementById("placesContainer");
function showRestaurants(restaurants) {
  restaurants.forEach((restaurant) => {
    let div1 = document.createElement("div");
    div1.classList.add("col");
    let div2 = document.createElement("div");
    div2.classList.add("card");
    div2.classList.add("h-100");
    div2.classList.add("sombra");
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = restaurant.image;
    div2.appendChild(img);
    let div3 = document.createElement("div");
    div3.classList.add("card-body");
    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-danger");
    button.classList.add("btn-sm");
    button.classList.add("float-end");
    button.append("Delete");
    div3.appendChild(button);
    div2.appendChild(div3);
    let h4 = document.createElement("h4");
    h4.classList.add("card-title");
    h4.append(restaurant.name);
    div3.appendChild(h4);
    let p = document.createElement("p");
    p.classList.add("card-text");
    p.append(restaurant.description);
    div3.appendChild(p);
    let div4 = document.createElement("div");
    div4.classList.add("card-text");
    div3.appendChild(div4);
    let small1 = document.createElement("small");
    small1.classList.add("text-muted");
    let strong1 = document.createElement("strong");
    strong1.append("Open: ");
    small1.appendChild(strong1);
    small1.append(fillDays(restaurant.daysOpen));
    div4.appendChild(small1);
    let span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("ms-2");
    if (checkOpening(restaurant.daysOpen)) {
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
    small2.append(restaurant.phone);
    let div6 = document.createElement("div");
    div6.classList.add("card-footer");
    div2.appendChild(div6);
    let small3 = document.createElement("small");
    small3.classList.add("text-muted");
    small3.append(restaurant.cuisine);
    div6.appendChild(small3);
    div1.appendChild(div2);
    container.appendChild(div1);

    button.addEventListener("click", (e) => deleteRestaurant(restaurant, div1));
  });
}

showRestaurants(restaurants);

let search = document.getElementById("search");
search.addEventListener("keyup", (e) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  let arraySearch = new Array();
  restaurants.filter((r) => {
    if (
      r.name.toLowerCase().includes(search.value.toLowerCase()) ||
      r.description.toLowerCase().includes(search.value.toLowerCase())
    ) {
      arraySearch.push(r);
    }
  });
  showRestaurants(arraySearch);
});
