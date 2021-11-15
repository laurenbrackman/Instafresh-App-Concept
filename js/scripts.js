/*!
* Start Bootstrap - Scrolling Nav v5.0.3 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    //Fill in recipe information from JSON file
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json"; 
    let url = "json/recipes.json";

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let recipeJSON = this.response;
            let fileNames = [];
            for(fileName in recipeJSON['recipes']){
                fileNames.push(fileName);
            }
            let recipeArray = parseJSON(recipeJSON);
            populate(recipeArray, fileNames);
        }
    };

    xhr.open("GET", url, true);
    xhr.send();

});


function parseJSON(json){
    var result = [];
    var recipes = [];
    for(var i in json){
        result.push(json[i]);
    }
    for(var i in result[0]){
        recipes.push(result[0][i])
    }
    return recipes;
}

function populate(arr, names){
    let recipes = document.getElementsByClassName('col-sm');
    let counter = 0;
    for (let recipe of recipes){
        let arrayItem = arr[counter];
        let name = names[counter];
        let parsedName = arrayItem['parsedName'];
        let subcaption = arrayItem['subcaption'];
        let description = arrayItem['description'];
        recipe.innerHTML = `<img src='img/${name}.jpg'></img><h3>${parsedName}</h3><h5>${subcaption}</h5><p>${description}</p>`;
        let selected = false;
        recipe.addEventListener('click', function(){
            if(selected){
                selected = false;
                removeGroceries(arrayItem['ingredients']);
                recipe.innerHTML = `<img src='img/${name}.jpg'></img><h3>${parsedName}</h3><h5>${subcaption}</h5><p>${description}</p>`;
            }
            else{
                selected = true;
                addGroceries(arrayItem['ingredients']);
                recipe.innerHTML = `<img src='img/${name}-selected.png'></img><h3>${parsedName}</h3><h5>${subcaption}</h5><p>${description}</p>`;
            }
        })   
        counter += 1;
    };
}

//Generate Grocery List
let groceries = {"No ingredients": '0'};
let generateButton = document.getElementById('generate');
generateButton.addEventListener('click', () => {displayGroceries();});

function addGroceries(recipe){
    if(groceries["No ingredients"]){
        delete groceries["No ingredients"];
    }
    for(ingredient in recipe){
     //   let amounts =  Object.values(recipe[ingredient]);
        groceries[ingredient]=recipe[ingredient];
    }
}

function removeGroceries(recipe){
    for(ingredient in recipe){
    //    let amounts = Object.values(groceries[ingredient])
        delete groceries[ingredient];
    }
    if(Object.keys(groceries).length == 0){
        groceries['No ingredients'] = '0';
    }
}

function clearList(){
    groceryList.innerHTML = "";
}

function displayGroceries(){
    clearList();
    listTitle = document.getElementById('listTitle');
    listTitle.innerHTML = "Your Grocery List:"
    generateButton.innerHTML = "Regenerate Grocery List";
    groceryList = document.getElementById('groceryList');

    groceryListArray = Object.entries(groceries);
    for(ingredient in groceryListArray){
        iName = groceryListArray[ingredient][0];
        iAmount = Object.values(groceryListArray[ingredient][1]);
        groceryList.innerHTML += `<li>${iName} - ${iAmount[0]} ${iAmount[1]}</li>`;
    }
}