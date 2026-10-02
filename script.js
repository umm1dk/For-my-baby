// -------------------------
// PAGE NAVIGATION
// -------------------------

let currentPage = 1;

function showPage(number) {
    const targetPage = document.getElementById("page" + number);

    if (!targetPage) {
        console.error("Page " + number + " does not exist!");
        return;
    }

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    targetPage.classList.add("active");
    currentPage = number;
}

function nextPage() {
    const next = currentPage + 1;

    if (next <= 6 && document.getElementById("page" + next)) {
        showPage(next);
    }
}

function previousPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}


// -------------------------
// MUSIC
// -------------------------

let musicPlaying = false;

function toggleMusic() {
    const music = document.getElementById("music");
    const button = document.getElementById("musicButton");

    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        button.textContent = "♫ MUSIC OFF";
    } else {
        music.play()
            .then(() => {
                musicPlaying = true;
                button.textContent = "♫ MUSIC ON";
            })
            .catch(() => {
                button.textContent = "ADD music.mp3";
            });
    }
}


// -------------------------
// THIS OR THAT
// -------------------------

function choose(button) {
    const buttons =
        button.parentElement.querySelectorAll("button");

    buttons.forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");
}


// -------------------------
// LOVE QUESTION
// -------------------------

function loveAnswer(answer) {
    const answerText = document.getElementById("answerText");

    if (answer === "yes") {
        answerText.textContent =
            "I knew it! 😭💗 You're stuck with me now!";
        createHearts();
    } else {
        answerText.textContent =
            "WHAT?! 😭💔 Nice try, baby. I know you love me! 💗";
    }

    setTimeout(() => {
        nextPage();
    }, 1500);
}


// -------------------------
// MATCHING GAME
// -------------------------

const cardValues = ["💗", "⭐", "🌸", "💗", "⭐", "🌸"];

let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffleCards() {
    shuffledCards = [...cardValues];

    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledCards[i], shuffledCards[j]] =
            [shuffledCards[j], shuffledCards[i]];
    }
}

function flipCard(button) {

    if (
        lockBoard ||
        button.classList.contains("matched") ||
        button === firstCard
    ) {
        return;
    }

    const cards = Array.from(
        document.querySelectorAll(".game-card")
    );

    const index = cards.indexOf(button);

    if (index === -1) {
        return;
    }

    // Show the emoji
    button.textContent = shuffledCards[index];

    if (firstCard === null) {
        firstCard = button;
        return;
    }

    secondCard = button;
    lockBoard = true;

    const firstIndex = cards.indexOf(firstCard);
    const secondIndex = cards.indexOf(secondCard);

    if (
        shuffledCards[firstIndex] ===
        shuffledCards[secondIndex]
    ) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;

        document.getElementById("gameMessage").textContent =
            matchedPairs === 3
                ? "You won my heart! 💗🥹"
                : "It's a match! 💕";

        firstCard = null;
        secondCard = null;
        lockBoard = false;

        if (matchedPairs === 3) {
            createHearts();
        }

    } else {

        document.getElementById("gameMessage").textContent =
            "Not a match! Try again 💗";

        setTimeout(() => {

            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard = null;
            secondCard = null;
            lockBoard = false;

        }, 800);
    }
}

function resetGame() {

    const cards = document.querySelectorAll(".game-card");

    cards.forEach(card => {
        card.textContent = "?";
        card.classList.remove("matched");
    });

    shuffleCards();

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;

    document.getElementById("gameMessage").textContent =
        "You can do it! 💕";
}


// -------------------------
// PROMISES
// -------------------------

function promiseClick(button) {
    button.classList.toggle("clicked");

    if (button.classList.contains("clicked")) {
        button.textContent =
            button.textContent.replace("💗", "💖");
    } else {
        button.textContent =
            button.textContent.replace("💖", "💗");
    }
}


// -------------------------
// FINAL MESSAGE
// -------------------------

function showFinalMessage() {
    document.getElementById("finalMessage").textContent =
        "I will always love you more my wifey bby 🤭💗";

    const endingMusic = document.getElementById("endingMusic");

    endingMusic.currentTime = 0;

    endingMusic.play().catch(() => {
        console.log("Ending music could not autoplay.");
    });

    createHearts();
}


// -------------------------
// FLOATING KISSES & HEARTS
// -------------------------

function createHearts() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement("div");

        heart.className = "floating-heart";

        heart.textContent = ["💋", "💗", "💕", "💖"][
            Math.floor(Math.random() * 4)
        ];

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize =
            (30 + Math.random() * 60) + "px";

        heart.style.animationDelay =
            Math.random() * 0.8 + "s";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4500);
    }
}
// -------------------------
// FLOATING BOWS 🎀
// -------------------------

function createBows() {

    const positions = [
        [5, 8],
        [25, 8],
        [50, 6],
        [75, 8],
        [95, 10],

        [12, 22],
        [38, 20],
        [65, 22],
        [88, 23],

        [5, 40],
        [25, 38],
        [75, 40],
        [95, 42],

        [15, 58],
        [40, 60],
        [65, 58],
        [90, 60],

        [5, 78],
        [30, 80],
        [55, 78],
        [80, 80],
        [95, 82],

        [15, 94],
        [45, 92],
        [70, 94],
        [90, 92]
    ];

    positions.forEach((position, index) => {

        const bow = document.createElement("div");

        bow.className = "floating-bow";
        bow.textContent = "🎀";

        bow.style.left = position[0] + "%";
        bow.style.top = position[1] + "%";

        bow.style.fontSize =
            (18 + Math.random() * 12) + "px";

        bow.style.animationDelay =
            (index * 0.25) + "s";

        document.body.appendChild(bow);
    });
}

createBows();


// -------------------------
// START THE GAME
// -------------------------

shuffleCards();
