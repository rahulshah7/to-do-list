"use strict";

const listData = [
  {
    task: "Mow lawn",
    complete: false
  },
  {
    task:
      "blah blah blah blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah",
    complete: true
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

toDoListToDoEl.addEventListener("click", onToDoListAction);
toDoListAllEl.addEventListener("click", e => console.log(e.target));

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
  listData.push({
    id: uuidv4(),
    task: inputTextEl.value,
    complete: false
  });
  onInputClear();
  console.log(listData);
}

function onInputClear(e) {
  inputTextEl.value = "";
  inputAddEl.setAttribute("disabled", "true");
  inputClearEl.setAttribute("disabled", "true");
}

function onToDoListAction(e) {
  if (e.target.classList.contains("input-toggle-status")) {
    console.log(e.target);
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
