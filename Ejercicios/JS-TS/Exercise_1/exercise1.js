/**
 * Part 1
 * Create a function that receives 2 strings. The second string must contain only a letter
 * It should return the number of times that letter (second parameter) is included in the string (first parameter).
 * It should not differentiate between uppercase and lowercase letters
 * Check that both parameters are strings and the second string is only 1 character. If there's an error, print a message and return -1
 * Example: timesChar("Characteristic", "c") -> 3
 */
console.log("EXERCISE 1 - PART 1");
function timesChar(string, str) {
  if (str.length > 1 || str.length < 1) {
    return -1;
  } else {
    return string.match(new RegExp(str, "ig")).length;
  }
}
console.log(timesChar("HolaO", "o")); // 2

/**
 * Part 2
 * Create an array of strings.
 * Filter the array to include only the strings which their length is at least 5 characters
 * Transform all the strings in the filtered array to UPPERCASE
 * Print the resulting array, using ";" as the separator
 * Don't use traditional loops! (while, for, ...)
 */
/*   
console.log("EXERCISE 1 - PART 2");

let arrayString = ["Andres", "Nestor", "Pedro", "Ivan", "Joan", "Miguel"];
let arrayDos = new Array();
let contador = 0;

arrayString.forEach((s) => {
  if(s.length >= 5) {
    arrayDos[contador] = s+";";
    contador++;
  }
});

console.log(arrayDos);
-----------------------------------------------------------------------   */

console.log("EXERCISE 1 - PART 2");

let arrayString = ["Nestor", "Andres", "Ivan", "Joan", "Pedro", "Miguel"];

let filter = arrayString
  .filter((name) => name.length >= 5)
  .map((name) => name.toUpperCase());
console.log(filter);

let string = filter.reduce((result, e) => result + ";" + e);
console.log(string);

/**
 * Part 3
 * Create a function that receives 3 parameters with default values (product -> "Generic product",
 * price -> 100, tax 21). Transform the product's name to string and the other 2 parameters to number.
 * If price or tax cannot be converted to number (NaN), show an error.
 * Finally, print the received product and the final price (including taxes)
 * Call this function several times, omitting parameters or sending not numeric values.
 */
console.log("EXERCISE 1 - PART 3");

function transform(product = "Generic product", price = 100, tax = 21) {
  product = String(product);

  if (isNaN(+price) || isNaN(+tax)) {
    console.error("Price or tax is not a number");
  } else {
    tax = "1." + tax;
    console.log("Total price: " + price * +tax + "€");
  }
}
// transform("Coca-Cola",1.5,"Coca-Cola");
// transform("Coca-Cola","Coca-Cola",1.5);
// transform();
transform("Coca-Cola", 1.5, 21);

/**
 * Part 4
 * Create an array with 4 values and do the following (use the correct array methods).
 * Add 2 elements at the beginning
 * Add 2 more at the end.
 * Delete positions 3,4 and 5
 * Insert 2 elements before the last element.
 * On each change, show the resulting array with its elements separated by '=>' (don't use any loop).
 */
console.log("EXERCISE 1 - PART 4");

let array4 = ["Nestor", "Andres", "Joan", "Miguel"];
console.log(array4.toString());

array4.unshift("Pedro", "Ivan");
console.log(array4.toString());

array4.push("Manuel", "Gabriel");
console.log(array4.toString());

array4.splice(3, 3);
console.log(array4.toString());

array4.splice(array4.length - 1, 0, "Alfredo", "Rocio");
console.log(array4.toString());

/**
 * Part 5
 * Create an array with several strings. Using the reduce method, return a string
 * that is a concatenation of the first letter of every string in the array.
 */

console.log("EXERCISE 1 - PART 5");

let array5 = ["Nestor", "Andres", "Joan", "Miguel"];
let cadena5;

/**
 * Part 6
 * Create an array with several strings. Using the reduce method, return the total length of all the strings.
 */
console.log("EXERCISE 1 - PART 6");

let array6 = ["Nestor", "Andres", "Joan", "Miguel"];
let array6Length = array6.map((n) => n.length);

console.log(array6Length);

/**
 * Part 7
 * Create a function that receives an array and adds the first three numbers of the array.
 * Use array destructuring in the parameters to get those three numbers.
 * If any of those numbers is not present in the array, a default value of 0 will be assigned
 * Return the result of adding those three numbers
 */
console.log("EXERCISE 1 - PART 7");

function sumArray(...numbers) {
  return (n1 = 0, n2 = 0, n3 = 0) => {
    n1 + n2 + n3;
  };
}

console.log(sumArray(12, 0, 12, 32));

/**
 * Part 8
 * Create a funcion that can receive as many numbers as you want by parameter. Use rest to group them in
 * an array and print the ones that are even and the ones that arre odd separately.
 * DON'T use loops (for, while, etc.)
 * Call this function several times with different values.
 */
console.log("EXERCISE 1 - PART 8");

function parImpar(...numbers) {
  console.log("Pares: " + numbers.filter((n) => n % 2 === 0));
  console.log("Impares: " + numbers.filter((n) => n % 2 === 1));
}
parImpar(1, 4, 5, 6, 7, 8, 9, 10);
parImpar(4, 4, 4, 1);
/**
 * Part 9
 * Create a Map object. The key will be a student name, and the value an array with all his/her exam marks.
 * Iterate through the Map and show each student's name, the marks separated by '-' and the average mark (with 2 decimals).
 * Example: Peter (7.60 - 2.50 - 6.25 - 9.00). Average: 6.34
 */
console.log("EXERCISE 1 - PART 9");

let people = new Map();
people.set("Nestor", [5.6, 6.4, 7, 8, 9]);
people.set("Andres", [1.8, 3, 7.5, 5, 3]);
people.set("Joan", [5, 8, 8.5, 8, 10]);
people.set("Miguel", [3.5, 6.5, 3, 3, 3]);

people.forEach((notas, nombre) => {
  let media = 0;

  for (let i = 0; i < notas.length; i++) {
    media += notas[i];
  }
  media / notas.length;

  console.log("Nombre: " + nombre + ", nota: " + media);
});

/**
 * Part 10
 * Create a function that receives an array, deletes its duplicated values and prints them.
 * Create a Set object from the array to delete the duplicated values.
 */
console.log("EXERCISE 1 - PART 10");

let array10 = [
  "Nestor",
  "Andres",
  "Joan",
  "Miguel",
  "Nestor",
  "Andres",
  "Joan",
  "Miguel",
];

let deleteDuplicates = (strings) => {
  console.log(new Set(strings));
}

deleteDuplicates(array10);
