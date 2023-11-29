fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(response => response.json())
  .then(parsedDataRandom => {
    console.log(parsedDataRandom);
    displayRandomData(parsedDataRandom.meals);
  });

function displayRandomData(meals) {

        const randomMeal = meals[Math.floor(Math.random() * meals.length)];
    
        const image = document.getElementById('get-meal');
        image.src = randomMeal.strMealThumb;
    
        const title = document.createElement('h2');
        title.textContent = randomMeal.strMeal;
    
        // const paragraph = document.createElement('p');
        // paragraph.textContent = randomMeal.strInstructions;
    
    const randomImgs = document.querySelector('#get-meal');
    randomImgs.appendChild(image);
    randomImgs.appendChild(title);
    // randomImgs.appendChild(paragraph);
}

fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
.then(response => response.json())
.then((parsedDataSearch) => {
  console.log(parsedDataSearch)

})



const searchInput = document.querySelector('#search');
let input = ' ';

searchInput.addEventListener('input', (e)=>{
    input = e.target.value;
  
})

const gridContainer = document.querySelector('#meal-category');
let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`;
searchInput.addEventListener('keydown', (e)=>{

if(e.key === 'Enter'){
    input = e.target.value;
     apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`;
     getdata();
}
} )
const category = searchInput.value;


 function getdata()  {
fetch(apiUrl)
.then(response => response.json())
.then(parsedData => {
const meals = parsedData.meals;
gridContainer.innerHTML = '';


meals.forEach(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('grid');
  
    const image = document.createElement('img');
    image.src = meal.strMealThumb;
    mealDiv.appendChild(image);
    
  
    const title = document.createElement('h2');
    title.textContent = meal.strMeal;
    mealDiv.appendChild(title);
    title.style.fontSize = '30px';
    title.style.textAlign = 'justify';
    title.style.color = 'white';
    
  
    gridContainer.appendChild(mealDiv);
  

  });

});
 }






function displayRandomData(meals) {
  const randomMeal = meals[Math.floor(Math.random() * meals.length)];

  const image = document.createElement('img');
  image.src = randomMeal.strMealThumb;

  const title = document.createElement('h1');
  title.textContent = randomMeal.strMeal;

  const randomImgs = document.querySelector('.randomImgs');


  randomImgs.addEventListener('click', function() {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`)
      .then(response => response.json())
      .then(data => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          if (data.meals[0][`strIngredient${i}`]) {
            const ingredient = data.meals[0][`strIngredient${i}`];
            const measure = data.meals[0][`strMeasure${i}`];
            ingredients.push(`${ingredient} - ${measure}`);
          }
        }

 
        const modal = document.createElement('span');
        modal.classList.add('modal');
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Ingredients</h2>
            <ul>
              ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
          </div>
        `;
        document.body.appendChild(modal);


        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', function() {
          modal.remove();
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  randomImgs.appendChild(image);
  randomImgs.appendChild(title);
}