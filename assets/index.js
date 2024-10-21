async function render(view){
    let main = document.querySelector('main');
    main.innerHTML = await (await fetch(`views/${view}.html`)).text();

    switch(view){
        case 'konyv': {
            getBooks()
            break;
        }
        case 'szerzo': {
            getAuthors()
            break;
        }
        case 'kapcsolat': {
            getKapcsolat()
            break;
        }
    }
}

function bookAuthors() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/title_name',true);
    xhr.send();

    let bookAuthorsTable = document.querySelector('#bookAuthorsTable')
    
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4 && xhr.status==200) {
            var bookAuthors = JSON.parse(xhr.responseText)

            let tbody = document.createElement('tbody');

            bookAuthors.forEach(item =>{

                let tr = document.createElement('tr');
                let konyv = document.createElement('td');
                let szerzo = document.createElement('td');

                konyv.innerHTML = item.title
                szerzo.innerHTML = item.name

                tr.appendChild(konyv);
                tr.appendChild(szerzo);
                tbody.appendChild(tr);
            });
            bookAuthorsTable.appendChild(tbody);
        }
    }
}
bookAuthors();