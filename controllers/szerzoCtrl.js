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

                id.innerHTML = item.id
                name.innerHTML = item.name;
                birth.innerHTML = moment(item.birth).format('YYYY-MM-DD');

                tr.appendChild(id);
                tr.appendChild(name);
                tr.appendChild(birth);
                tbody.appendChild(tr);
                szerzoTable.appendChild(tbody)
            });
        }
    }
}