//Create empty list to store movies
let allMovies=[];
let fullMovies=[];

const items={...localStorage};
console.log("localStorage:",items);

const movieList = document.getElementById('list');
const searchMovie = document.getElementById('search');
const homeBtn=document.getElementById('Home-btn');

//Show Notifications
function showNotification(text){
	alert(text);
}

//Show movie page in details
async function showMoviePage(movieClickedId){
	console.log("show movie id",movieClickedId);
	try{
		//Using API to get all the movies(getting by id)
		const response=await fetch(`https://omdbapi.com/?i=${movieClickedId}&apikey=4fca6594&page=1`);
		const data = await response.json();
		console.log(data)
	  displayMovieById=[data];
   }
	catch(error){
		console.log("error",error);
	}
	movieList.innerHTML=" ";
	const div=document.createElement('div');
		let desiredMovie=displayMovieById[0];
		const movieDisplay=document.createElement("div");

		//Displaying all the details 
			movieDisplay.innerHTML=`
				<div id="display-movie-details">
		  			<img src="${desiredMovie.Poster}" class="movie-img" data-id="${desiredMovie.imdbID}"/>
		  			<div id="name-year-plot">
        			<label id="${desiredMovie.imdbID}" class="movie-name">Movie Name:${desiredMovie.Title}</label>
        			<label id="${desiredMovie.imdbID}">Year:${desiredMovie.Year}</label>
        			<label id="${desiredMovie.imdbID}">Plot: ${desiredMovie.Plot}</label>
        			<label id="${desiredMovie.imdbID}">Type: ${desiredMovie.Type}</label>
							<label id="${desiredMovie.imdbID}">Rating:${desiredMovie.imdbRating}</label>
							<label id="${desiredMovie.imdbID}">Genre: ${desiredMovie.Genre}</label>
							<label id="${desiredMovie.imdbID}">Language:${desiredMovie.Language}</label>
							<label id="${desiredMovie.imdbID}">Runtime: ${desiredMovie.Runtime}</label>

							<div  id="add" class="d-flex justify-content-end">
         				<img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/add-to-favorites-icon.svg" class="fav" alt="${desiredMovie.imdbID}" data-id="${desiredMovie.Title}"/>
   
         		  </div>

            </div>
    	
        </div>
      `;
	
	movieList.append(movieDisplay);
	
	return;
	}



//Fetch Movie using API
async function fetchMovies(){
	try{
		const response=await fetch('https://www.omdbapi.com/?&apikey=4fca6594&s=Series');
		const data = await response.json();
		allMovies=data.Search;
		console.log("movies:",allMovies)
		renderMovieList();
		return;
	}
	catch(error){
		console.log(error);
	}
	
}

//Will add movies to fav	
function addToFav(favMovieName){
	for(let i=0;i<localStorage.length;i++){

		//Getting movies from local storage
		let retrivedMovieTitle=localStorage.getItem(favMovieName);
	
		if(favMovieName==retrivedMovieTitle){
			showNotification("Already in Favourites");
			return;
	}
 }

 //Stroing movies to local storage
	localStorage.setItem(favMovieName,favMovieName);
	showNotification("Added to Favourites");
	return;
}

//Will remove movie from fav
function removFav(favMovieName){
	for(let i=0;i<localStorage.length;i++){
		let retrivedFavMovie=localStorage.getItem(localStorage.key(i))
		if(retrivedFavMovie==favMovieName){
			localStorage.removeItem(favMovieName);
			showNotification("Removed from Favourites");
			showFavPage();
			return;
		}
	}
	//Notify if movie is not present
	showNotification('Not present in list');
}

