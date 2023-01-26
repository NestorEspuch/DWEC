import Swal from "sweetalert2";
import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { GeolocationService } from "./classes/geolocation-service";
import { User } from "./interfaces/user";

const form = document.getElementById("form-register") as HTMLFormElement;
const imgPreview = document.getElementById("imgPreview") as HTMLImageElement;

const userService = new AuthService();
let user: User;
userService.validateToken().then(() => {
    location.assign("../index.html");
});

GeolocationService.getLocation()
    .then((cords) => {
        form.lat.value = cords.latitude;
        form.lng.value = cords.longitude;
    })
    .catch(() => {
        form.lat.value = 0;
        form.lng.value = 0;
    });

document.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.email.value.trim() === form.email2.value.trim()) {
        user = {
            name: (form.name as unknown as HTMLInputElement).value,
            avatar: imgPreview.src as string,
            email: form.email.value.trim(),
            password: form.password.value,
            lat: +form.lat.value,
            lng: +form.lng.value,
        };
        userService
            .register(user)
            .then(() => {
                Swal.fire(
                    "Registered user",
                    "Now log in to continue",
                    "success");
                location.assign("../login.html");
            })
            .catch((e) => {
                let message = "";
                for (let i = 0; i < e.message.length; i++) {
                    message += e.message[i] + "\n";
                }
                Swal.fire(
                    "Registration error",
                    message,
                    "error");
            });
    }
});

form.avatar.addEventListener("change", () => {
    const file = form.avatar.files[0];
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

AuthService.logout();
