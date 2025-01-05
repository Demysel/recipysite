document.getElementById('search-button').addEventListener('click', () => {
    const craving = document.getElementById('craving').value.toLowerCase();
    const ingredients = document.getElementById('ingredients').value.toLowerCase().split(',').map(i => i.trim());
    const time = parseInt(document.getElementById('time').value, 10);

    const recipes = [
        {
            title: "Crêpes sucrées",
            ingredients: ["farine", "œufs", "lait", "sucre"],
            time: 20,
            details: "Mélangez tous les ingrédients, faites chauffer une poêle et préparez vos crêpes."
        },
        {
            title: "Omelette simple",
            ingredients: ["œufs", "lait", "sel"],
            time: 10,
            details: "Battez les œufs avec un peu de lait et faites cuire à feu moyen."
        }
    ];

    const results = recipes.filter(recipe => {
        const hasIngredients = ingredients.every(ing => recipe.ingredients.includes(ing));
        const matchesCraving = recipe.title.toLowerCase().includes(craving);
        const withinTime = recipe.time <= time;

        return hasIngredients && matchesCraving && withinTime;
    });

    displayResults(results);
});

function displayResults(recipes) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = '';

    if (recipes.length === 0) {
        resultsSection.innerHTML = '<li>Aucune recette trouvée.</li>';
        return;
    }

    recipes.forEach(recipe => {
        const listItem = document.createElement('li');
        listItem.textContent = recipe.title;
        listItem.addEventListener('click', () => displayRecipeDetails(recipe));
        resultsSection.appendChild(listItem);
    });
}

function displayRecipeDetails(recipe) {
    const detailsSection = document.getElementById('details');
    detailsSection.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>${recipe.details}</p>
        <p><strong>Temps :</strong> ${recipe.time} minutes</p>
        <p><strong>Ingrédients :</strong> ${recipe.ingredients.join(', ')}</p>
    `;
}
