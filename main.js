let url = 'https://opentdb.com/api.php?amount=10';
console.log(url);

const dropdownMenuTwo = document.getElementById("btn-category");
const dropdownMenuOne = document.getElementById("btn-difficulty");
const easyDifficulty = document.getElementById("easy-difficulty");
const mediumDifficulty = document.getElementById("medium-difficulty");
const hardDifficulty = document.getElementById("hard-difficulty");
const startButton = document.getElementById("btn-start");
const pageOne = document.getElementById("page-1");
const pageTwo = document.getElementById("page-2");
const options=document.querySelectorAll('.form-check-label');


async function logCategories() {

    const response = await fetch('https://opentdb.com/api_category.php');
    const categories = await response.json();
    const categoriesDropdownItem = document.querySelectorAll('.dropdown-menu')[1];

    for (let qtyCategories = 0; qtyCategories < ((categories.trivia_categories).length); qtyCategories++) {

        let newElement = document.createElement("a");
        newElement.id = qtyCategories + 9;
        newElement.className = "dropdown-item";
        newElement.href = "#";
        newElement.textContent = (categories.trivia_categories[qtyCategories].name);
        categoriesDropdownItem.appendChild(newElement);
        const categoryElement = document.getElementById(qtyCategories + 9);
        categoryElement.addEventListener("click", function (event) {
            event.preventDefault();
            dropdownMenuTwo.innerText = (categories.trivia_categories[qtyCategories].name);
            url += '&category=' + categories.trivia_categories[qtyCategories].id;
        })
    }
}


easyDifficulty.addEventListener("click", function (event) {
    event.preventDefault();
    dropdownMenuOne.innerText = "Easy";
    url += '&difficulty=easy';
});

mediumDifficulty.addEventListener("click", function (event) {
    event.preventDefault();
    dropdownMenuOne.innerText = "Medium";
    url += '&difficulty=medium';
});

hardDifficulty.addEventListener("click", function (event) {
    event.preventDefault();
    dropdownMenuOne.innerText = "Hard";
    url += '&difficulty=hard';
});

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(url);
    run();
});

function render() {
    console.log("render");
    dropdownMenuOne.innerText = "Any Difficulty";
    dropdownMenuTwo.innerText = "Any Category";
    url = 'https://opentdb.com/api.php?amount=10';
    pageOne.style.display = 'none';
    pageTwo.style.display = 'block';
}

async function logJSONData() {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
}

async function run() {
    let x = await logJSONData();
    console.log(x.results[0]);

    x.results.forEach((item, index) => {
        document.querySelectorAll('.card-title')[index].textContent = x.results[index].question;
        (x.results[index].incorrect_answers).push(x.results[index].correct_answer);
        const allAnswers= shuffleArray(x.results[index].incorrect_answers);

        for(let answersi=0; answersi<allAnswers.length; answersi++){
            options[(4*index)+answersi].textContent=allAnswers[answersi];
      
        }
        
        console.log(x.results[index].question);
        console.log(x.results[index].correct_answer);
        console.log(x.results[index].incorrect_answers);
        console.log(allAnswers);
    });
    
    render();
}

function shuffleArray(array) {
    // Función de comparación aleatoria
    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }
  
    // Copia del arreglo original
    const shuffledArray = array.slice();
  
    // Revolver los índices utilizando sort() y la función de comparación aleatoria
    shuffledArray.sort(compareRandom);
  
    return shuffledArray;
  }

logCategories();

