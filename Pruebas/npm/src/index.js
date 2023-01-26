import {DateTime} from "luxon";
function sayHello(name) {
    let date = DateTime.now();
    console.log("Hello " + name);
    console.log(date.setLocale("es").toLocaleString());
}
sayHello("Néstor");