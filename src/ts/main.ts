import "./../styles/main.scss";
import { addTodo, changeTodo, removeAllTodos } from "./functions";
import { Todo } from "./models/todo";
import { createHtml, displayError } from "./htmlFunctions";

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

document.getElementById("clearTodos")?.addEventListener("click", () => {
  clearTodos(todos);
});

(document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
  "submit",
  (e: SubmitEvent) => {
    e.preventDefault();

    let todoText: string = (
      document.getElementById("newTodoText") as HTMLInputElement
    ).value;

    createNewTodo(todoText, todos);
  }
);

export function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos);

  if (result.success) {
    createHtml(todos);
  } else {
    displayError(result.error, true);
  }
}

export function toggleTodo(todo: Todo) {
  changeTodo(todo);
  createHtml(todos);
}

function clearTodos(todos: Todo[]) {
  removeAllTodos(todos);
  createHtml(todos);
}

window.onload = () => {
  createHtml(todos);
}