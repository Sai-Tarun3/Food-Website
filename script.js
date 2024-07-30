const logoimage = document.querySelector('.logo'); //for logo
const inputBoxText = document.querySelector('#input-box'); //for input text
const searchButton = document.getElementById('search-button'); //for search button
const mainContent = document.getElementById('fooditem'); // for searched food item
const errorMessage = document.getElementById('error-message'); //for error message

// Event Listener For button Click
searchButton.addEventListener('click', function () {
    const inputText = document.getElementById('input-box').value;
    mainContent.innerHTML = '';

    if (inputText === '') {
        errorMessage.style.display = 'block';
    } else {
        foodList(inputText);
        errorMessage.style.display = 'none';
    }
});

// Event Listener For Enter key
inputBoxText.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        const inputText = document.getElementById('input-box').value;
        mainContent.innerHTML = '';

        if (inputText === '') {
            errorMessage.style.display = 'block';
        } else {
            foodList(inputText);
            errorMessage.style.display = 'none';
        }
    }
});

// Items display function
function foodList(mealName) {
    const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

    fetch(mainApi)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        });

    const displayFoods = fooditem => {
        const foodsDiv = document.getElementById('fooditem');
        if (fooditem != null) {
            fooditem.forEach(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-sm-6 col-md-4 col-lg-3';
                const foodInfo = `
                    <div onclick="displayDetails('${food.idMeal}')" class="text-center h-80 single-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 pt-3">${food.strMeal}</h4>
                    </div>
                `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            errorMessage.style.display = 'block';
        }
    };
}

// Single item information
const displayDetails = foodName => {
    const foodDetailAPI = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodName}`;
    fetch(foodDetailAPI)
        .then(res => res.json())
        .then(data => {
            singleItemInfo(data.meals[0]);
        });
};

const singleItemInfo = food => {
    const foodDetailsDiv = document.getElementById('foodsDetails');
    foodDetailsDiv.innerHTML = `
        <h3 class="single-item-name">Item name: ${food.strMeal}</h3>
        <img class="img-fluid shadow rounded mb-4" src="${food.strMealThumb}" alt="">
        <p class="text-danger"><i class="fas fa-cookie food-icons text-danger"></i>Food Category: ${food.strCategory}</p>
        <h5 class="py-2"><i class="fas fa-utensils food-icons"></i>Cooking ingredients:</h5>
        <ul class="ingredient-list">
            ${[...Array(20).keys()].map(i => {
                if (food[`strIngredient${i + 1}`]) {
                    return `<li class="ingredient-list-item"><i class="far fa-hand-point-right food-icons"></i> ${food[`strIngredient${i + 1}`]} - ${food[`strMeasure${i + 1}`]}</li>`;
                } else {
                    return '';
                }
            }).join('')}
        </ul>
        <h5 class="py-2"><i class="fas fa-fire food-icons"></i>How to cook:</h5>
        <ul>
            <li class="ingredient-list-item list-unstyled">${food.strInstructions}</li>
        </ul>
    `;
};

// Reload upon clicking logo
logoimage.addEventListener('click', function () {
    location.reload();
});
