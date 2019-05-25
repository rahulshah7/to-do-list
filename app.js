"use strict";

let listData = [
  {
    task: "Mow lawn",
    status: false
  },
  {
    task:
      "blah blah blah blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah",
    status: true
  }
];

/* Select UI Elements */

// Input Card
const inputTextEl = document.querySelector("#input-text");
const inputAddEl = document.querySelector("#input-add");
const inputClearEl = document.querySelector("#input-clear");

// To Do List
const toDoListToDoEl = document.querySelector("#list--to-do");
const toDoListDoneEl = document.querySelector("#list--done");
const toDoListAllEl = document.querySelector("#list--all");

/* Attach Event Listeners */

// Input Card
inputTextEl.addEventListener("input", onInput);
inputAddEl.addEventListener("click", onInputAdd);
inputClearEl.addEventListener("click", onInputClear);

// To Do List

toDoListToDoEl.addEventListener("click", onRemove);
toDoListToDoEl.addEventListener("click", onToggleStatus);

/* Define Event Handlers */

function onInput(e) {
  if (e.target.value === "") {
    inputAddEl.setAttribute("disabled", "true");
    inputClearEl.setAttribute("disabled", "true");
  } else {
    inputAddEl.removeAttribute("disabled");
    inputClearEl.removeAttribute("disabled");
  }
}

function onInputAdd(e) {
  e.preventDefault();
  let toDo = {
    id: uuidv4(),
    task: inputTextEl.value,
    status: false
  };
  listData.push(toDo);
  onInputClear();
  // Render new to do item to the dom
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
    </span
    >
  </div>`;
  toDoListToDoEl.appendChild(newToDoEl);
  toDoListToDoEl
    .querySelector(`[data-id="${toDo.id}"]`)
    .querySelector("span.to-do-text").textContent = toDo.task;
}

function onInputClear(e) {
  inputTextEl.value = "";
  inputAddEl.setAttribute("disabled", "true");
  inputClearEl.setAttribute("disabled", "true");
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
        toDo.status = !toDo.status;
        // Toggle text strike through in DOM
        if (toDo.status) {
          toDoListToDoEl.querySelector("span.to-do-text").innerHTML = `<del>${
            toDo.task
          }</del>`;
        } else {
          toDoListToDoEl.querySelector("span.to-do-text").innerHTML = `${
            toDo.task
          }`;
        }
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
