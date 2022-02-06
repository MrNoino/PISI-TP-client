
//botão de pesquisa
var search_btn = document.getElementById("search-btn");

var title_input = document.getElementById("title-input");

var category_input = document.getElementById("category-input");

var release_year_input = document.getElementById("release-year-input");

var author_input = document.getElementById("author-input");

var display_error = document.getElementById("display-error");

var list = document.getElementById("list");

//no evento click do botão
search_btn.addEventListener("click", function(){

    display_error.innerHTML = "";

    list.innerHTML = "";

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

            loadBooks(books);

        }else if(http.status === 404){

            display_error.innerHTML = "Nenhum livro encontrado";

        }else{

            display_error.innerHTML = "Erro na requisição";

        }

    };

    http.send(params);


}, false);


function loadBooks(books){

    var buffer = "";

    for(var i = 0; i < books.length; i++){

        if((i % 2) == 0){

            buffer += `<li class="list-group-item row d-flex bg-light">`;

        }else{

            buffer += `<li class="list-group-item row d-flex">`;

        }

        buffer += ` <div class="col-12 d-flex justify-content-between mb-1 py-3">

                        <label><strong>Título: </strong>`+ books[i].title +`</label>
                        <label><strong>ISBN: </strong>`+ books[i].isbn +`</label>

                    </div>

                    <hr>

                    <div class="col-12 d-flex justify-content-between mb-1 py-3">

                        <label><strong>Ano de lançamento: </strong>`+ books[i].release_year +`</label>
                        <label><strong>Edição: </strong>`+ books[i].edition +`</label>

                    </div>

                    <hr>

                    <div class="col-12 justify-content-start mb-1 py-3">

                        <h5 class="text-left">Categorias</h5>

                    </div>`;

        for(var categories of books[i].categories){

            buffer += `<div class="col-12 col-md-4 col-lg-2 mb-1 py-3">

                            <label>`+ categories.category +`</label>

                        </div>`;

        }

        buffer += `<hr>

                    <div class="col-12 justify-content-start mb-1 py-3">

                        <h5 class="text-left">Autores</h5>

                    </div>`;

        for(var authors of books[i].authors){

            buffer += `<div class="col-12 col-md-4 col-lg-2 mb-1 py-3">

                            <label>`+ authors.name +`</label>

                        </div>`;

        }

        buffer += `</li>`;       

    }

    list.innerHTML = buffer;

}