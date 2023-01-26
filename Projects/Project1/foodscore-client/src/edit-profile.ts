import Swal from "sweetalert2";
import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { UserService } from "./classes/user-service";

const user = new UserService();
const userService = new AuthService();
AuthService.logout();

userService
    .validateToken()
    .then()
    .catch(() => {
        location.assign("../login.html");
    });

const formProfile = document.getElementById("form-profile") as HTMLFormElement;

const formPhoto = document.getElementById("form-photo") as HTMLFormElement;
const photo = document.getElementById("photo") as HTMLImageElement;
const imgPreview = document.getElementById("imgPreview") as HTMLImageElement;

const formPassword = document.getElementById(
    "form-password"
) as HTMLFormElement;

user.getProfile().then((o) => {
    photo.src = o.user.avatar;
    formProfile.email.value = o.user.email;
    (formProfile.name as unknown as HTMLInputElement).value = o.user.name;
});

formProfile.addEventListener("submit", (e) => {
    e.preventDefault();
    user.saveProfile(
        (formProfile.name as unknown as HTMLInputElement).value,
        formProfile.email.value
    )
        .then(() => {
            Swal.fire({
                title: "Correctly updated profile",
                icon: "success"
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "Profile update error",
                text: error,
                icon: "error"
            });
        });
});

formPhoto.addEventListener("submit", (e) => {
    e.preventDefault();
    if (imgPreview.src.startsWith("data:image")) {
        user.saveAvatar(imgPreview.src)
            .then(() => {
                photo.src = imgPreview.src;
                imgPreview.classList.add("d-none");
                Swal.fire({
                    title: "Correctly updated avatar",
                    icon: "success"
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Avatar update error",
                    text: error,
                    icon: "error"
                });
            });
    }
});

formPhoto.image.addEventListener("change", () => {
    const file = formPhoto.image.files[0];
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

formPassword.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formPassword.password.value === formPassword.password2.value) {
        user.savePassword(formPassword.password.value)
            .then(() => {
                Swal.fire({
                    title: "Correctly updated password",
                    icon: "success"
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Password update error",
                    text: error,
                    icon: "error"
                });
            });
    }
});
