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

                id.innerHTML = item.id
                title.innerHTML = item.title;
                release.innerHTML = moment(item.release).format('YYYY-MM-DD');
                ISBN.innerHTML = item.ISBN;

                tr.appendChild(id);
                tr.appendChild(title);
                tr.appendChild(release);
                tr.appendChild(ISBN);
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
                location.reload();
            }
            else{
                alert(xhr.responseText);
            }
        }
    }
}