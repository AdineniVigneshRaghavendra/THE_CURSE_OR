const maze = document.getElementById("maze");
const message = document.getElementById("message");
const walls = document.querySelectorAll(".wall");
const start = document.querySelector(".start");
const exit = document.querySelector(".exit");

let gameStarted = false;
let resetting = false;

start.addEventListener("mouseenter", () => {
    if(resetting) return;

    gameStarted = true;

    message.textContent = "Find the exit";
});

maze.addEventListener("mouseenter", (event) => {
    if(!gameStarted || resetting) {
        return;
    }
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    for(const wall of walls) {
        const wallRect = wall.getBoundingClientRect();

        if(
            mouseX >= wallRect.left &&
            mouseX <= wallRect.right &&
            mouseY >= wallRect.top &&
            mouseY <= wallRect.bottom
        ) {
            wallHit();
            return;
        }
    }

    const exitRect = exit.getBoundingClientRect();

    if(
        mouseX >= exitRect.left &&
        mouseX <= exitRect.right &&
        mouseY >= exitRect.top &&
        mouseY <= exitRect.bottom
    ) {
        reachedExit();
    }
});

function 