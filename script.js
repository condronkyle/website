// Variable to hold the currently selected player
let selectedPlayer = null;

// Variable to hold the baseball element
let baseball = null;

// ... (Previous code remains the same)

// Variable to indicate whether a player is holding the ball
let holdingBall = false;

let baseballInterval = null;

let targetBase = null;  // Variable to hold the target base for throwing

// Function to select a player when clicked
function selectPlayer(event) {
    if (selectedPlayer) {
        selectedPlayer.style.backgroundColor = "blue";
    }

    selectedPlayer = event.target;
    updatePlayerColor();
}

function updatePlayerColor() {
    if (holdingBall) {
        selectedPlayer.style.backgroundColor = "yellow";
    } else {
        selectedPlayer.style.backgroundColor = "red";
    }
}

// Function to move the selected player using arrow keys
function movePlayer(event) {
    if (!selectedPlayer) return;

    let x = selectedPlayer.offsetLeft;
    let y = selectedPlayer.offsetTop; // Changed to use 'top'

    console.log("Player coordinates:", x, y);  // Debug log

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

    // Update player position
    selectedPlayer.style.left = x + "px";
    selectedPlayer.style.top = y + "px"; 


    if (baseball && !holdingBall) {
        const baseballX = baseball.offsetLeft;
        const baseballY = baseball.offsetTop;
        const distance = Math.sqrt((x - baseballX) ** 2 + (y - baseballY) ** 2);

        if (distance < 20) {
            holdingBall = true;
            clearInterval(baseballInterval);  // Clear the interval controlling the baseball's movement
            updatePlayerColor();
        }
    }

    if (holdingBall) {
        baseball.style.left = (x + 5) + "px";
        baseball.style.top = (y + 5) + "px";
    }
}




// Function to create and launch the baseball when "Hit" button is clicked
function hitBaseball() {
    holdingBall = false;  // Reset the holdingBall flag when a new ball is hit
    baseball = document.createElement("div");
    baseball.className = "baseball";
    baseball.style.position = "absolute";
    baseball.style.width = "10px";
    baseball.style.height = "10px";
    baseball.style.backgroundColor = "white";
    baseball.style.borderRadius = "50%";
    baseball.style.left = "300px";
    baseball.style.top = "550px"; // Changed to use 'top'
    
    document.getElementById("field").appendChild(baseball);

    const angle = Math.random() * 2 * Math.PI;
    let velocity = Math.random() * 8 + 2;  // Random starting velocity between 2 and 10
    const friction = 0.98;  // Friction factor
    let x = 300;
    let y = 50;

    baseballInterval = setInterval(() => {
        x += velocity * Math.cos(angle);
        y += velocity * Math.sin(angle);
        
        // Apply friction to slow down the ball
        velocity *= friction;

        baseball.style.left = x + "px";
        baseball.style.bottom = y + "px";
        
        if (x < 0 || x > 600 || y < 0 || y > 600 || velocity < 0.1) {
            clearInterval(interval);
            if (baseball) {
                baseball.remove();
                baseball = null;
            }
        }
    }, 50);
}

// Function to handle throwing
function handleThrow(event) {
    if (!holdingBall || !selectedPlayer) return;

    if (event.key === " ") {
        if (targetBase) {
            throwBall(targetBase);
        }
    } else {
        targetBase = event.key;
    }
}

// Function to throw the ball
function throwBall(base) {
    const bases = {
        '1': { x: 364, y: 486 },
        '2': { x: 300, y: 423 },
        '3': { x: 236, y: 486 },
        '4': { x: 300, y: 550 }
    };

    let target = bases[base];
    if (!target) return;

    const angle = 45
    //const angle = Math.atan2(target.y - baseball.offsetTop, target.x - baseball.offsetLeft);
    let velocity = 5;  // Fixed starting velocity
    const friction = 0.98;  // Friction factor

    holdingBall = false;
    updatePlayerColor();

    const interval = setInterval(() => {
        let x = baseball.offsetLeft;
        let y = baseball.offsetTop;

        x += velocity * Math.cos(angle);
        y += velocity * Math.sin(angle);

        // Apply friction to slow down the ball
        velocity *= friction;

        baseball.style.left = x + "px";
        baseball.style.top = y + "px";  // Changed to use 'top'

        if (x < 0 || x > 600 || y < 0 || y > 400 || velocity < 0.1) {
            clearInterval(interval);
            baseball.remove();
            baseball = null;
        }
    }, 50);
}

document.addEventListener("keydown", handleThrow);



document.addEventListener("keydown", movePlayer);

document.querySelectorAll(".player").forEach(player => {
    player.addEventListener("click", selectPlayer);
});

document.getElementById("hit-button").addEventListener("click", hitBaseball);
