// Select all elements with the class "box" (these represent the tic-tac-toe grid squares)
let boxes = document.querySelectorAll(".box");

// Select the reset button and new game button elements
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector("#new-btn");

// Select elements used to display messages
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

// Variable to track the current turn. True indicates Player O's turn; false indicates Player X's turn.
let turnO = true;

// Array defining all possible winning patterns in a tic-tac-toe game
const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
];

// Function to reset the game state and start a new game
const resetGame = () => {
    turnO = true; // Reset the turn to Player O
    enableBoxes(); // Re-enable all boxes and clear their content
    msgContainer.classList.add("hide"); // Hide the winner message container
};

// Add event listeners to each box to handle clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Determine which player's turn it is and update the box content
        if (turnO) {
            box.innerText = "O"; // Set the content to "O" for Player O
            turnO = false; // Switch the turn to Player X
        } else {
            box.innerText = "X"; // Set the content to "X" for Player X
            turnO = true; // Switch the turn back to Player O
        }
        box.disabled = true; // Disable the clicked box so it can't be clicked again

        // Check if there's a winner after each move
        checkWinner();
    });
});

// Function to disable all boxes after a winner is determined
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true; // Prevent further interaction with the boxes
    }
};

// Function to enable all boxes and clear their content (for a new game)
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; // Allow interaction with the boxes
        box.innerText = ""; // Clear the content of each box
    }
};

// Function to display the winner and end the game
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; // Display a congratulatory message
    msgContainer.classList.remove("hide"); // Make the message container visible
    disableBoxes(); // Disable all boxes to prevent further moves
};

// Function to check if a player has won
const checkWinner = () => {
    // Loop through all possible winning patterns
    for (let pattern of winPatterns) {
        // Get the content of the three boxes in the current pattern
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        // Check if all three boxes are filled and have the same content
        if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                console.log("winner"); // Log the winner to the console
                showWinner(posVal1); // Display the winner
            }
        }
    }
};

// Attach the resetGame function to both the new game and reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
