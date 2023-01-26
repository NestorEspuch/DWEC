"use strict";

let cont = document.getElementById("container");
let result = document.getElementById("result");

let letClass = (e) => e.target.classList.toggle("selected");
let writeText = (e) => {
    if (e.ctrlKey) {
        // result.innerText = e.target.innerText;
        result.replaceChildren(e.target.textContent);
    }
}

cont.querySelectorAll("div").forEach(div => { 
    div.addEventListener("mouseenter", letClass)
    div.addEventListener("mouseleave", letClass)
    div.addEventListener("click",writeText)
});
