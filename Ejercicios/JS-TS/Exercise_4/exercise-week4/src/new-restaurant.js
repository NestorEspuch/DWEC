"use strict";

import { formValidation } from "./validateForm.js";
import { RestaurantService } from "./restaurant-service.class.js";

let rService = new RestaurantService();

let form = document.getElementById("newRestaurant");
let imgPreview = document.getElementById("imgPreview");
let openingDays;

document.addEventListener("submit", (e) => {
    openingDays = Array.from(form.days)
        .filter((i) => i.checked)
        .map((i) => i.value);
    e.preventDefault();
    if (formValidation(form, openingDays)) {
        rService
            .post({
                name: form.name.value,
                description: form.description.value,
                daysOpen: openingDays,
                phone: form.phone.value,
                cuisine: form.cuisine.value,
                image: imgPreview.src,
            })
            .then(() => {
                form.reset();
                location.assign("./index.html");
            })
            .catch((error) => alert(error));
    }
});

form.image.addEventListener("change", () => {
    let file = form.image.files[0];
    if (!file && !file.type.startsWith("image")) {
        imgPreview.src = "";
    } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("load", () => {
            imgPreview.classList.remove("d-none");
            imgPreview.src = reader.result;
        });
    }
});
