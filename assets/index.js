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
    }
}

function bookAuthors() {
    
}