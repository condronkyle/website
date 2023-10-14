
// Variable to hold the currently selected player
let selectedPlayer = null;

// Function to select a player when clicked
function selectPlayer(event) {
    // Deselect any previously selected player
    if (selectedPlayer) {
        selectedPlayer.style.backgroundColor = "blue";
    }

    // Set the clicked player as the selected player
    selectedPlayer = event.target;
    selectedPlayer.style.backgroundColor = "red";
}

// Function to move the selected player using arrow keys
function movePlayer(event) {
    if (!selectedPlayer) return;

    let x = selectedPlayer.offsetLeft;
    let y = selectedPlayer.offsetTop;

    switch(event.key) {
        case "ArrowUp":
            y -= 10;
            break;
        case "ArrowDown":
            y += 10;
            break;
        case "ArrowLeft":
            x -= 10;
            break;
        case "ArrowRight":
            x += 10;
            break;
        default:
            return;  // Exit the function if any other key is pressed
    }

    selectedPlayer.style.left = x + "px";
    selectedPlayer.style.top = y + "px";
}

// Attach click event listeners to all player dots
const players = document.querySelectorAll(".player");
players.forEach(player => player.addEventListener("click", selectPlayer));

// Attach keydown event listener to the document
document.addEventListener("keydown", movePlayer);
