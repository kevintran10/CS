const preloadElement = document.getElementById("js-preloader");
const gameList = document.querySelector(".gameList");
const moreGamesBtn = document.querySelector(".main-button");

let newGameListUrl = null;

const generateRandomSeed = () => {
    return Math.floor(Math.random() * 6000); 
};

// Include the random seed in the API URL
const APIurl = `https://api.rawg.io/api/games?key=${APIkey}&dates=2010-01-01,2023-12-31&ordering=-added&seed=${generateRandomSeed()}`;

const getPlatformString = (platforms) => {
    const platformString = (platforms ?? []).map(each => each.platform.name).join(", ");
    if (platformString.length > 30) {
        return platformString.substring(0, 30) + "...";
    }
    return platformString;
}

function loadingGames(APIurl) {
    preloadElement.classList.remove("loaded");

    fetch(APIurl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            newGameListUrl = data.next ? data.next : null;
            const games = data.results;
            preloadElement.classList.add("loaded");

            games.forEach(game => {
                const gameItemElement = createGameItemElement(game);
                gameList.insertAdjacentHTML("beforeend", gameItemElement);
            });
        });
}

function createGameItemElement(game) {
    return `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="item">
                <img src="${game.background_image}" alt="${game.name} image"/>
                <h3 class="game-name">${game.name}
                    <br>
                    <span class="platforms">${getPlatformString(game.parent_platform)}</span>
                </h3>

                <ul>
                    <li><i class="fa fa-star"></i> <span class="rating">${game.rating}</span></li>
                    <li><i class="fa-regular fa-calendar"></i> <span class="date">${game.released}</span></li>
                </ul>

                <button onclick="updateGame(${game.id})" style="background-color: black; color: white;">Like</button>
                <button onclick="deleteGame(${game.id})" style="background-color: #ff69b4; color: white;">Delete</button>
            </div>
        </div>
    `;
}

function updateGame(gameId) {
    console.log(`Updating game with ID ${gameId}`);
}

function deleteGame(gameId) {
    const deleteUrl = `https://api.rawg.io/api/games/${gameId}`;

    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(`Game with ID ${gameId} deleted successfully`);

        const gameElement = document.getElementById(`game-${gameId}`);
        if (gameElement) {
            gameElement.remove();
        }
    })
    .catch(error => console.error('Error deleting game:', error));
}

loadingGames(APIurl);
