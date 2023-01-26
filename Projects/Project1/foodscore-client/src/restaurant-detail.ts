import Swal from "sweetalert2";
import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { MapService } from "./classes/map-service";
import { RestaurantService } from "./classes/restaurant-service";
import { Restaurant } from "./interfaces/restaurant";
import { User } from "./interfaces/user";
import { Comment } from "./interfaces/comment";
import { fillDays, checkOpening } from "./validateForm";
const restaurantTemplate = require("../templates/restaurant.hbs");
const commentTemplate = require("../templates/comment.hbs");

const restaurantService = new RestaurantService();
const coordinates = {
    latitude: 0,
    longitude: 0,
};
AuthService.logout();

function getId(): number {
    const split = window.location.href.split("?");
    if (!split[1].includes("id=")) {
        location.assign("../index.html");
    }
    return +split[1].split("=")[1];
}

function showRestaurant(restaurant: Restaurant): void {
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
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = restaurantHTML;

    if (restaurant.mine) {
        const button = cardContainer.querySelector("button");
        button.addEventListener("click", () => {
            deleteRestaurant(restaurant, cardContainer);
            location.assign("../index.html");
        });
    }
    clickStars();
}

async function showMap(): Promise<void> {
    const mapService = MapService.createMapService(coordinates, "map");
    mapService.createMarker(coordinates, "red");
}

async function deleteRestaurant(
    restaurant: Restaurant,
    div: HTMLElement
): Promise<void> {
    if (confirm("Are you sure you want to delete this restaurant?")) {
        const response = await restaurantService.delete(restaurant.id);
        div.remove();
        location.assign("../index.html");
        return response;
    }
}

function showCreator(user: User): void {
    const name = document.getElementById("creatorName") as HTMLInputElement;
    const email = document.getElementById("creatorEmail") as HTMLInputElement;
    const img = document.getElementById("creatorImg") as HTMLImageElement;
    name.append(user.name);
    email.append(user.email);
    img.src = user.avatar;

    const cardBody = document.getElementsByClassName("card-body");
    cardBody[1].addEventListener("click", () => {
        location.assign("../profile.html?id=" + user.id);
    });
}

restaurantService
    .get(getId())
    .then((p) => {
        showRestaurant(p.restaurant);
        coordinates.latitude = p.restaurant.lat;
        coordinates.longitude = p.restaurant.lng;
        showMap();
        showCreator(p.restaurant.creator);
        restaurantService
            .getComments(p.restaurant.id)
            .then((o) => {
                showComments(o.comments);
            });
    })
    .catch((e) => {
        Swal.fire({
            title: "Error loading the restaurant",
            text: e.error,
            icon: "error",
        });
    });

const commentsHTML = document.getElementById("comments");

function showComments(comments: Comment[]): void {
    comments.forEach((comment) => {
        const commentHtml = commentTemplate({
            stars: comment.stars,
            text: comment.text,
            date: comment.date,
            user: comment.user,
            fullStars: Array(comment.stars).fill(""),
            emptyStars: Array(5 - comment.stars).fill(""),
        });
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "flex-row");
        li.innerHTML = commentHtml;

        commentsHTML.append(li);
    });
}

function clickStars(): void {
    const stars = document.getElementById("stars").children;

    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener("click", () => {
            const numberStars = +(stars[i] as HTMLElement).dataset.score;
            for (let a = 1; a <= numberStars; a++) {
                (stars[a - 1] as HTMLElement).textContent = "★";
            }
            for (let a = numberStars + 1; a <= 5; a++) {
                (stars[a - 1] as HTMLElement).textContent = "☆";
            }
        });
    }
}

const formComment = document.getElementById("commentForm") as HTMLFormElement;

formComment.addEventListener("submit", (e) => {
    e.preventDefault();
    const stars = document.getElementById("stars").children;

    let numStars: number;
    for (let i = 1; i <= stars.length; i++) {
        if ((stars[i - 1] as HTMLElement).textContent === "★") {
            numStars = +(stars[i - 1] as HTMLElement).dataset.score;
        }
    }

    restaurantService
        .addComment(getId(), {
            "stars": numStars,
            "text": formComment.comment.value,
        })
        .then(() => {
            formComment.classList.add("d-none");
        });
});
