var kapcsolatokxhr = new XMLHttpRequest();
var szerzokxhr = new XMLHttpRequest();
var konyvekxhr = new XMLHttpRequest();
function getKapcsolat() {
    kapcsolatokxhr.open('GET', 'http://localhost:3000/book_authors', true)
    szerzokxhr.open('GET', 'http://localhost:3000/authors', true)
    konyvekxhr.open('GET', 'http://localhost:3000/books', true)

    kapcsolatokxhr.send();
    szerzokxhr.send();
    konyvekxhr.send();

    const kapcsolatTable = document.querySelector('#kapcsolatTable')
    const szerzokSelect = document.querySelector('#szerzok')
    const konyvekSelect = document.querySelector('#konyvek')

    szerzokxhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status==200) { 
            var json = JSON.parse(this.responseText);

            json.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.name;
                szerzokSelect.appendChild(option);
            });
        }
    }

    konyvekxhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status==200) { 
            var json = JSON.parse(this.responseText);

            json.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.title;
                konyvekSelect.appendChild(option);
            });
        }
    }

    let id = 1;
    kapcsolatokxhr.onreadystatechange = function() {

        if (this.readyState == 4 && this.status==200) {
            const tbody = document.createElement('tbody');
            var json = JSON.parse(this.responseText);

            json = json.map(x => {
                x.id = id;
                id++;
                return x;
            })

            json.forEach(item => {
                let tr = document.createElement('tr');
                let authorId = document.createElement('td')
                let bookId = document.createElement('td');
                let td = document.createElement('td');

                let deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'Törlés';
                deleteBtn.classList.add('btn','btn-danger', 'me-2');

                deleteBtn.addEventListener('click', ()=>{
                    kapcsolatTorles(item.bookId, item.authorId);
                })

                authorId.innerHTML = item.authorId;
                bookId.innerHTML = item.bookId;

                td.appendChild(deleteBtn)
                tr.appendChild(authorId);
                tr.appendChild(bookId);
                tr.appendChild(td)
                tbody.appendChild(tr);
            });
            kapcsolatTable.appendChild(tbody);
        }
    }
}

function kapcsolatTorles(bookId, authorId) {
    xhr.open('DELETE', `http://localhost:3000/books/${bookId}/authors/${authorId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                render('kapcsolat')
            }
            else{
                alert(xhr.responseText);
            }
        }
    }
}

function uploadKapcsolat(){
    let kapcsolat = {
        authorId: document.querySelector('#szerzok').value,
        bookId: document.querySelector('#konyvek').value,
    };

    xhr.open('POST', `http://localhost:3000/books/${kapcsolat.bookId}/authors/${kapcsolat.authorId}`, true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(JSON.stringify(kapcsolat));

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert("Sikeres adat rögzítés");
                render('kapcsolat')
            }
            else{
                alert(xhr.responseText);
            }
        }
    }
}