//Show fav movies page
function showingFav(desiredMovie){
	const movieDisplay=document.createElement("div");

	//Display fav movies
		movieDisplay.innerHTML=`
		<div id="display-movie">
        <img src="${desiredMovie.Poster}" class="movie-img" data-id="${desiredMovie.imdbID}"/>
        <label id="${desiredMovie.imdbID}" class="movie-name">${desiredMovie.Title}</label>
        <label id="${desiredMovie.imdbID}">Year:${desiredMovie.Year}</label>
        <label id="${desiredMovie.imdbID}">Type:${desiredMovie.Type}</label>
        
			<div id="remove" class="d-flex justify-content-end">        
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/remove-from-favorites-icon.svg" class="removeFromFav" data-id="${desiredMovie.Title}"/>

		  </div>
    </div>
    
	`;
	
	movieList.append(movieDisplay);
	
	return;
}


//Fetching all the fav movies from local storage.
async function showFavPage(){
	let FavKeys=Object.keys(localStorage);
	if(localStorage.length>0){
		movieList.innerHTML=" ";
		let getFavMovies=[ ];
		let mergeFavList=[ ];
		let movies=[];
		for(let title of FavKeys){
			//Fetching fav movies using titles
			const response=await fetch(`https://omdbapi.com/?t=${title}&apikey=4fca6594&page=1`);
			const data = await response.json();
			movies=[data];
			let desiredMovie=movies[0];
			let desiredMovies=desiredMovie.Title
			if(desiredMovies==title){

				//Calling showing fav to display fav page
				showingFav(desiredMovie);
			}
	 	}
	}
	else if(localStorage.length==0){
		showNotification("My Favourite list is empty");
		movieList.innerHTML=" ";}
	
}

//Displaying all the movies at Home Page.
function addMovieToDOM(desiredMovie){
	const movieDisplay=document.createElement("div");
	movieDisplay.innerHTML=`
	
		<div id="display-movie">
        <img src="${desiredMovie.Poster}" class="movie-img" data-id="${desiredMovie.imdbID}"/>
				<label id="${desiredMovie.imdbID}" class="movie-name">${desiredMovie.Title}</label>
        <label id="${desiredMovie.imdbID}">Year:${desiredMovie.Year}</label>  
        <label id="${desiredMovie.imdbID}">Type:${desiredMovie.Type}</label>
     <div class="d-flex justify-content-end">
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/add-to-favorites-icon.svg" class="fav" alt="${desiredMovie.imdbID}" data-id="${desiredMovie.Title}"/>
 		 </div>
    </div>
    
	`;
	
	movieList.append(movieDisplay);
	
}

//Fetching movies to display at Home Page.
function renderMovieList(){
	movieList.innerHTML=" ";
	for(let i=0;i<allMovies.length;i++){
		//Calling to display movie
		addMovieToDOM(allMovies[i]);
	}

}


//Handle all click events.
function handleClickEvents(event){
	// add to Fav
	const target=event.target;
	if(target.className=='fav'){
		const favMovieName=target.dataset.id;
		addToFav(favMovieName);
		return;
	}
	
	//remove from fav
	if(target.className=='removeFromFav'){
		const favMovieName=target.dataset.id;
		removFav(favMovieName);
		return;	
	}
	if(target.id=='fav-btn'){

		showFavPage();
		return;
	}
	
	//Call movie page by clicking movie name.
	if(target.className=='movie-name'){
		const movieClickedId=target.id;
	//	console.log(movieClickedId)
		showMoviePage(movieClickedId);
		return;
	}

	//Call movie page by clicking movie image.
	if(target.className=='movie-img'){	
		const movieClickedId=target.dataset.id;
	//	console.log(movieClickedId)
		showMoviePage(movieClickedId);
		return;
	}
	

}

//Handle input events.
 function handleInputPress(event){
 	console.log("value:",event.target.value) 	

 	//After enter will call searchMovieByName to search movie.
	if(event.key=="Enter"){
		let movieName=event.target.value;
		if(!movieName){
			showNotification('Cannot be empty')
			return;
	}
	event.target.value=" ";
	moviesAfterEnter=[]
	searchMoviesByName(movieName);
	return;
	}
	
	//Will call searchMoviesDuringTyping to search movie.
	else if(event.target.value!=""){
		let onTyping=searchMovie.value.trim();
		moviesWhileTyping=[];
		searchMoviesDuringTyping(onTyping);
		return;

	}
	 renderMovieList();

	
	}



