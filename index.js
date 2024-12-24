let movieCollection = [];

class Movie {
    constructor(title, genre, rating, year) {
        this.title = title;
        this.genre = genre;
        this.rating = rating;
        this.year = year;
    }
}

const addMovie = () => {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = Number(document.getElementById('rating').value);
    const year = Number(document.getElementById('year').value);

    if (!title || !genre || !rating || !year) {
        alert('Please fill in all fields');
        return;
    }

    const movie = new Movie(title, genre, rating, year);
    movieCollection.push(movie);
    displayMovies();
    clearForm();
};

const clearForm = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
};

const displayMovies = () => {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    movieCollection.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <p>Genre: ${movie.genre}</p>
            <p class="rating">Rating: ${movie.rating}/10</p>
            <p>Year: ${movie.year}</p>
        `;
        movieList.appendChild(movieCard);
    });
};

const filterMovies = () => {
    const genre = document.getElementById('genreFilter').value.toLowerCase();
    const year = Number(document.getElementById('yearFilter').value);
    const results = document.getElementById('results');
    
    let filtered = movieCollection;
    
    if (genre) {
        filtered = filtered.filter(movie => 
            movie.genre.toLowerCase().includes(genre)
        );
    }
    
    if (year) {
        filtered = filtered.filter(movie => movie.year >= year);
    }

    results.innerHTML = `
        <h3>Filter Results</h3>
        <p>Found ${filtered.length} movies</p>
        ${filtered.map(movie => 
            `<div class="movie-card">
                <h3>${movie.title}</h3>
                <p>Genre: ${movie.genre}</p>
                <p class="rating">Rating: ${movie.rating}/10</p>
                <p>Year: ${movie.year}</p>
            </div>`
        ).join('')}
    `;
};

const findHighestRated = () => {
    if (movieCollection.length === 0) {
        alert('No movies in collection');
        return;
    }

    const highestRated = movieCollection.reduce((prev, current) => 
        prev.rating > current.rating ? prev : current
    );

    const results = document.getElementById('results');
    results.innerHTML = `
        <h3>Highest Rated Movie</h3>
        <div class="movie-card">
            <h3>${highestRated.title}</h3>
            <p>Genre: ${highestRated.genre}</p>
            <p class="rating">Rating: ${highestRated.rating}/10</p>
            <p>Year: ${highestRated.year}</p>
        </div>
    `;
};

const showAllTitles = () => {
    const titles = movieCollection.map(movie => movie.title);
    const results = document.getElementById('results');
    results.innerHTML = `
        <h3>All Movie Titles</h3>
        <ul>
            ${titles.map(title => `<li>${title}</li>`).join('')}
        </ul>
    `;
};
