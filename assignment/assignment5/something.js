// Get current date
let today = new Date();

// Get day number (0 = Sunday, 6 = Saturday)
let dayNumber = today.getDay();

let dayName;

// Use switch to determine day name
switch(dayNumber) {
    case 0:
        dayName = "Sunday";
        break;
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    default:
        dayName = "Unknown";
}

// Show alert
alert("Today's day is " + dayName);