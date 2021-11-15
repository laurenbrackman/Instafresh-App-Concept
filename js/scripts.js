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
        arrayItem = arr[counter];
        let name = names[counter];
        let parsedName = arrayItem['parsedName'];
        let subcaption = arrayItem['subcaption'];
        recipe.innerHTML = `<img src='img/${name}.jpg'></img><h3>${parsedName}</h3><p>${subcaption}</p>`;
        let selected = false;
        recipe.onclick= function(){
            if(selected){
                selected = false;
                recipe.innerHTML = `<img src='img/${name}.jpg'></img><h3>${parsedName}</h3><p>${subcaption}</p>`;
            }
            else{
                selected = true;
                recipe.innerHTML = `<img src='img/${name}-selected.png'></img><h3>${parsedName}</h3><p>${subcaption}</p>`;
            }
        }   
        counter += 1;
    };
}
