let recipesContainer = document.querySelector(".recipes-container")
let searchInput = document.querySelector(".search-input")
let sidebarEmptyState = document.querySelector(".side-bar .empty-state")
let detailedRecipeEmptyState = document.querySelector(".detailed-recipe .empty-state")
let detailedRecipeContainer = document.querySelector(".detailed-recipe-container")

async function getRecipes() {
    let response = await fetch("https://dummyjson.com/recipes")
    let data = await response.json()
    return data.recipes
}
getRecipes()

let allRecipes = await getRecipes()

function showRecipes(recipesArr) {
    recipesContainer.innerHTML = ""
    recipesArr.forEach(recipe => {
        let recipeItem = document.createElement("div")
        recipeItem.classList.add("recipe-item")
        recipeItem.addEventListener("click", () => {showRecipeDetails(event, recipe.id)})
        recipeItem.innerHTML = `<div class="recipe-id">${recipe.id}</div>
                        <div class="recipe-details">
                            <div class="recipe-image">
                                <img
                                    src="${recipe.image}">
                            </div>
                            <div>
                                <h3 class="recipe-name">${recipe.name}</h3>
                                <p class="cuisine">${recipe.cuisine}</p>
                                <div class="rating-and-time">
                                    <div class="rating">
                                        <i class="ph-bold ph-star"></i>
                                        <span>${recipe.rating}</span>
                                    </div>
                                    <div class="dot"></div>
                                    <div class="time">
                                        <i class="ph-bold ph-clock"></i>
                                        <span>${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
        recipesContainer.appendChild(recipeItem)
    })
}
showRecipes(allRecipes)

function showRecipeDetails(event, recipeId) {
    detailedRecipeEmptyState.style.display = "none"

    let currentRecipe = allRecipes.find(recipe => recipe.id == recipeId)
    let ingredients = currentRecipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")
    let instructions = currentRecipe.instructions.map((instruction, i) => `<div class="instruction-item">
                                <span class="number">${i + 1}</span>
                                <p>${instruction}</p>
                            </div>`).join("")

    recipesContainer.childNodes.forEach(recipe => {
        recipe.classList.remove("active")
    })
    event.currentTarget.classList.add("active")

    detailedRecipeContainer.innerHTML = `<p class="recipe-number">Recipe #${currentRecipe.id}</p>

                    <div class="top-content">

                        <div class="left">
                            <h2 class="recipe-name">${currentRecipe.name}</h2>
                            <div class="meta-info">
                                <div class="rating"><i class="ph-bold ph-star"></i> <span>${currentRecipe.rating}</span></div>
                                <div class="cuisine"><i class="ph-bold ph-globe-hemisphere-west"></i>
                                    <span>${currentRecipe.cuisine}</span></div>
                                <div class="rating"><i class="ph-bold ph-chart-bar"></i> <span
                                        id="difficulty">${currentRecipe.difficulty}</span>
                                </div>
                                <div class="rating"><i class="ph-bold ph-clock"></i> <span id="totalTime">${currentRecipe.prepTimeMinutes + currentRecipe.cookTimeMinutes} mins</span>
                                </div>
                                <div class="rating"><i class="ph-bold ph-users"></i> <span id="totalTime">${currentRecipe.servings}
                                        Servings</span>
                                </div>
                            </div>
                        </div>

                        <div class="image">
                            <img
                                src="${currentRecipe.image}">
                        </div>
                    </div>

                    <div class="cards">

                        <div class="card preparation-time">
                            <div class="icon">
                                <i class="ph-bold ph-timer"></i>
                            </div>
                            <div class="details">
                                <p>Prep Time</p>
                                <span>${currentRecipe.prepTimeMinutes} mins</span>
                            </div>
                        </div>

                        <div class="card cook-time">
                            <div class="icon">
                                <i class="ph-bold ph-cooking-pot"></i>
                            </div>
                            <div class="details">
                                <p>Cook Time</p>
                                <span>${currentRecipe.cookTimeMinutes} mins</span>
                            </div>
                        </div>

                        <div class="card calories">
                            <div class="icon">
                                <i class="ph-bold ph-fire-simple"></i>
                            </div>
                            <div class="details">
                                <p>Calories</p>
                                <span>${currentRecipe.caloriesPerServing} cal</span>
                            </div>
                        </div>

                        <div class="card meal-type">
                            <div class="icon">
                                <i class="ph-bold ph-fork-knife"></i>
                            </div>
                            <div class="details">
                                <p>Meal Type</p>
                                <span>${currentRecipe.mealType}</span>
                            </div>
                        </div>

                        <div class="card tags">
                            <div class="icon">
                                <i class="ph-bold ph-tag"></i>
                            </div>
                            <div class="details">
                                <p>Tags</p>
                                <span>${currentRecipe.tags[0]}</span>
                            </div>
                        </div>

                    </div>

                    <div class="divider-x"></div>

                    <div class="ingredients-and-instructions">

                        <div class="ingredients">
                            <div class="title">
                                <div class="icon">
                                    <i class="ph-bold ph-list-dashes"></i>
                                </div>
                                Ingredients
                            </div>

                            <ul>
                                ${ingredients}
                            </ul>
                        </div>

                        <div class="instructions">
                            <div class="title">
                                <div class="icon">
                                    <i class="ph-bold ph-notebook"></i>
                                </div>
                                Instructions
                            </div>

                            ${instructions}

                        </div>

                    </div>`
}

function searchRecipes() {

    if (!searchInput.value.length) {
        showRecipes(allRecipes)
    }

    if (!recipesContainer.children.length > 0) {
        sidebarEmptyState.style.display = "flex"
    } else {
        sidebarEmptyState.style.display = "none"
    }

    let filterdRecipes = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchInput.value.toLowerCase().trim()) || recipe.cuisine.toLowerCase().includes(searchInput.value.toLowerCase().trim()))
    showRecipes(filterdRecipes)
}

// Event Listners

searchInput.addEventListener("input", searchRecipes)