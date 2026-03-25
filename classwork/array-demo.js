let fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];

console.log("===== Using For Loop =====");
// Using for loop to iterate through the array
for (let i = 0; i < fruits.length; i++) {
    console.log((i + 1) + ". " + fruits[i]);
}

console.log("\n===== Using ForEach Loop =====");
// Using forEach loop to iterate through the array
fruits.forEach(function(fruit, index) {
    console.log((index + 1) + ". " + fruit);
});

console.log("\n===== Using Arrow Function with ForEach =====");
// Using arrow function syntax with forEach
fruits.forEach((fruit, index) => {
    console.log((index + 1) + ". " + fruit);
});

console.log("\n===== Array Details =====");
console.log("Array: ", fruits);
console.log("Array Length: ", fruits.length);
console.log("First Item: ", fruits[0]);
console.log("Last Item: ", fruits[fruits.length - 1]);
