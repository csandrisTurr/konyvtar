var xhr = new XMLHttpRequest();

function getAuthors() {
    xhr.open('GET', 'http://localhost:3000/authors',true)
    xhr.send();

    const szerzoTable = document.querySelector('#szerzoTable')

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status==200) {

            var authors = JSON.parse(xhr.responseText);
            authors.forEach(item => {
                let tbody = document.createElement('tbody');
                let tr = document.createElement('tr');
                let id = document.createElement('th')
                let name = document.createElement('th');
                let birth = document.createElement('th');
                let td = document.createElement('td');

                let deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'Törlés';
                deleteBtn.classList.add('btn','btn-danger', 'me-2');

                deleteBtn.addEventListener('click', ()=>{
                    iroTorles(item.id);
                })

                let modifyBtn = document.createElement('button');
                modifyBtn.innerHTML='Módosítás';
                modifyBtn.classList.add('btn', 'btn-warning')
                //modifyBtn.id = item.id;

                modifyBtn.addEventListener('click', function(){
                    iroModositas(item.id, item.name, item.birth)
                })

                id.innerHTML = item.id
                name.innerHTML = item.name;
                birth.innerHTML = moment(item.birth).format('YYYY-MM-DD');

                td.appendChild(deleteBtn)
                td.appendChild(modifyBtn)
                tr.appendChild(id);
                tr.appendChild(name);
                tr.appendChild(birth);
                tr.appendChild(td)
                tbody.appendChild(tr);
                szerzoTable.appendChild(tbody)
            });
        }
    }
}
function uploadAuthor() {
    let author = JSON.stringify({
        name: document.querySelector('#name').value,
        birth: document.querySelector('#birth').value
    })

    xhr.open('POST', 'http://localhost:3000/authors', true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(author);

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert("Sikeres adat rögzítés");
                render('szerzo')
            }
            else{
                alert(xhr.responseText);
            }
        }
    }
}
function iroTorles(id) {
    xhr.open('DELETE', `http://localhost:3000/authors/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                render('szerzo')
            }
            else{
                alert(xhr.responseText);
            }
        }
    }
}
function iroModositas(id, name, birth) {
    alert(id)
    let szerzoModify = document.querySelector('#szerzoModify');
    let szerzoUpload = document.querySelector('#szerzoUpload');

    document.querySelector('#name').value = name;
    document.querySelector('#birth').value = moment(birth).format('YYYY-MM-DD');
    document.querySelector('h3').innerHTML = "Szerző módosítása"

    szerzoModify.classList.remove('d-none')
    szerzoUpload.classList.add('d-none')

    szerzoModify.addEventListener('click',()=>{
        let authorMod = JSON.stringify({
            name: document.querySelector('#name').value,
            birth: document.querySelector('#birth').value
        })
        
        xhr.open('PUT', `http://localhost:3000/authors/${id}`, true)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr.send(authorMod);
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    szerzoModify.classList.add('d-none')
                    szerzoUpload.classList.remove('d-none')
                    render('szerzo')
                }
                else{
                    alert(xhr.responseText);
                }
            }
        }
    })
}