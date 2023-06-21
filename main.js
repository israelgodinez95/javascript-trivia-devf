let url = 'https://opentdb.com/api.php?amount=10';
console.log(url);

const dropdownMenuTwo = document.getElementById("btn-category");
const dropdownMenuOne = document.getElementById("btn-difficulty");
const easyDifficulty = document.getElementById("easy-difficulty");
const mediumDifficulty = document.getElementById("medium-difficulty");
const hardDifficulty = document.getElementById("hard-difficulty");
const startButton = document.getElementById("btn-start");

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
        categoryElement.addEventListener("click", function (event){
            event.preventDefault();
            dropdownMenuTwo.innerText = (categories.trivia_categories[qtyCategories].name);
            url += '&category='+categories.trivia_categories[qtyCategories].id;
        })
    }
}


easyDifficulty.addEventListener ("click", function (event){
    event.preventDefault();
    dropdownMenuOne.innerText = "Easy";
    url += '&difficulty=easy';
});

mediumDifficulty.addEventListener ("click", function (event){
    event.preventDefault();
    dropdownMenuOne.innerText = "Medium";
    url += '&difficulty=medium';
});

hardDifficulty.addEventListener ("click", function (event){
    event.preventDefault();
    dropdownMenuOne.innerText = "Hard";
    url += '&difficulty=hard';
});

startButton.addEventListener ("click", function (event){
    event.preventDefault();
    console.log(url);
    run();
});

function render(){

}

async function logJSONData() {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
}

async function run() {
    let x = await logJSONData();
    console.log(x.results[0]);
    console.log(x.results[0].question);
    url = 'https://opentdb.com/api.php?amount=10';
}

logCategories();


