import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
    const [todos, setTodos] = useState([]);

    const create = newTodo => {
        setTodos(todos => [...todos, newTodo]);
    };

    const edit = (id, editedTask) => {
        setTodos(todos =>
            todos.map(todo =>
                todo.id === id ? {...todo, task: editedTask } : todo
            )
        );
    };

    const remove = id => {
        setTodos(todos => 
            todos.filter(todo =>
                todo.id !== id
            )
        );
    };

    const todoComponent = todos.map(todo => (
        <Todo
            key={todo.id}
            id={todo.id}
            remove={remove}
            task={todo.task}
            edit={edit}
        />
    ));

    return (
        <div>
            <NewTodoForm createTodo={create} />
            <ul>{todoComponent}</ul>
        </div>
    );
}

export default TodoList;