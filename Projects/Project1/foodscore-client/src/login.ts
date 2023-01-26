import Swal from "sweetalert2";
import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { GeolocationService } from "./classes/geolocation-service";
import { TokenResponse } from "./interfaces/responses";
import { UserLogin } from "./interfaces/user";

const form = document.getElementById("form-login") as HTMLFormElement;
const userService = new AuthService();
let user: UserLogin;
let lat: number;
let lng: number;

userService.validateToken().then(()=>{
    localStorage.assing("../index.html");
});

GeolocationService.getLocation().then((cords) => {
    lat = cords.latitude;
    lng = cords.longitude;
}).catch();

document.addEventListener("submit", e =>{
    e.preventDefault();
    user = {
        "email": form.email.value,
        "password": form.password.value,
        "lat": lat,
        "lng": lng
    };
    userService.login(user).then( e => {
        userService.checkToken((e as unknown as TokenResponse).accessToken);
        form.reset();
        location.assign("../index.html");
    }).catch( e => {
        Swal.fire({
            title: "Login error",
            text: e.error,
            icon: "error"
        });
    });
});
