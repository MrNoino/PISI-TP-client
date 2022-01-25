var authors_select = document.getElementById("authors-select");
var categories_select = document.getElementById("categories-select");

window.addEventListener('DOMContentLoaded', function(){

    var http_authors = new XMLHttpRequest();

    http_authors.open("GET", "http://localhost:8080/authors");

    http_authors.onload = function(){

        if(http_authors.status === 200){

            loadSelect(authors_select, JSON.parse(http_authors.response));

        }else{



        }

    };

    http_authors.send();

    var http_categories = new XMLHttpRequest();

    http_categories.open("GET", "http://localhost:8080/categories");

    http_categories.onload = function(){

        if(http_categories.status === 200){

            loadSelect(categories_select, JSON.parse(http_categories.response));

        }else{



        }

    };

    http_categories.send();

}, false);

function loadSelect(element, data){

    var HTML = "";

    for(var i = 0; i < data.length; i++){

        HTML += '<option value="' + data[i].id + '">' + data[i].name + '</option>'

    }

    element.innerHTML = HTML;

}