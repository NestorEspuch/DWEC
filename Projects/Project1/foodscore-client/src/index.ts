/* eslint-disable quotes */
import "../styles.css";
import { Restaurant } from "./interfaces/restaurant";
import { RestaurantService } from "./classes/restaurant-service";
import { fillDays, checkOpening } from "./validateForm";
import { AuthService } from "./classes/auth-service";
import Swal from "sweetalert2";
const restaurantTemplate = require("../templates/restaurant.hbs");

const restaurantService = new RestaurantService();
const placesContainer = document.getElementById("placesContainer");
const userService = new AuthService();
let restaurants: Restaurant[] = [];

AuthService.logout();
userService
    .validateToken()
    .then()
    .catch(() => {
        location.assign("../login.html");
    });

async function deleteRestaurant(
    restaurant: Restaurant,
    div: HTMLElement
): Promise<void> {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            const response = await restaurantService.delete(restaurant.id);
            div.remove();
            return response;
        }
    });
}

function showRestaurants(restaurants: Restaurant[]): void {
    restaurants.forEach((restaurant) => {
        const restaurantHTML = restaurantTemplate({
            id: restaurant.id,
            name: restaurant.name,
            description: restaurant.description,
            days: fillDays(restaurant.daysOpen),
            phone: restaurant.phone,
            image: restaurant.image,
            cuisine: restaurant.cuisine,
            stars: restaurant.stars,
            distance: restaurant.distance.toFixed(2),
            mine: restaurant.mine,
            open: checkOpening(restaurant.daysOpen) ? "Open" : "Close",
            fullStars: Array(restaurant.stars).fill(""),
            emptyStars: Array(5 - restaurant.stars).fill(""),
        });
        const div1 = document.createElement("div");
        div1.classList.add("col");
        div1.innerHTML = restaurantHTML;

        if (restaurant.mine) {
            const deleteButton = div1.querySelector("button");
            deleteButton.addEventListener("click", () =>
                deleteRestaurant(restaurant, div1)
            );
        }
        placesContainer.append(div1);
    });
}

restaurantService.getAll().then((rest) => {
    restaurants = rest.restaurants;
    showRestaurants(restaurants);
});

const search = document.getElementById("search") as HTMLInputElement;
search.addEventListener("keyup", () => {
    while (placesContainer.firstChild) {
        placesContainer.removeChild(placesContainer.firstChild);
    }

    const arraySearch: Restaurant[] = [];
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
