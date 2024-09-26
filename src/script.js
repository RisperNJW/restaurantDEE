// function to display random recipes on website
function randomRecipe() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    fetch(url)
        .then(response => response.json())
        .then(data => displayFood(data.meals));

}
randomRecipe();
// Function to initialize random recipeson website
function initialize() {
    document.getElementById('search-btn').addEventListener('click', searchMeal);
    const displayFood = meals => {
        let mainDiv = document.getElementById('main-container');
        mainDiv.textContent = '';
        meals.forEach(meal => {
            let div = document.createElement('div');
            div.classList.add('card-detail');
            div.innerHTML = `
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img" alt="${meal.strMeal}">
                    <div class="content">
                        <h3 class="card-title">${meal.strMeal}</h3>
                        <p class="card-text">${meal.strInstructions.slice(0, 150)}...</p>
                        <button onclick="loadSingleItem(${meal.idMeal})" type="button" class="button">View Recipe</button>
                    </div>
                </div>
            `;
            mainDiv.appendChild(div);
        });
    };
    window.displayFood = displayFood;
}
window.onload = function () { initialize();
    for (let i = 0; i < 10; i++) {
        randomRecipe();
    } 
}
function initializeSearch() {
    document.getElementById('search-btn').addEventListener('click', searchMeal);
    const displayFood = meals => {
        let mainDiv = document.getElementById('main-container');
        mainDiv.textContent = '';
        meals.forEach(meal => {
            let div = document.createElement('div');
            div.classList.add('card-detail');
            div.innerHTML = `
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img" alt="${meal.strMeal}">
                    <div class="content">
                        <h3 class="card-title">${meal.strMeal}</h3>
                        <p class="card-text">${meal.strInstructions.slice(0, 150)}...</p>
                        <button onclick="loadSingleItem(${meal.idMeal})" type="button" class="button">View Recipe</button>
                    </div>
                </div>
            `;
            mainDiv.appendChild(div);
        });
    };
    window.displayFood = displayFood;
}

// function to search for recipes
function searchMeal() {
    let inputField = document.getElementById('search-box');
    let mealName = inputField.value.trim(); 
    let error = document.getElementById('input-error');
    if (mealName !== '') {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    displayFood(data.meals); 
                    error.innerText = '';
                } else {
                    error.innerText = 'No results found. Please try another food name.';
                }
            })
            .catch(err => {
                error.innerText = 'An error occurred while fetching data.';
                console.error(err);
            });
    } else {
        error.innerText = 'Please insert food name. e.g., fish pie, chicken, etc.';
    }
    inputField.value = ''; 
}

function readMore(categoryName, additionalInfo) {
    const modalBody = document.getElementById('categories');
    modalBody.innerHTML = `
        <h4>${categoryName}</h4>
        <p>${additionalInfo}</p>
    `;
}