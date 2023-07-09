/*Israel Godinez Bravo. Proyecto Final Modulo: JS Avanzado, DevF, 2023
*/

let url = 'https://opentdb.com/api.php?amount=10';
console.log(url);

let questionsArray = [];
const dropdownMenuOne = document.getElementById("btn-difficulty");
const dropdownMenuTwo = document.getElementById("btn-category");
const dropdownMenuThree = document.getElementById("btn-type");
const difficultyOptions = document.querySelectorAll('.difficulty');
const categoryOptions = document.querySelectorAll('.category');
const categoriesDropdownItem = document.querySelectorAll('.dropdown-menu')[1];
const typeOptions = document.querySelectorAll('.type');
const startButton = document.getElementById("btn-start");
const sections = document.getElementsByTagName("section");

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

difficultyOptions.forEach((item, index) => {
    difficultyOptions[index].addEventListener("click", function (event) {
        event.preventDefault();
        dropdownMenuOne.innerText = difficultyOptions[index].textContent;
        url += '&difficulty=' + ((difficultyOptions[index].textContent).toLocaleLowerCase());
        console.log(url);
    });
})

typeOptions.forEach((item, index) => {
    typeOptions[index].addEventListener("click", function (event) {
        event.preventDefault();
        dropdownMenuThree.innerText = typeOptions[index].textContent;
        url += '&type=' + ((typeOptions[index].textContent).toLocaleLowerCase());
        console.log(url);
    });
})

/*https://opentdb.com/api_category.php URL for getting all categories*/

async function logCategories() {
    const categories = fetch('https://opentdb.com/api_category.php')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud');
        })
        .then(data => {
            data.trivia_categories.forEach((item, index) => {
                let aCategory = document.createElement("a");
                aCategory.className = "dropdown-item";
                aCategory.className += " category";
                aCategory.href = "#";
                aCategory.textContent = (data.trivia_categories[index].name);
                categoriesDropdownItem.appendChild(aCategory);
                aCategory.addEventListener("click", function (event) {
                    event.preventDefault();

                    dropdownMenuTwo.innerText = data.trivia_categories[index].name;
                    url += '&category=' + data.trivia_categories[index].id;
                    console.log(url);
                });
            })
        })
        .catch(error => {
            console.log(error);
        })
}

logCategories();

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    sections[0].style.display = 'none';
    sections[1].style.display = 'block';
    const questions = fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud');
        })
        .then(data => {
            data.results.forEach((item, index) => {
                const question = document.createElement("div");
                question.className = 'question-div';
                data.results[index].incorrect_answers.push(data.results[index].correct_answer);
                data.results[index].incorrect_answers = shuffleArray(data.results[index].incorrect_answers);
                question.innerHTML = '<div class="card" style="width: 25rem;"><div class="card-body"><h5 class="card-title">' + (index + 1) + '.- ' + data.results[index].question;
                
                data.results[index].incorrect_answers.forEach((item,index2) =>{
                    const option = document.createElement("button");
                    option.className = 'btn-option';
                    option.textContent = data.results[index].incorrect_answers[index2];
                    question.appendChild(option);      
                    option.addEventListener("click",function(event){
                        console.log(option.textContent);
                    })              
                })
                sections[1].appendChild(question);
                
            })

            console.log(data.results);
        })
        .catch(error => {
            console.log(error);
        })

})



/*
const dropdownMenuTwo = document.getElementById("btn-category");
const dropdownMenuOne = document.getElementById("btn-difficulty");
const easyDifficulty = document.getElementById("easy-difficulty");
const mediumDifficulty = document.getElementById("medium-difficulty");
const hardDifficulty = document.getElementById("hard-difficulty");
const startButton = document.getElementById("btn-start");
const pageOne = document.getElementById("page-1");
const pageTwo = document.getElementById("page-2");
const options = document.querySelectorAll('.form-check-label');



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

async function1 run() {
    let x = await logJSONData();
    console.log(x.results[0]);

    x.results.forEach((item, index) => {
        document.querySelectorAll('.card-title')[index].textContent = x.results[index].question;
        (x.results[index].incorrect_answers).push(x.results[index].correct_answer);
        const allAnswers = shuffleArray(x.results[index].incorrect_answers);

        if (x.results[index].type == "multiple") {

            for (let answersi = 0; answersi < allAnswers.length; answersi++) {

                options[(4 * index) + answersi].textContent = allAnswers[answersi];
            } }
        else if (x.results[index].type == "boolean") {
                    options[4*index].textContent = 'True';
                    options[4*index+1].textContent = 'False';
                    options[4*index+2].parentElement.remove();
                    options[4*index+3].parentElement.remove();
                }
        

        //x.results[index].question.replace('&quot/g;', '')
        console.log(x.results[index].type);
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

*/