const maze = document.getElementById("maze");
const message = document.getElementById("message");
const walls = document.querySelectorAll(".wall");
const start = document.querySelector(".start");
const exit = document.querySelector(".exit");
const fakeCursor = document.getElementById("fakeCursor");
const jumpscare = document.getElementById("jumpscare");

let lastMouseX = 0;
let lastMouseY = 0;


let gameStarted = false;
let resetting = false;

start.addEventListener("click", () => {
    if(resetting) return;

    gameStarted = true;

    message.textContent = "Find the exit";
});

maze.addEventListener("mousemove", (event) => {

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

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
    });

   exit.addEventListener("click", () => {
    if(!gameStarted || resetting) return;

    reachedExit();
   });

function wallHit() {
    gameStarted = false;
    resetting = true;

    message.textContent = "YOU TOUCHED THE WALL.";

    setTimeout(() => {
        message.textContent = "Try again.";

        resetting=false;
    }, 1000);
}
function reachedExit() {
    gameStarted = false;
    message.textContent = "...";
    setTimeout(() => {
        message.textContent = "WAIT.";
    }, 1500);

    setTimeout(() => {
        message.textContent = "Something is wrong.";

        document.body.style.cursor = "none";

        fakeCursor.style.display = "block";
        fakeCursor.style.left = lastMouseX + "px";
        fakeCursor.style.top =  lastMouseY + "px";
        setTimeout(() => {
            fakeCursor.style.transition = "left 2s ease";
            fakeCursor.style.left = (lastMouseX + 80) + "px";
        }, 1000);
        setTimeout(() => {

            fakeCursor.style.transition = "none";

            let moves = 0;

            const berserk = setInterval(() => {

                const randomX = Math.random * (window.innerWidth - 40);
                const randomY = Math.random() * (window.innerHeight - 40);

                fakeCursor.style.left = randomX + "px";
                fakeCursor.style.top = randomY + "px";
                fakeCursor.style.transform =
                `rotate(${Math.random() * 360}deg)`;

                moves++;

                if(moves>=20)
                {
                    clearInterval(berserk);

                    fakeCursor.style.display = "none";
                }
            }, 100);

        
        }, 4500);
        setTimeout(() => {
            jumpscare.style.display = "flex";

            setTimeout(() => {
                jumpscare.style.display = "none";

                message.textContent = "You should not have clicked EXIT.";
            }, 700);
        }, 7000);

    }, 3000);

    setTimeout(() => {
        message.textContent = "DON'T MOVE YOUR MOUSE.";
    }, 5000);
}