let moviesWhileTyping=[];

//It will search movie while typing.
async function searchMoviesDuringTyping(onTyping){
	movieList.innerHTML=" ";
	let onTypingLower=onTyping.toLowerCase();

	//Fetching movie while typing
		const response=await fetch(`https://omdbapi.com/?s=${onTypingLower}&apikey=4fca6594&page=1`);
		const data = await response.json();
		moviesWhileTyping=data.Search;
		
	for(let movies=0;movies<moviesWhileTyping.length;movies++){
		let desiredMovie=moviesWhileTyping[movies];
		let titlesToLowerCase=desiredMovie.Title.toLowerCase()
		if(desiredMovie.Title.toLowerCase().includes(onTypingLower)){
			const movieDisplay=document.createElement("div");
			
			//Will display all the result while typing.
			movieDisplay.innerHTML=`
				<div id="display-movie">
        		<img src="${desiredMovie.Poster}" class="movie-img" data-id="${desiredMovie.imdbID}"/>
        			<label id="${desiredMovie.imdbID}" class="movie-name">${desiredMovie.Title}</label>
        			<label id="${desiredMovie.imdbID}">Year:${desiredMovie.Year}</label>
        			<label id="${desiredMovie.imdbID}">Type:${desiredMovie.Type}</label>
       <div class="d-flex justify-content-end">
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/add-to-favorites-icon.svg" class="fav" alt="${desiredMovie.imdbID}" data-id="${desiredMovie.Title}"/>
 			</div>
			
    </div>
    
	`;
	
	movieList.append(movieDisplay);
	
}
}

 }
let moviesAfterEnter=[]

//Search movie after enter is pressed.
async function searchMoviesByName(movieName){
	movieList.innerHTML=" ";
	let movieNameToLower=movieName.toLowerCase();
	try{

	//Fetch movie by movies title.
	const response=await fetch(`https://omdbapi.com/?s=${movieName}&apikey=4fca6594&page=1`);
		const data = await response.json();
		moviesAfterEnter=data.Search;
	}
	catch(error){
		console.log("error",error);
		showNotification("Movie not found");
	}
	for(let movies=0;movies<moviesAfterEnter.length;movies++){
		let desiredMovie=moviesAfterEnter[movies];
		let desiredMovieTitleLower=desiredMovie.Title.toLowerCase();
			if(movieNameToLower==desiredMovieTitleLower){
				const movieDisplay=document.createElement("div");

				//Display movies by movie name.
			  movieDisplay.innerHTML=`
				<div id="display-movie">
        		<img src="${desiredMovie.Poster}" class="movie-img" data-id="${desiredMovie.imdbID}"/>
     
        			<label id="${desiredMovie.imdbID}" class="movie-name">${desiredMovie.Title}</label>
        			<label id="${desiredMovie.imdbID}">Year:${desiredMovie.Year}</label>
        			<label id="${desiredMovie.imdbID}">Type:${desiredMovie.Type}</label>
        <div class="d-flex justify-content-end">
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/add-to-favorites-icon.svg" class="fav" alt="${desiredMovie.imdbID}" data-id="${desiredMovie.Title}"/>
 			</div>
			
    </div>
    
	`;
	
	movieList.append(movieDisplay);
			return;
		}
	}
	movieList.innerHTML=" ";
	
	}

//Its will call home btn to display home screen.
homeBtn.addEventListener('click' ,function(){

	fullMovies=[];
	fetchMovies();
	renderMovieList();
	return;
	
})


//It will start the app.
function initializeApp(){
	fetchMovies();
	document.addEventListener('click',handleClickEvents);
	searchMovie.addEventListener('keyup',handleInputPress);
	
}
initializeApp();

	

			
	


