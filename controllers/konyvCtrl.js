var xhr = new XMLHttpRequest();
function getBooks() {
    xhr.open('GET', 'http://localhost:3000/books',true)
    xhr.send();

    const konyvTable = document.querySelector('#konyvTable')

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status==200) {

            var books = JSON.parse(xhr.responseText);
            books.forEach(item => {
                let tbody = document.createElement('tbody');
                let tr = document.createElement('tr');
                let id = document.createElement('th')
                let title = document.createElement('th');
                let release = document.createElement('th');
                let ISBN = document.createElement('th');
                let td = document.createElement('td');

                let deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'Törlés';
                deleteBtn.classList.add('btn','btn-danger', 'me-2');

                deleteBtn.addEventListener('click', ()=>{
                    torles(item.id);
                })

                let modifyBtn = document.createElement('button');
                modifyBtn.innerHTML='Módosítás';
                modifyBtn.classList.add('btn', 'btn-warning')
                modifyBtn.id = item.id;

                modifyBtn.addEventListener('click', function(){
                    modosit(this.id, item.title, item.release, item.ISBN)
                })

                id.innerHTML = item.id
                title.innerHTML = item.title;
                release.innerHTML = moment(item.release).format('YYYY-MM-DD');
                ISBN.innerHTML = item.ISBN;
                
                td.appendChild(deleteBtn);
                td.appendChild(modifyBtn)
                tr.appendChild(id);
                tr.appendChild(title);
                tr.appendChild(release);
                tr.appendChild(ISBN);
                tr.appendChild(td)
                tbody.appendChild(tr);
                konyvTable.appendChild(tbody)
            });
        }
    }
}

function uploadBook(){
    let book = JSON.stringify({
        title: document.querySelector('#title').value,
        release: document.querySelector('#release').value,
        ISBN: document.querySelector('#ISBN').value
    })

    xhr.open('POST', 'http://localhost:3000/books', true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(book);

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert("Sikeres adat rögzítés");
                title.value="";
                release.value="";
                ISBN.value="";
                render('konyv')
            }
            else{
                alert(xhr.responseText);
            }
        }
    }
}

function torles(id) {
    xhr.open('DELETE', `http://localhost:3000/books/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                render('konyv')
            }
            else{
                alert(xhr.responseText);
            }
        }
    }
}

function modosit(id, title, release, ISBN) {
    
    let konyvModify = document.querySelector('#konyvModify');
    let konyvUpload = document.querySelector('#konyvUpload');

    document.querySelector('#title').value = title;
    document.querySelector('#release').value = moment(release).format('YYYY-MM-DD');
    document.querySelector('#ISBN').value = ISBN;

    konyvModify.classList.remove('d-none')
    konyvUpload.classList.add('d-none')

    konyvModify.addEventListener('click',()=>{
        let bookMod = JSON.stringify({
            title: document.querySelector('#title').value,
            release: document.querySelector('#release').value,
            ISBN: document.querySelector('#ISBN').value
        })
        
        xhr.open('PUT', `http://localhost:3000/books/${id}`, true)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr.send(bookMod);
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    konyvModify.classList.add('d-none')
                    konyvUpload.classList.remove('d-none')
                    render('konyv')
                }
                else{
                    alert(xhr.responseText);
                }
            }
        }
    })
}