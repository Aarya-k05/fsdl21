const listy = [
    "Hello", "What", "Enough", "Okay, Enough!", "What do you want?", "Piss off"
];

let index = 0; // Keep track of the current position

function getlist() {
    let head = document.getElementById("tag"); 
    head.innerText = listy[index];


    index = (index + 1) % listy.length;
}
