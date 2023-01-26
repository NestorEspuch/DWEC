import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { MapService } from "./classes/map-service";
import { UserService } from "./classes/user-service";
import { User } from "./interfaces/user";
const profileTemplate = require("../templates/profile.hbs");

const user = new UserService();
const divProfile = document.getElementById("profile");
const userService = new AuthService();
const coordinates = {
    latitude: 0,
    longitude: 0
};
AuthService.logout();

userService
    .validateToken()
    .then()
    .catch(() => {
        location.assign("../login.html");
    });

function getId(): number {
    const split = window.location.href.split("?");
    const number =
        split.length > 1 && split[1].includes("id=")
            ? +split[1].split("=")[1]
            : undefined;
    return number;
}

function showUser(user: User): void{
    divProfile.innerHTML = profileTemplate({
        avatar:user.avatar,
        name:user.name,
        email:user.email,
        me:user.me
    });
}

async function showMap(user:User): Promise<void> {
    coordinates.latitude = user.lat;
    coordinates.longitude = user.lng;
    const mapService = MapService.createMapService(coordinates, "map");
    mapService.createMarker(coordinates, "red");
}


user.getProfile(getId()).then( o => {
    showUser(o.user);
    showMap(o.user);
}); 
