"use strict";

export function formValidation(form, openingDays) {
    let valid = true;
    if (!checkName(form.name.value.trim(), form)) {
        valid = false;
    }
    if (!checkDescription(form.description.value.trim(), form)) {
        valid = false;
    }
    if (!checkCuisine(form.cuisine.value.trim(), form)) {
        valid = false;
    }
    if (!checkDays(openingDays, form)) {
        valid = false;
    }
    if (!checkPhone(form.phone.value.trim(), form)) {
        valid = false;
    }
    if (!checkImage(form.image.value, form)) {
        valid = false;
    }
    return valid;
}

export function fillDays(array) {
    let finalArray = [];
    let cont = 0;
    array.forEach((e) => {
        switch (e) {
        case "1":
            finalArray[cont] = "Mo";
            break;
        case "2":
            finalArray[cont] = "Tu";
            break;
        case "3":
            finalArray[cont] = "We";
            break;
        case "4":
            finalArray[cont] = "Th";
            break;
        case "5":
            finalArray[cont] = "Fr";
            break;
        case "6":
            finalArray[cont] = "Sa";
            break;
        case "0":
            finalArray[cont] = "Su";
            break;
        }
        cont++;
    });
    return finalArray.toString();
}

export function readImage() {
    let file = document.querySelector("#image");

    let file2 = file.files;
    if (!file2 || !file2.length) {
        return "";
    }

    let firstFile = file2[0];
    let objectURL = URL.createObjectURL(firstFile);
    return objectURL;
}

function changeToTrue(e) {
    if (
        !e.classList.contains("is-valid") &&
        !e.classList.contains("is-invalid")
    ) {
        e.classList.add("is-valid");
    } else {
        if (e.classList.contains("is-invalid")) {
            e.classList.add("is-valid");
            e.classList.remove("is-invalid");
        }
    }
}

function changeToFalse(e) {
    if (
        !e.classList.contains("is-valid") &&
        !e.classList.contains("is-invalid")
    ) {
        e.classList.add("is-invalid");
    } else {
        if (e.classList.contains("is-valid")) {
            e.classList.add("is-invalid");
            e.classList.remove("is-valid");
        }
    }
}

function checkName(name, form) {
    let pattern = new RegExp("^[a-zA-Z ]+$");
    if (name.length < 1) {
        changeToFalse(form.name);
        return false;
    } else {
        if (pattern.test(name)) {
            changeToTrue(form.name);
            return true;
        } else {
            changeToFalse(form.name);
            return false;
        }
    }
}

function checkDescription(description, form) {
    if (description.length < 1) {
        changeToFalse(form.description);
        return false;
    } else {
        if (description !== "") {
            changeToTrue(form.description);
            return true;
        } else {
            changeToFalse(form.description);
            return false;
        }
    }
}

function checkCuisine(cuisine, form) {
    let pattern = / /;

    if (cuisine.length < 1) {
        changeToFalse(form.cuisine);
        return false;
    } else {
        if (!pattern.test(cuisine)) {
            changeToTrue(form.cuisine);
            return true;
        } else {
            changeToFalse(form.cuisine);
            return false;
        }
    }
}

function checkDays(openingDays) {
    let daysErrorId = document.getElementById("daysError");

    if (openingDays.length < 1) {
        daysErrorId.classList.remove("d-none");
        return false;
    } else {
        daysErrorId.classList.add("d-none");
        return true;
    }
}

function checkPhone(phone, form) {
    let pattern = new RegExp("^[0-9]{9}$");

    if (pattern.test(phone)) {
        changeToTrue(form.phone);
        return true;
    } else {
        changeToFalse(form.phone);
        return false;
    }
}

function checkImage(image, form) {
    if (image.length < 1) {
        changeToFalse(form.image);
        return false;
    } else {
        changeToTrue(form.image);
        return true;
    }
}

export function checkOpening(daysOpen) {
    let weekendDay = new Date().getDay();

    if (daysOpen.includes(weekendDay.toString())) {
        return true;
    } else {
        return false;
    }
}

export function imgPrev() {
    let file = document.querySelector("#image");
    let preview = document.querySelector("#imgPreview");

    file.addEventListener("change", () => {
        let file2 = file.files;
        if (!file2 || !file2.length) {
            preview.src = "";
            return;
        }
        let firstFile = file2[0];
        let objectURL = URL.createObjectURL(firstFile);
        preview.src = objectURL;
    });
}
