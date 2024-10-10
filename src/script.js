// Function to get for recipes

function getRecipes(query) {
    let apiKey = 'febb270baamshea61e9318c28fd4p188726jsnc465ea781dd3';
    let apiHost = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
    axios.get(`https://${apiHost}/recipes/complexSearch`, {
        params: {
            query: query,
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    })
        .then((response) => {
            let recipes = response.data.results;
            displayRecipes(recipes);
        })
        .catch((error) => {
            console.log(error);
        });
}
document.getElementById('search-form').addEventListener('submit', function(event) {  
    event.preventDefault(); // Prevent the form from submitting normally  

    let query = document.getElementById('search-box').value; // Get the value from the search box  
    getRecipes(query); // Call the function to fetch recipes  
}); 

// Function to display recipes search
function displayRecipes(recipes) {
    let recipeContainer = document.getElementById('main-container'); // Assuming you want to display in this section  
    recipeContainer.innerHTML = ""; // Clear previous results  

    if (recipes.length === 0) {
        recipeContainer.innerHTML = "<p>No recipes found.</p>"; // Message if no recipes found  
        return;
    }

    // Iterate and display each recipe  
    recipes.forEach(recipe => {
        let recipeDiv = document.createElement('div'); // Create a new div for each recipe  
        recipeDiv.className = 'card-detail'; // Class for styling  

        // Customize how each recipe is displayed  
        recipeDiv.innerHTML = `  
            <img src="${recipe.image}" alt="${recipe.title}" class="card-img"> <!-- Display image -->  
            <div class="content">  
                <h3>${recipe.title}</h3>  
                <p>Ready in: ${recipe.readyInMinutes} minutes</p>  
                <button type="button" onclick="loadSingleItem(${recipe.id})" class="button">View Recipe</button>  
            </div>  
        `;

        recipeContainer.appendChild(recipeDiv); // Append the recipe div to the container  
    });

    // Optional: Scroll to the top of the recipes section after displaying recipes  
    window.scrollTo(0, document.getElementById('recipe-container').offsetTop);
}  

    // let apiKey = 'febb270baamshea61e9318c28fd4p188726jsnc465ea781dd3';
    // let apiHost = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
