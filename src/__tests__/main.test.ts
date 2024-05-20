import { createNewTodo } from "../ts/main";
import { IAddResponse } from "../ts/models/IAddResponse";
import { Todo } from "../ts/models/todo";

import * as htmlFunctions from "./../ts/htmlFunctions"
import * as functions from "./../ts/functions";

describe("main tests", () => {

    let mockedAddTodo: jest.SpyInstance<IAddResponse>;
    let mockedCreateHtml: jest.SpyInstance<void>;
    let mockedDisplayError: jest.SpyInstance<void>;

    beforeEach(() => {
        mockedAddTodo = jest.spyOn(functions, "addTodo");
        mockedCreateHtml = jest.spyOn(htmlFunctions, "createHtml");
        mockedDisplayError = jest.spyOn(htmlFunctions, "displayError");

        document.body.innerHTML = `
      <form id="newTodoForm">
        <div>
          <input type="text" id="newTodoText" />
          <button>Skapa</button>
          <button type="button" id="clearTodos">Rensa lista</button>
        </div>
        <div id="error" class="error"></div>
      </form>
      <ul id="todos" class="todo"></ul>`
    })

    afterEach(() => {
        mockedAddTodo.mockReset();
        mockedCreateHtml.mockReset();
        mockedDisplayError.mockReset();
    })

    test("It should add the todo and call createHtml", () => {
        // Assign
        const todoText = "bajs";
        const todos: Todo[] = [];
        mockedAddTodo.mockImplementation(() => {
            return { success: true, error: "" }
        });
        mockedCreateHtml.mockImplementation(() => {})

        // Act
        createNewTodo(todoText, todos);

        // Assert
        expect(mockedCreateHtml).toHaveBeenCalled();
    })

    test("It should display error", () => {
        // Assign
        const todoText = "";
        const todos: Todo[] = [];
        mockedAddTodo.mockImplementation(() => {
            return { success: false, error: "Du måste ange minst tre bokstäver" }
        });
        mockedDisplayError.mockImplementation(() => {})

        // Act
        createNewTodo(todoText, todos);

        // Assert
        expect(mockedDisplayError).toHaveBeenCalled();
    })
})