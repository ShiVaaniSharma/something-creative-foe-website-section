document.addEventListener('DOMContentLoaded', () => {
    const nuggetTextElement = document.getElementById('nuggetText');
    const nuggetAuthorElement = document.getElementById('nuggetAuthor');
    const refreshButton = document.getElementById('refreshNuggetBtn');

    const nuggets = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
        { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
        { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "An unexamined life is not worth living.", author: "Socrates" },
        { text: "Eighty percent of success is showing up.", author: "Woody Allen" },
        { text: "The only source of knowledge is experience.", author: "Albert Einstein" },
        { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson"},
        { text: "Small opportunities are often the beginning of great enterprises.", author: "Demosthenes"},
        { text: "Tip: Drink a glass of water first thing in the morning to rehydrate.", author: "Health Hack"},
        { text: "Fact: Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.", author: "Fun Fact"},
        { text: "Productivity Tip: Use the Pomodoro Technique (25 min work, 5 min break) to stay focused.", author: "Life Hack"}
    ];

    let lastNuggetIndex = -1; // To ensure the same nugget isn't shown twice in a row

    function getRandomNugget() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * nuggets.length);
        } while (randomIndex === lastNuggetIndex && nuggets.length > 1); // Ensure different nugget if possible
        lastNuggetIndex = randomIndex;
        return nuggets[randomIndex];
    }

    function displayNugget() {
        const nugget = getRandomNugget();

        // Fade out old text
        nuggetTextElement.classList.add('fade-out');
        nuggetAuthorElement.classList.add('fade-out');

        setTimeout(() => {
            nuggetTextElement.textContent = nugget.text;
            nuggetAuthorElement.textContent = nugget.author ? `– ${nugget.author}` : "";

            // Fade in new text
            nuggetTextElement.classList.remove('fade-out');
            nuggetTextElement.classList.add('fade-in');
            nuggetAuthorElement.classList.remove('fade-out');
            nuggetAuthorElement.classList.add('fade-in');
        }, 300); // Match CSS transition duration
    }

    if (refreshButton) {
        refreshButton.addEventListener('click', displayNugget);
    }

    // Display initial nugget
    if (nuggetTextElement && nuggetAuthorElement) {
        displayNugget();
    } else {
        console.error("Nugget elements not found!");
    }
});