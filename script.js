const changeTheme = document.querySelector(".change-theme")
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'
const items = document.querySelector(".items")
let formTodo = document.querySelector(".form-todo")
let tempObject = {}
var editing = false;
var currentId = '';
const search = document.querySelector(".searchBar")

search.addEventListener('input', (e) => {
    // Declare variables 
    var search = e.target.value.toLowerCase();
    var table = document.getElementById("table_id");
    var tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            let tdata = td[j];
            if (tdata) {
                if (tdata.innerHTML.toLowerCase().indexOf(search) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
})


if (localStorage.getItem('todos') === null) {
    localStorage.setItem('todos', '[]')
} else {
    var alldata = JSON.parse(localStorage.getItem('todos'))
    for (var i = 0; i < alldata.length; i++) {
        var tr = document.createElement('tr')
        var td1 = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        var td4 = document.createElement('td')
        var td5 = document.createElement('td')
        td1.innerHTML = alldata[i].id
        td2.innerHTML = alldata[i].title
        td3.innerHTML = alldata[i].date
        td4.innerHTML = alldata[i].person
        td5.innerHTML = `<div class="actions">
        <button class="edit">Edit</button>
        <button class="deleteIt">Delete</button></div>`
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        items.appendChild(tr);
    }
}

document.querySelectorAll(".deleteIt").forEach(item => {
    item.addEventListener('click', (e) => {
        var id = e.target.parentElement.parentElement.parentElement.firstChild.innerHTML;
        var items = JSON.parse(localStorage.getItem("todos"));

        for (var i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                items.splice(i, 1);
            }
        }
        items = JSON.stringify(items);
        localStorage.setItem("todos", items);
        document.location.reload(true)
    })
})


document.querySelectorAll(".edit").forEach(item => {
    item.addEventListener('click', (e) => {
        var id = e.target.parentElement.parentElement.parentElement.firstChild.innerHTML;
        var items = JSON.parse(localStorage.getItem("todos"));

        for (var i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                currentId = items[i].id;
                var titlething = items[i].title;
                var datething = items[i].date;
                var person4 = items[i].person;

                document.querySelector('.todo-text').value = titlething;
                document.querySelector('.todo-date').value = datething;
                document.querySelector('.todo-people').value = person4;
                editing = true;
            }
        }
    })
})



formTodo.addEventListener('submit', (e) => {
    e.preventDefault();
    var items = JSON.parse(localStorage.getItem('todos'))

    if (editing == true) {
        tempObject.title = e.target[0].value;
        tempObject.date = e.target[1].value;
        tempObject.person = e.target[2].value;
        tempObject.id = currentId;
        for (var i = 0; i < items.length; i++) {
            if (currentId === items[i].id) {
                items.splice(i, 1, tempObject)
            }
        }
        items = JSON.stringify(items);
        localStorage.setItem("todos", items);
        editing = false;
        currentId = '';

    } else {
        tempObject.id = Math.random().toString(36).substr(2, 4);
        tempObject.title = e.target[0].value;
        tempObject.date = e.target[1].value;
        tempObject.person = e.target[2].value;
        items.push(tempObject)
        localStorage.setItem('todos', JSON.stringify(items));
    }
    document.location.reload(true)
})




// ###########  Theme colour

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// obtain current user choises
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => changeTheme.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    changeTheme.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

changeTheme.addEventListener("click", (e) => {
    document.body.classList.toggle(darkTheme);
    e.target.classList.toggle(iconTheme)
    // save current theme and icon that user has chosen to local storage
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())

})