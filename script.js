API = "https://free-to-play-games-database.p.rapidapi.com/api/games";
let allGamesData= {};
mockAPI = "https://65e29554a8583365b31846d3.mockapi.io/v1/Favourites/";
let cardContainer = document.querySelector("#cardContainer");

async function getAllGames(API){
    res = await fetch(API,{
        method : "GET",
        headers: {
            'x-rapidapi-key': '58946477c2mshaedf842781d4ce5p19449ajsnc3975d4c7d9e',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    });

    allGamesData = await res.json()
    console.log(allGamesData); 
    mapAllGames(allGamesData, cardContainer, "Add to Favourite");
}

// Create Display Area
async function mapAllGames(allGamesData, container, buttonText){
    await allGamesData.map((game,index)=>{
        createGameCard(game, container, buttonText)
        // console.log(game.title, game.game_url)
    })
}

getAllGames(API);

// Create Game Card with Add to favourite button


function createGameCard(game, container, buttonText){
    let gameCard = document.createElement("div");
    gameCard.className = "gameCard";
    gameCard.innerHTML += `
    <div class="col-1">
        <img src=${game.thumbnail} alt="logo">
    </div>
    <div  class="col-2">
        <h4><span class="title">Title:</span><span id="gameName">${game.title}</span></h4>
        <p>Genre: <span id="gameGener">${game.genre}</span></p>
        <p>Platform: <span id="gamePlatform">${game.platform}</span></p>
    </div>
    <button data-id=${game.id} id="addFav-btn">${buttonText}</button>
    `;
    container.append(gameCard);
}

// createGameCard();

// Create Favourites Section
let favArea = document.querySelector("#favArea");

async function createFavourites(mockAPI, container){
    try {
        res = await fetch (mockAPI,{
            method : "GET"
        });
        data = await res.json();
        console.log(data)
        mapAllGames(data, container, "Remove")
    } catch (error) {
        console.log(error);
    }
}

createFavourites(mockAPI, favArea);

// Function to add in MockAPI
async function postFav( payLoad){
    try {
        
        res = await fetch(mockAPI,{
            method : "POST",
            body : JSON.stringify(payLoad),
            headers : {
                "Content-Type" : "application/json"
            },
        })

        data = await res.json();
        console.log(data);
        createGameCard(payLoad, favArea, "Remove");
    } catch (error) {
        console.log(error);
    }
}

// Function to add favourite game
cardContainer.addEventListener("click",(e)=>{
    e.preventDefault();
    let gameID = e.target.dataset.id;
    let id = e.target.id;
    let parentNode = e.target.parentNode;
    let gameName = e.target.parentNode.querySelector("#gameName").innerHTML;
    let gameGener = e.target.parentNode.querySelector("#gameGener").innerHTML;
    let gamePlatform = e.target.parentNode.querySelector("#gamePlatform").innerHTML;
    let gameThumbnail = e.target.parentNode.querySelector(".col-1 img").src;
    
    // console.log(gameID,gameName,gameGener,gamePlatform,gameThumbnail)

    payLoad = {
        title : gameName,
        gener : gameGener,
        platform : gamePlatform,
        thumbnail : gameThumbnail,
        gameID : gameID
    }

    postFav(payLoad);

});


// Add Search field
favArea.addEventListener("click",(e)=>{
    e.preventDefault();
    id = e.target.dataset.id;
    btnName = e.target.innerHTML;
    if(btnName == "Remove"){
        let parentNode = e.target.parentNode;
        console.log(id);
        deleteFav(id, parentNode);
    } 
})

// Function to remove game from favourite area
// Remove from mock API
async function deleteFav(id,parentNode) {
    try {
        res = await fetch(`${mockAPI}${id}`, {
            method : "DELETE"
        })
        data = await res.json();
        console.log(data);
        parentNode.remove();
    } catch (error) {
        console.log(error);
    }
}
