"use strict";

const toDoList = [
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

// Select UI Elements
const inputText = document.querySelector("#input-text");
const inputAdd = document.querySelector("#input-add");
const inputClear = document.querySelector("#input-clear");

// Define Event Handlers

function onInput(e) {
  if (e.target.value === "") {
    inputAdd.setAttribute("disabled", "true");
    inputClear.setAttribute("disabled", "true");
  } else {
    inputAdd.removeAttribute("disabled");
    inputClear.removeAttribute("disabled");
  }
}

function onInputAdd(e) {
  e.preventDefault();
  toDoList.push({ task: inputText.value, complete: false });
  onInputClear();
  console.log(toDoList);
}

function onInputClear(e) {
  inputText.value = "";
  inputAdd.setAttribute("disabled", "true");
  inputClear.setAttribute("disabled", "true");
}

// Attach Event Listeners

inputText.addEventListener("input", onInput);
inputAdd.addEventListener("click", onInputAdd);
inputClear.addEventListener("click", onInputClear);
