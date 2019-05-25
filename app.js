"use strict";

let listData = [];

/* Select UI Elements */

// Menu
const DeleteAllEl = document.querySelector("#delete-all");
const PrintListEl = document.querySelector("#print-list");

// Input Card Tabs
const toDoTabEl = document.querySelector("#tab--to-do");
const doneTabEl = document.querySelector("#tab--done");
const allTabEl = document.querySelector("#tab--all");

// Input Card Items
const inputTextEl = document.querySelector("#input-text");
const inputAddEl = document.querySelector("#input-add");
const inputClearEl = document.querySelector("#input-clear");

// To Do List
const toDoListToDoEl = document.querySelector("#list--to-do");

/* Attach Event Listeners */

window.addEventListener("DOMContentLoaded", e => {
  renderToDoEls();
});

DeleteAllEl.addEventListener("click", e =>
  alert("This feature has not been implemented!")
);
PrintListEl.addEventListener("click", e =>
  alert("This feature has not been implemented!")
);

// Input Card
inputTextEl.addEventListener("keyup", onTextInput);
inputAddEl.addEventListener("click", onInputAdd);
inputClearEl.addEventListener("click", onInputClear);

// To Do Tabs
let activeTabFilter = "to-do";
toDoTabEl.addEventListener("click", e => (activeTabFilter = "to-do"));
doneTabEl.addEventListener("click", e => (activeTabFilter = "done"));
allTabEl.addEventListener("click", e => (activeTabFilter = "all"));

// To Do List
toDoListToDoEl.addEventListener("click", onRemove);
toDoListToDoEl.addEventListener("click", onToggleStatus);

/* Define Event Handlers */

function onTextInput(e) {
  if (e.target.value === "") {
    inputAddEl.setAttribute("disabled", "true");
    inputClearEl.setAttribute("disabled", "true");
  } else {
    inputAddEl.removeAttribute("disabled");
    inputClearEl.removeAttribute("disabled");
  }
  renderToDoEls(e.target.value);
}

function onInputAdd(e) {
  e.preventDefault();
  let toDo = {
    id: uuidv4(),
    task: inputTextEl.value,
    completeStatus: false
  };
  listData.push(toDo);
  onInputClear();
  renderToDoEls();
}

function onInputClear(e) {
  inputTextEl.value = "";
  inputAddEl.setAttribute("disabled", "true");
  inputClearEl.setAttribute("disabled", "true");
  renderToDoEls();
}

function onRemove(e) {
  if (e.target.classList.contains("input-remove")) {
    listData = listData.filter(
      toDo => toDo.id !== e.target.parentElement.getAttribute("data-id")
    );
    e.target.parentElement.remove();
  }
}

function onToggleStatus(e) {
  if (e.target.classList.contains("input-toggle-status")) {
    listData.map(toDo => {
      if (toDo.id == e.target.parentElement.getAttribute("data-id")) {
        toDo.completeStatus = !toDo.completeStatus;
        // Toggle text strike through in DOM
        toDoListToDoEl.querySelector(
          `[data-id="${toDo.id}"] .to-do-text`
        ).innerHTML = `<${toDo.completeStatus ? "del" : "span"}>${toDo.task}</${
          toDo.completeStatus ? "del" : "span"
        }>`;
      }
    });
  }
}

/* Define Helpers */

function uuidv4() {
  // "https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript"
  return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function addToDoEl(toDo) {
  // Render to do item to the dom
  const newToDoEl = document.createElement("li");
  newToDoEl.className =
    "list-group-item d-flex align-items-center p-1 py-sm-2 px-sm-3";
  newToDoEl.setAttribute("data-id", toDo.id);
  newToDoEl.innerHTML = `
  <button
    class="btn btn-outline-success mr-1 input-toggle-status"
    type="button"
  >
    <i
      class="fas fa-check"
    ></i>
  </button>
  <button
    class="btn btn-outline-danger input-remove"
    type="button"
  >
    <i class="fas fa-minus"></i>
  </button>
  <div class="ml-2 text-truncate">
    <span class="to-do-text">
      <${toDo.completeStatus ? "del" : "span"}>
      </${toDo.completeStatus ? "del" : "span"}>
    </span>
  </div>`;
  toDoListToDoEl.appendChild(newToDoEl);
  toDoListToDoEl
    .querySelector(`[data-id="${toDo.id}"]`)
    .querySelector(".to-do-text > *").textContent = toDo.task;
}

function renderToDoEls(searchTerm) {
  if (searchTerm) {
    // filter data
    const filteredListData = listData.filter(toDo =>
      toDo.task.toLowerCase().includes(searchTerm)
    );

    // remove all To Do elements from DOM
    while (toDoListToDoEl.firstChild) {
      toDoListToDoEl.removeChild(toDoListToDoEl.firstChild);
    }

    // append filter list elements
    filteredListData.forEach(toDo => addToDoEl(toDo));
  } else {
    while (toDoListToDoEl.firstChild) {
      toDoListToDoEl.removeChild(toDoListToDoEl.firstChild);
    }
    listData.forEach(toDo => addToDoEl(toDo));
  }
}
