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
                release.innerHTML = item.release;
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