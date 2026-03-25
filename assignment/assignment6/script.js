// Create an array with 5 numbers
let num = [1, 2, 3, 4, 5];

console.log("========== ASSIGNMENT 6: ARRAY OPERATIONS ==========");
console.log("Original Array: ", num);
console.log("");

console.log("===== Using For Loop =====");
// Using for loop to iterate through the array
for (let i = 0; i < num.length; i++) {
    let result;
    if (num[i] % 2 === 0) {
        // Even number - add 3
        result = num[i] + 3;
        console.log(num[i] + " is even, " + num[i] + " + 3 = " + result);
    } else {
        // Odd number - add 7
        result = num[i] + 7;
        console.log(num[i] + " is odd, " + num[i] + " + 7 = " + result);
    }
}

console.log("\n===== Using ForEach Loop =====");
// Using forEach loop to iterate through the array
num.forEach(function(number) {
    let result;
    if (number % 2 === 0) {
        // Even number - add 3
        result = number + 3;
        console.log(number + " is even, " + number + " + 3 = " + result);
    } else {
        // Odd number - add 7
        result = number + 7;
        console.log(number + " is odd, " + number + " + 7 = " + result);
    }
});

console.log("\n===== Using Arrow Function with ForEach =====");
// Using arrow function syntax with forEach
num.forEach((number) => {
    let result;
    if (number % 2 === 0) {
        result = number + 3;
        console.log(number + " is even, " + number + " + 3 = " + result);
    } else {
        result = number + 7;
        console.log(number + " is odd, " + number + " + 7 = " + result);
    }
});

console.log("\n===== Summary =====");
console.log("Array: ", num);
console.log("Array Length: ", num.length);
console.log("Total numbers: ", num.length);
