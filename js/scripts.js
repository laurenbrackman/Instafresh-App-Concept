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
    xhr.responseType = "json"; // "text", "json", "document" for XML
    xhr.open("GET", "recipes.json");
    xhr.send();
    
    //Load
    xhr.addEventListener("load", function () {
        let recipeListings = xhr.response
        console.log(recipeListings)
    });

    let recipes = document.getElementsByClassName('col-sm');
    for (let recipe of recipes){
        let name = "classic-beef-chili";
        let parsedName = "Classic Beef Chili";
        let subcaption = "with beef and other fun ingredients"
        recipe.innerHTML = `<img src='img/${name}.jpg'></img><h3>${parsedName}</h3><p>${subcaption}</p>`;
        recipe.onclick= function(){
            recipe.innerHTML = "<div>Selected</div>";
        }
    };
});

