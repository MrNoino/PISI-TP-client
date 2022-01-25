
//botão de pesquisa
var search_btn = document.getElementById("search-btn");

var title_input = document.getElementById("title-input");

var category_input = document.getElementById("category-input");

var release_year_input = document.getElementById("release-year-input");

var author_input = document.getElementById("author-input");

var display_error = document.getElementById("display-error");

//no evento click do botão
search_btn.addEventListener("click", function(){

    display_error.innerHTML = "";

    var params = (title_input.value ? "title=" + title_input.value + " " : "") 
                + (category_input.value ? "category=" + category_input.value + " " : "")
                + (release_year_input.value ? "release_year=" + release_year_input.value + " " : "")
                + (author_input.value ? "author=" + author_input.value + " " : "");

    params = params.substring(0, params.length - 1);

    params = params.replaceAll(" ", "&");

    params = (params) ? "?" + params : "";

    var http = new XMLHttpRequest();

    http.open("GET", "http://localhost:8080/books"+params);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onload = function(){

        if(http.status === 200){

            var books = JSON.parse(http.response);

            console.log(books);

        }else{

            display_error.innerHTML = "Erro na requisição";

        }

    };

    http.send(params);


}, false);