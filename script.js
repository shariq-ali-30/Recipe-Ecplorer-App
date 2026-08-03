let recipesContainer = document.querySelector(".recipes-container")

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
    recipesContainer.childNodes.forEach(recipe => {
        recipe.classList.remove("active")
    })
    event.currentTarget.classList.add("active")
}