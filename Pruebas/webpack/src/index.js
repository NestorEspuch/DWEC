// Web services http://arturober.com:5006/tareas
// GET all the todos and show them in the list
// When sending the form, generate a POST call and insert a new task
// OPTIONAL: Include a button to delete the task

function borrarTareaHTML() {
    
}

function borrarTarea(tarea) {
    fetch(`http://arturober.com:5006/tareas/${tarea.id}`, {
        method: "DELETE",
    }).then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        borrarTareaHTML();
    });
}
function insertarTarea(tarea) {
    let listaTareas = document.getElementById("todolist");
    let button = document.createElement("button");
    button.append("Borrar");
    button.addEventListener("click", () => borrarTarea(tarea));
    let li = document.createElement("li");
    li.append(tarea.descripcion + " ");
    li.appendChild(button);
    listaTareas.appendChild(li);
}

function getTareas() {
    fetch("http://arturober.com:5006/tareas")
        .then((resp) => {
            if (!resp.ok) throw new Error(resp.text);
            return resp.json();
        })
        .then((respJSON) => {
            respJSON.tareas.forEach((t) => insertarTarea(t));
        })
        .catch((error) => console.error(error));
}

function addTarea() {
    let desc = form.desc.value;
    let tarea = { descripcion: desc };

    fetch("http://arturober.com:5006/tareas", {
        method: "POST",
        body: JSON.stringify(tarea),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resp) => {
            if (!resp.ok) throw new Error(resp.text);
            return resp.json();
        })
        .then((respJSON) => {
            insertarTarea(respJSON.tarea);
        })
        .catch((error) => console.error(error));
}

getTareas();

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTarea();
});
