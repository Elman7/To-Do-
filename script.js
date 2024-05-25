const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const task = inputBox.value.trim();
    if (task === '') {
        alert("Write Something!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = task;
    const span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData();
}, false);

listContainer.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI") {
        editTask(e.target);
    }
}, false);

function editTask(li) {
    const currentText = li.firstChild.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    li.innerHTML = "";
    li.appendChild(input);
    input.focus();

    input.addEventListener("blur", function() {
        if (input.value.trim() !== "") {
            li.textContent = input.value.trim();
            const span = document.createElement("span");
            span.textContent = "\u00d7";
            li.appendChild(span);
        } else {
            li.remove();
        }
        saveData();
    });

    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            input.blur();
        }
    });
}

function saveData() {
    localStorage.setItem("Data", listContainer.innerHTML);
}

function showTask() {
    const storedData = localStorage.getItem("Data");
    if (storedData) {
        listContainer.innerHTML = storedData;
    }
}

function clearAllTasks() {
    listContainer.innerHTML = "";
    saveData();
}

showTask();
