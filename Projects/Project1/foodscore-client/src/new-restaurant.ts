import Swal from "sweetalert2";
import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { GeolocationService } from "./classes/geolocation-service";
import { MapService } from "./classes/map-service";
import { RestaurantService } from "./classes/restaurant-service";
import { Restaurant } from "./interfaces/restaurant";
import { formValidation } from "./validateForm";

const restaurantService = new RestaurantService();
const userService = new AuthService();
const form = document.getElementById("newRestaurant") as HTMLFormElement;
const imgPreview = document.getElementById("imgPreview") as HTMLImageElement;
const coordinates = {
    lat: 0,
    lng: 0,
};
AuthService.logout();

userService
    .validateToken()
    .then()
    .catch(() => {
        location.assign("../login.html");
    });

async function showMap(): Promise<void> {
    const coords = await GeolocationService.getLocation();
    coordinates.lat = coords.latitude;
    coordinates.lng = coords.longitude;
    const mapService = MapService.createMapService(coords, "map");
    mapService.createMarker(coords, "red");

    mapService.getSearch().on("select-result", e => {
        form.address.value = e.result.name;
        const coords = e.result.feature.geometry;
        coordinates.lat = coords.get("latitude");
        coordinates.lng = coords.get("longitude");

        mapService.createMarker(
            { latitude: coordinates.lat, longitude: coordinates.lng },
            "green"
        );
    });
}
showMap();

document.addEventListener("submit", (e) => {
    e.preventDefault();
    const openingDays = Array.from(form.days)
        .filter((i) => (i as HTMLInputElement).checked)
        .map((i) => (i as HTMLInputElement).value);
    let restaurant: Restaurant;
    if (formValidation(form, openingDays)) {
        restaurant = {
            name: (form.name as unknown as HTMLInputElement).value,
            description: form.description.value,
            daysOpen: openingDays,
            phone: form.phone.value,
            cuisine: form.cuisine.value,
            image: imgPreview.src,
            address: form.description.value,
            lat: coordinates.lat,
            lng: coordinates.lng,
        };
        restaurantService
            .post(restaurant)
            .then(() => {
                form.reset();
                location.assign("./index.html");
            }).catch((e) => {
                Swal.fire({
                    title: "Wrong restaurant registration",
                    text: e.error,
                    icon: "error"
                });
            });
    }
});

form.image.addEventListener("change", () => {
    const file = form.image.files[0];
    if (!file && !file.type.startsWith("image")) {
        imgPreview.src = "";
    } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("load", () => {
            imgPreview.classList.remove("d-none");
            imgPreview.src = reader.result as string;
        });
    }
});

