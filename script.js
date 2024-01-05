const nameSequence = "DENIZ"; // Replace with your name or surname
const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
let score = 0;
let cards = [];

const imageUrls = {"D": "D.svg","E": "E.svg","N": "N.svg","I": "I.svg", "Z": "Z.svg"};

function createCard(letter) {
    const card = document.createElement("div");
    card.classList.add("card");
	card.classList.add(letter);
	card.letter = letter;

    // Create an image element
    const image = document.createElement("img");
	card.image = image
    image.src = imageUrls[letter]; // Get the URL for the image
    card.appendChild(image);

    // Add click event listener to the card
    card.addEventListener("click", () => handleCardClick(card));

	console.log("harfler " + card.letter)
	
    return card;
}

function initializeGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    cards = [];

    // Create and shuffle cards
    const shuffledSequence = nameSequence.split("").sort(() => Math.random() - 0.5);

    // Populate game board with cards
    gameBoard.innerHTML = "";
    shuffledSequence.forEach((letter) => {
        const card = createCard(letter);
        gameBoard.appendChild(card);
        cards.push(card);
    });

    // Hide letters after 1.5 second
    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.add("face-down");
			card.removeChild(card.image)
        });
    }, 1500);
}

function startGame() {
    initializeGame();
}

function restartGame() {
    initializeGame();
}


function handleCardClick(clickedCard) {
    const expectedLetter = nameSequence[score / 20];
	console.log(clickedCard.textContent)
	
	if (clickedCard.classList.contains('face-down')){
		if (clickedCard.classList[1] === expectedLetter) {
			// Correct sequence
			score += 20;
			scoreDisplay.textContent = `Score: ${score}`;

			// Reveal the letter for the clicked card
			console.log(clickedCard.classList)
			clickedCard.classList.remove("face-down");
			
			clickedCard.appendChild(clickedCard.image);

			
		} else {
			// Wrong attempt
			alert("Wrong attempt! Game over.");
			initializeGame();
		}
    }
	// Check if there are still face-down cards after a short delay
            setTimeout(() => {
                if (nameSequence.length * 20 === score) {
                    alert("Congratulations! You completed the game!");
                    initializeGame();
                }
            }, 10);
}



// Initialize the game on page load
document.addEventListener("DOMContentLoaded", initializeGame);
