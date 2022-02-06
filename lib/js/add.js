var authors_select = document.getElementById("authors-select");
var categories_select = document.getElementById("categories-select");

var isbn_input = document.getElementById("isbn-input");

var title_input = document.getElementById("title-input");

var edition_input = document.getElementById("edition-input");

var category_input = document.getElementById("category-input");

var release_year_input = document.getElementById("release-year-input");

var author_input = document.getElementById("author-input");

var display_info = document.getElementById("display-info");

var add_btn = document.getElementById("add-btn");

window.addEventListener('DOMContentLoaded', function(){

    var http_authors = new XMLHttpRequest();

    http_authors.open("GET", "http://localhost:8080/authors");

    http_authors.onload = function(){

        if(http_authors.status === 200){

            loadSelect(authors_select, JSON.parse(http_authors.response));

        }

    };

    http_authors.send();

    var http_categories = new XMLHttpRequest();

    http_categories.open("GET", "http://localhost:8080/categories");

    http_categories.onload = function(){

        if(http_categories.status === 200){

            loadSelect(categories_select, JSON.parse(http_categories.response));

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

add_btn.addEventListener("click", function() {

    var params = "isbn=" + isbn_input.value + "&title=" + title_input.value + "&edition=" + edition_input.value + "&release_year=" + release_year_input.value;

    for(var option of authors_select.options){

        if(option.selected){

            params += "&authors[]=" + option.value;

        }

    }

    for(var option of categories_select.options){

        if(option.selected){

            params += "&categories[]=" + option.value;

        }

    }

    console.log(params);

    var http = new XMLHttpRequest();

    http.open("POST", "http://localhost:8080/books");

    http.onload = function(){

        if(http.status === 200){

            display_info.innerHTML = "Livro adicionado";

            display_info.className = "text-center text-success";

        }else{

            display_info.innerHTML = "Livro não adicionado";

            display_info.className = "text-center text-danger";

        }

        console.log(http.response);

    };

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send(params);

}, false);