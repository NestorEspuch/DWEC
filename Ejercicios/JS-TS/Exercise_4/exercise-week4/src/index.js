import { RestaurantService } from "./restaurant-service.class.js";
import { checkOpening, fillDays } from "./validateForm.js";
import restaurantTemplate from "../templates/restaurant.hbs";

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
        let restaurantHTML = restaurantTemplate({
            image: restaurant.image,
            name: restaurant.name,
            description: restaurant.description,
            openDays: fillDays(restaurant.daysOpen),
            styleOpening: checkOpening(restaurant.daysOpen)
                ? "bg-success"
                : "bg-danger",
            opening: checkOpening(restaurant.daysOpen) ? "Open" : "Close",
            phone: restaurant.phone,
            cuisine: restaurant.cuisine,
        });
        let div1 = document.createElement("div");
        div1.classList.add("col");
        div1.innerHTML = restaurantHTML;
        let deleteButton = div1.querySelector("button");
        container.append(div1);
        deleteButton.addEventListener("click", () =>
            deleteRestaurant(restaurant, div1)
        );
    });
}

showRestaurants(restaurants);

let search = document.getElementById("search");
search.addEventListener("keyup", () => {
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
