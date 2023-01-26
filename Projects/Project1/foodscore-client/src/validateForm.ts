"use strict";

export function formValidation(form: HTMLFormElement, openingDays: string[]): boolean {
    let valid = true;
    if (!checkName((form.name as unknown as HTMLFormElement).value.trim(), form)) {
        valid = false;
    }
    if (!checkDescription(form.description.value.trim(), form)) {
        valid = false;
    }
    if (!checkCuisine(form.cuisine.value.trim(), form)) {
        valid = false;
    }
    if (!checkDays(openingDays)) {
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

export function fillDays(array: string[]): string {
    let finalArray = "";
    array.forEach((e) => {
        switch (e) {
        case "0":
            finalArray += "Su,";
            break;
        case "1":
            finalArray += "Mo,";
            break;
        case "2":
            finalArray += "Tu,";
            break;
        case "3":
            finalArray += "We,";
            break;
        case "4":
            finalArray += "Th,";
            break;
        case "5":
            finalArray += "Fr,";
            break;
        case "6":
            finalArray += "Sa,";
            break;
        }
    });

    return finalArray.substring(0,finalArray.length-1);
}

export function readImage(): string {
    const file = document.querySelector("#image") as HTMLFormElement;

    const file2 = file.files;
    if (!file2 || !file2.length) {
        return "";
    }

    const firstFile = file2[0];
    const objectURL = URL.createObjectURL(firstFile);
    return objectURL;
}

function changeToTrue(e: HTMLElement): void {
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

function changeToFalse(e: HTMLFormElement): void {
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

function checkName(name2: string, form: HTMLFormElement): boolean {
    const pattern = new RegExp("^[a-zA-Z ]+$");
    if (name2.length < 1) {
        changeToFalse(form.name as unknown as HTMLFormElement);
        return false;
    } else {
        if (pattern.test(name2)) {
            changeToTrue(form.name as unknown as HTMLFormElement);
            return true;
        } else {
            changeToFalse(form.name as unknown as HTMLFormElement);
            return false;
        }
    }
}

function checkDescription(description: string, form: HTMLFormElement): boolean {
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

function checkCuisine(cuisine: string, form: HTMLFormElement): boolean {
    const pattern = / /;

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

function checkDays(openingDays: string[]): boolean {
    const daysErrorId = document.getElementById("daysError");

    if (openingDays.length < 1) {
        daysErrorId.classList.remove("d-none");
        return false;
    } else {
        daysErrorId.classList.add("d-none");
        return true;
    }
}

function checkPhone(phone: string, form: HTMLFormElement): boolean {
    const pattern = new RegExp("^[0-9]{9}$");

    if (pattern.test(phone)) {
        changeToTrue(form.phone);
        return true;
    } else {
        changeToFalse(form.phone);
        return false;
    }
}

function checkImage(image: string, form: HTMLFormElement): boolean {
    if (image.length < 1) {
        changeToFalse(form.image);
        return false;
    } else {
        changeToTrue(form.image);
        return true;
    }
}

export function checkOpening(daysOpen: string[]): boolean {
    const weekendDay = new Date().getDay();

    if (daysOpen.includes(weekendDay.toString())) {
        return true;
    } else {
        return false;
    }
}

export function imgPrev(): void {
    const file = document.querySelector("#image") as HTMLFormElement;
    const preview = document.querySelector("#imgPreview") as HTMLImageElement;

    file.addEventListener("change", () => {
        const file2 = file.files;
        if (!file2 || !file2.length) {
            preview.src = "";
            return;
        }
        const firstFile = file2[0];
        const objectURL = URL.createObjectURL(firstFile);
        preview.src = objectURL;
    });
}
